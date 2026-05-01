import { useState, useEffect, useCallback } from 'react'
import { MISSIONS } from './data/missions.js'
import { UNLOCKS } from './data/unlocks.js'
import MissionCard from './components/MissionCard.jsx'
import RewardReveal from './components/RewardReveal.jsx'
import TabNav from './components/TabNav.jsx'
import UnlocksTab from './components/UnlocksTab.jsx'
import HistoryTab from './components/HistoryTab.jsx'
import ConfigTab from './components/ConfigTab.jsx'
import SetupScreen from './components/SetupScreen.jsx'
import HuntTab from './components/HuntTab.jsx'
import ShopTab from './components/ShopTab.jsx'
import { loadState, saveState } from './hooks/useSave.js'
import { fetchPlayerLevels, calcCombatLevel } from './hooks/useOSRSApi.js'
import { parchment, DIFF } from './constants.js'

export { parchment, DIFF }

export function getRecommended(options) {
  if (!options.length) return null
  return options.reduce((best, m) =>
    (m.priority ?? 0) > (best.priority ?? 0) ? m : best
  ).id
}

const MODES = [
  { id: 'mixed',  label: '1 de cada',   desc: 'Uma fácil, média e difícil' },
  { id: 'random', label: 'Aleatório',   desc: 'Qualquer dificuldade' },
  { id: 'easy3',  label: 'Só fáceis',   desc: 'Três missões fáceis' },
  { id: 'hard3',  label: 'Só difíceis', desc: 'Três missões difíceis' },
]

function drawOptions(unlocked, completed, mode) {
  const pool = MISSIONS.filter(m => !completed.has(m.id) && m.req.every(r => unlocked.has(r)))
  const rnd = arr => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null
  let cards = []
  if (mode === 'mixed') {
    cards = ['easy', 'normal', 'hard'].map(d => rnd(pool.filter(m => m.diff === d)))
  } else if (mode === 'easy3') {
    cards = [...pool.filter(m => m.diff === 'easy')].sort(() => Math.random() - 0.5).slice(0, 3)
  } else if (mode === 'hard3') {
    cards = [...pool.filter(m => m.diff === 'hard')].sort(() => Math.random() - 0.5).slice(0, 3)
  } else {
    cards = [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
  }
  return [...new Map(cards.filter(Boolean).map(c => [c.id, c])).values()]
}

export default function App() {
  const saved = loadState()

  const [username,   setUsername]   = useState(() => saved?.username   || null)
  const [realLevels, setRealLevels] = useState(() => saved?.realLevels || {})
  const [unlocked,   setUnlocked]   = useState(() => new Set(saved?.unlocked  || []))
  const [completed,  setCompleted]  = useState(() => new Set(saved?.completed || []))
  const [history,    setHistory]    = useState(() => saved?.history    || [])
  const [mode,       setMode]       = useState(() => saved?.mode       || 'mixed')
  const [options,    setOptions]    = useState(() => saved?.options || [])
  const [pickedId,   setPickedId]   = useState(() => saved?.pickedId   || null)
  const [showReward, setShowReward] = useState(false)
  const [tab,        setTab]        = useState('board')
  const [pamCoins,   setPamCoins]   = useState(() => saved?.pamCoins   || 0)
  const [hunt,          setHunt]          = useState(() => saved?.hunt          || null)
  const [huntUnlocked,  setHuntUnlocked]  = useState(() => new Set(saved?.huntUnlocked || []))

  const combatLevel = calcCombatLevel(realLevels)
  const activeMission = pickedId ? MISSIONS.find(m => m.id === pickedId) : null

  const persist = useCallback((overrides = {}) => {
    saveState({
      username, realLevels, pamCoins,
      options,
      unlocked: [...unlocked], completed: [...completed],
      history, pickedId, mode, hunt, huntUnlocked: [...huntUnlocked],
      ...overrides,
    })
  }, [username, realLevels, pamCoins, options, unlocked, completed, history, pickedId, mode, hunt, huntUnlocked])

  useEffect(() => {
    if (!pickedId) setOptions(drawOptions(unlocked, completed, mode))
    // se tinha missão ativa e options vazias, restaura do pool
    else if (options.length === 0) setOptions(drawOptions(unlocked, completed, mode))
  }, [])

  // ── Setup ──────────────────────────────────────────────────────────────────
  function handleSetupComplete(name, levels) {
    setUsername(name)
    setRealLevels(levels)
    const next = drawOptions(unlocked, completed, mode)
    setOptions(next)
    saveState({
      username: name, realLevels: levels, pamCoins,
      unlocked: [...unlocked], completed: [...completed],
      history, pickedId: null, mode, hunt,
    })
  }

  // ── Refresh levels from API ────────────────────────────────────────────────
  async function handleRefreshLevels() {
    if (!username) return
    try {
      const levels = await fetchPlayerLevels(username)
      setRealLevels(levels)
      saveState({
        username, realLevels: levels, pamCoins,
        unlocked: [...unlocked], completed: [...completed],
        history, pickedId, mode, hunt, huntUnlocked: [...huntUnlocked],
      })
      return true
    } catch {
      return false
    }
  }

  // ── Mission flow ───────────────────────────────────────────────────────────
  function handlePick(mission) {
    setPickedId(mission.id)
    setShowReward(false)
    persist({ pickedId: mission.id })
  }

  function handleAccept() {
    const m = activeMission
    const COINS = { easy: 10, normal: 25, hard: 50 }
    const earned = COINS[m.diff] ?? 10
    const newU = new Set([...unlocked, m.reward])
    const newC = new Set([...completed, m.id])
    const newCoins = pamCoins + earned
    const newH = [{
      id: m.id, title: m.title, diff: m.diff, desc: m.desc,
      reward: UNLOCKS[m.reward]?.label ?? m.reward,
      rewardIcon: UNLOCKS[m.reward]?.icon ?? '🎁',
      coins: earned,
      date: new Date().toLocaleDateString('pt-BR'),
    }, ...history]
    setUnlocked(newU); setCompleted(newC)
    setHistory(newH); setPamCoins(newCoins)
    setPickedId(null); setShowReward(false)
    const next = drawOptions(newU, newC, mode)
    setOptions(next)
    saveState({
      username, realLevels, pamCoins: newCoins,
      unlocked: [...newU], completed: [...newC],
      history: newH, pickedId: null, mode, hunt,
    })
  }

  function handleSkip() {
    const SKIP_COST = 15
    if (pamCoins < SKIP_COST) return
    const newCoins = pamCoins - SKIP_COST
    setPamCoins(newCoins)
    setPickedId(null)
    setShowReward(false)
    const next = drawOptions(unlocked, completed, mode)
    setOptions(next)
    persist({ pamCoins: newCoins, pickedId: null })
  }

  function handleModeChange(m) {
    setMode(m)
    if (!pickedId) setOptions(drawOptions(unlocked, completed, m))
    persist({ mode: m })
  }

  function handleHuntUpdate(newHunt) {
    setHunt(newHunt)
    persist({ hunt: newHunt, huntUnlocked: [...huntUnlocked] })
  }

  function handleHuntUnlockedChange(newSet) {
    setHuntUnlocked(newSet)
    persist({ hunt, huntUnlocked: [...newSet] })
  }

  function handleHuntCoins(amount) {
    const newCoins = pamCoins + amount
    setPamCoins(newCoins)
    persist({ pamCoins: newCoins, huntUnlocked: [...huntUnlocked] })
  }

  function handleReset() {
    if (!window.confirm('Tem certeza? Todo o progresso será perdido.')) return
    const u = new Set(), c = new Set(), h = []
    setUnlocked(u); setCompleted(c); setHistory(h)
    setPickedId(null); setShowReward(false); setPamCoins(0)
    setOptions(drawOptions(u, c, mode))
    saveState({ username, realLevels, pamCoins: 0, unlocked: [], completed: [], history: [], pickedId: null, mode, hunt: null, huntUnlocked: [] })
  }

  function handleChangeUser() {
    if (!window.confirm('Trocar de usuário irá resetar o progresso. Confirma?')) return
    saveState(null)
    localStorage.clear()
    window.location.reload()
  }

  // ── Guard — show setup if no username ─────────────────────────────────────
  if (!username) return <SetupScreen onComplete={handleSetupComplete} />

  const recId = getRecommended(options)

  const TABS = [
    { id: 'board',   label: 'Missões' },
    { id: 'hunt',    label: hunt ? 'Hunt 🎯' : 'Hunt' },
    { id: 'shop',    label: 'Loja' },
    { id: 'unlocks', label: `Desbloqueios (${unlocked.size})` },
    { id: 'history', label: `Histórico (${history.length})` },
    { id: 'config',  label: 'Config' },
  ]

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ ...parchment, borderRadius: 12, padding: '1rem 1.5rem',
        marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 2px', color: '#2c1a00' }}>
            Pick a Mission
          </h1>
          <p style={{ fontSize: 12, color: '#8B6914', margin: 0 }}>
            {username} · CB {combatLevel} · {completed.size} missões
          </p>
        </div>
        {/* PAM Coins */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
            background: '#2c1a00', borderRadius: 8, padding: '4px 12px' }}>
            <span style={{ fontSize: 14 }}>🪙</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#f5d78e', fontFamily: 'system-ui, sans-serif' }}>
              {pamCoins.toLocaleString()}
            </span>
            <span style={{ fontSize: 10, color: '#8B6914' }}>PAM</span>
          </div>
          <button onClick={handleReset}
            style={{ fontSize: 10, color: '#8B6914', background: 'transparent',
              border: 'none', cursor: 'pointer', padding: 0 }}>
            Resetar
          </button>
        </div>
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* Board */}
      {tab === 'board' && (
        <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
          {!pickedId && (
            <>
              <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 1rem', textAlign: 'center' }}>
                Escolha uma missão — a recompensa é revelada ao concluir
              </p>
              {options.length === 0
                ? <p style={{ color: '#8B6914', fontSize: 13, textAlign: 'center' }}>
                    Nenhuma missão disponível com seus desbloqueios atuais.
                  </p>
                : <div style={{ display: 'flex', gap: 10 }}>
                    {options.map(m => (
                      <MissionCard key={m.id} mission={m} state="idle"
                        recommended={m.id === recId} onClick={() => handlePick(m)} />
                    ))}
                  </div>
              }
            </>
          )}

          {pickedId && !showReward && activeMission && (
            <>
              <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 1rem', textAlign: 'center' }}>
                Complete a missão no jogo e volte aqui
              </p>
              <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
                {options.map(m => (
                  <MissionCard key={m.id} mission={m}
                    state={m.id === pickedId ? 'selected' : 'faded'}
                    recommended={false} onClick={() => {}} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowReward(true)}
                  style={{ flex: 1, padding: 11, fontSize: 13, borderRadius: 8,
                    border: 'none', fontWeight: 500, background: '#2c1a00',
                    color: '#f5ead0', fontFamily: 'inherit', cursor: 'pointer' }}>
                  Completei! Revelar recompensa
                </button>
                <button onClick={handleSkip} disabled={pamCoins < 15}
                  title={pamCoins < 15 ? 'Precisa de 15 PAM Coins' : 'Pular missão (15 🪙)'}
                  style={{ padding: '11px 18px', fontSize: 13, borderRadius: 8,
                    border: 'none', fontWeight: 500, fontFamily: 'inherit',
                    cursor: pamCoins >= 15 ? 'pointer' : 'not-allowed',
                    background: pamCoins >= 15 ? '#2c1a00' : '#3a2a0a',
                    color: '#f5ead0' }}>
                  Pular 15🪙
                </button>
              </div>
            </>
          )}

          {pickedId && showReward && activeMission && (
            <RewardReveal mission={activeMission} onAccept={handleAccept} />
          )}
        </div>
      )}

      {tab === 'hunt'    && (
        <HuntTab
          combatLevel={combatLevel}
          hunt={hunt}
          onHuntUpdate={handleHuntUpdate}
          onCoinsChange={handleHuntCoins}
          huntUnlocked={huntUnlocked}
          onHuntUnlockedChange={handleHuntUnlockedChange}
        />
      )}
      {tab === 'shop'    && (
        <ShopTab
          combatLevel={combatLevel}
          pamCoins={pamCoins}
          huntUnlocked={huntUnlocked}
          onHuntUnlockedChange={handleHuntUnlockedChange}
          onCoinsChange={handleHuntCoins}
        />
      )}
      {tab === 'unlocks' && <UnlocksTab unlocked={unlocked} realLevels={realLevels} />}
      {tab === 'history' && <HistoryTab history={history} />}
      {tab === 'config'  && (
        <ConfigTab mode={mode} modes={MODES} onChange={handleModeChange}
          username={username} onRefresh={handleRefreshLevels} onChangeUser={handleChangeUser} />
      )}
    </div>
  )
}