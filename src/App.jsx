import { useState, useEffect, useCallback } from 'react'
import { MISSIONS } from './data/missions.js'
import { UNLOCKS } from './data/unlocks.js'
import MissionCard from './components/MissionCard.jsx'
import RewardReveal from './components/RewardReveal.jsx'
import TabNav from './components/TabNav.jsx'
import UnlocksTab from './components/UnlocksTab.jsx'
import HistoryTab from './components/HistoryTab.jsx'
import ConfigTab from './components/ConfigTab.jsx'
import { loadState, saveState } from './hooks/useSave.js'

export const DIFF = {
  easy:   { label: 'Fácil',   bg: '#3B6D11', light: '#EAF3DE', border: '#97C459', text: '#EAF3DE' },
  normal: { label: 'Médio',   bg: '#854F0B', light: '#FAEEDA', border: '#EF9F27', text: '#FAEEDA' },
  hard:   { label: 'Difícil', bg: '#7A1F1F', light: '#FAECE7', border: '#D85A30', text: '#FAECE7' },
}

export const parchment = {
  background: 'linear-gradient(160deg,#fffdf4 0%,#f5ead0 100%)',
  border: '1px solid #c8a96e',
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
  const [unlocked,   setUnlocked]   = useState(() => new Set(saved?.unlocked  || []))
  const [completed,  setCompleted]  = useState(() => new Set(saved?.completed || []))
  const [history,    setHistory]    = useState(() => saved?.history  || [])
  const [mode,       setMode]       = useState(() => saved?.mode     || 'mixed')
  const [options,    setOptions]    = useState([])
  const [pickedId,   setPickedId]   = useState(() => saved?.pickedId || null)
  const [showReward, setShowReward] = useState(false)
  const [tab,        setTab]        = useState('board')

  const activeMission = pickedId ? MISSIONS.find(m => m.id === pickedId) : null

  const persist = useCallback((u, c, h, pid, m) => {
    saveState({ unlocked: [...u], completed: [...c], history: h, pickedId: pid, mode: m })
  }, [])

  useEffect(() => {
    if (!pickedId) setOptions(drawOptions(unlocked, completed, mode))
  }, [])

  function handlePick(mission) {
    setPickedId(mission.id)
    setShowReward(false)
    persist(unlocked, completed, history, mission.id, mode)
  }

  function handleAccept() {
    const m = activeMission
    const newU = new Set([...unlocked, m.reward])
    const newC = new Set([...completed, m.id])
    const newH = [{
      id: m.id, title: m.title, diff: m.diff, desc: m.desc,
      reward: UNLOCKS[m.reward].label,
      rewardIcon: UNLOCKS[m.reward].icon,
      date: new Date().toLocaleDateString('pt-BR'),
    }, ...history]
    setUnlocked(newU); setCompleted(newC); setHistory(newH)
    setPickedId(null); setShowReward(false)
    const next = drawOptions(newU, newC, mode)
    setOptions(next)
    persist(newU, newC, newH, null, mode)
  }

  function handleModeChange(m) {
    setMode(m)
    if (!pickedId) setOptions(drawOptions(unlocked, completed, m))
    persist(unlocked, completed, history, pickedId, m)
  }

  function handleReset() {
    if (!window.confirm('Tem certeza? Todo o progresso será perdido.')) return
    const u = new Set(), c = new Set(), h = []
    setUnlocked(u); setCompleted(c); setHistory(h)
    setPickedId(null); setShowReward(false)
    setOptions(drawOptions(u, c, mode))
    persist(u, c, h, null, mode)
  }

  const TABS = [
    { id: 'board',   label: 'Missões' },
    { id: 'unlocks', label: `Desbloqueios (${unlocked.size})` },
    { id: 'history', label: `Histórico (${history.length})` },
    { id: 'config',  label: 'Config' },
  ]

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem 1.5rem',
        marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 2px', color: '#2c1a00' }}>
            Pick a Mission
          </h1>
          <p style={{ fontSize: 12, color: '#8B6914', margin: 0 }}>
            {completed.size} missões concluídas · {unlocked.size} desbloqueios ativos
          </p>
        </div>
        <button onClick={handleReset}
          style={{ fontSize: 11, color: '#8B6914', background: 'transparent',
            border: '1px solid #c8a96e', padding: '5px 12px', borderRadius: 6 }}>
          Resetar
        </button>
      </div>

      {/* Tab nav */}
      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* Board tab */}
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
                      <MissionCard key={m.id} mission={m} state="idle" onClick={() => handlePick(m)} />
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
                    onClick={() => {}} />
                ))}
              </div>
              <button onClick={() => setShowReward(true)}
                style={{ width: '100%', padding: 11, fontSize: 13, borderRadius: 8,
                  border: 'none', fontWeight: 500, background: '#2c1a00', color: '#f5ead0' }}>
                Completei! Revelar recompensa
              </button>
            </>
          )}

          {pickedId && showReward && activeMission && (
            <RewardReveal mission={activeMission} onAccept={handleAccept} />
          )}
        </div>
      )}

      {tab === 'unlocks' && <UnlocksTab unlocked={unlocked} />}
      {tab === 'history' && <HistoryTab history={history} />}
      {tab === 'config'  && <ConfigTab  mode={mode} modes={MODES} onChange={handleModeChange} />}
    </div>
  )
}