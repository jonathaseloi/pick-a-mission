import { useState, useEffect, useCallback, useRef } from 'react'
import { drawOptions, CHAPTER_META } from './data/missions.js'
import { useMission, computeDailyCard } from './hooks/useMission.js'
import TabNav from './components/TabNav.jsx'
import UnlocksTab from './components/UnlocksTab.jsx'
import HistoryTab from './components/HistoryTab.jsx'
import ConfigTab from './components/ConfigTab.jsx'
import SetupScreen from './components/SetupScreen.jsx'
import HuntTab from './components/HuntTab.jsx'
import ShopTab from './components/ShopTab.jsx'
import GuiaTab from './components/GuiaTab.jsx'
import { loadState, saveState } from './hooks/useSave.js'
import { fetchPlayerLevels, calcCombatLevel } from './hooks/useOSRSApi.js'
import { fetchRuneProfile, fetchCollectionLogBosses, getCaUnlockIds, getCaTierUnlockIds } from './hooks/useRuneProfile.js'
import { parchment } from './constants.js'
import TierUnlockModal from './components/TierUnlockModal.jsx'
import { useHunt } from './hooks/useHunt.js'
import BoardTab from './components/BoardTab.jsx'
import AppHeader from './components/AppHeader.jsx'
import { Button, Modal, Card } from './components/ui/index.js'

export { parchment }

// ── Weekly themes ──────────────────────────────────────────────────────────────
const WEEKLY_THEMES = [
  { key: 'boss',     label: 'Boss Week',     emoji: '💀', categories: ['Boss'] },
  { key: 'slayer',   label: 'Slayer Week',   emoji: '🗡️', categories: ['Slayer'] },
  { key: 'skilling', label: 'Skilling Week', emoji: '⛏',  categories: ['Skilling', 'Farming'] },
  { key: 'quest',    label: 'Quest Week',    emoji: '📜', categories: ['Quest'] },
  { key: 'minigame', label: 'Minigame Week', emoji: '🏰', categories: ['Minigame', 'Dungeon'] },
]

function getCurrentTheme() {
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000))
  return WEEKLY_THEMES[weekNum % WEEKLY_THEMES.length]
}

// ── HCIM Dead Memorial ─────────────────────────────────────────────────────────
function HCIMDeadModal({ username, onContinue }) {
  return (
    <Modal overlayBg="rgba(0,0,0,0.85)" padding="2rem 1.5rem"
      style={{ textAlign: 'center', border: '3px solid #4a4a4a', boxShadow: '0 0 40px #00000088' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>💀</div>
      <p style={{ fontSize: 11, letterSpacing: '0.12em', color: '#888', margin: '0 0 6px', fontWeight: 700 }}>
        HARDCORE IRONMAN — FALECIDO
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 12px' }}>
        {username}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 20px', lineHeight: 1.6 }}>
        RuneProfile detectou que este Hardcore Ironman não sobreviveu.<br />
        O progresso fica registrado como memorial.
      </p>
      <Button onClick={onContinue}
        style={{ padding: '10px 28px', background: '#3a2408', color: '#f0c860', border: '2px solid #6a4820' }}>
        Ver progresso memorial
      </Button>
    </Modal>
  )
}

// ── Chapter complete modal ─────────────────────────────────────────────────────
function ChapterCompleteModal({ chapter, onClose }) {
  if (!chapter) return null
  const meta = CHAPTER_META[chapter]
  return (
    <Modal overlayBg="rgba(0,0,0,0.75)" padding="2rem 1.5rem"
      style={{ textAlign: 'center', border: `3px solid ${meta.border}`, boxShadow: `0 0 40px ${meta.border}55, 0 20px 60px rgba(0,0,0,0.5)` }}>
      <p style={{ fontSize: 11, letterSpacing: '0.12em', color: meta.color, margin: '0 0 6px', fontWeight: 700 }}>
        CAPÍTULO CONCLUÍDO
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 6px' }}>
        {meta.label}
      </h2>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 20px', lineHeight: 1.5 }}>
        Todas as missões principais deste capítulo foram completadas.<br />
        Novas missões do próximo capítulo estão disponíveis.
      </p>
      <div style={{
        background: meta.bg, border: `1px solid ${meta.border}`,
        padding: '10px 16px', marginBottom: 20,
        display: 'flex', justifyContent: 'center', gap: 24,
      }}>
        {chapter < 6 && (
          <div>
            <p style={{ fontSize: 10, color: meta.color, margin: '0 0 2px', letterSpacing: '0.08em' }}>PRÓXIMO</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)', margin: 0 }}>
              {CHAPTER_META[chapter + 1]?.label}
            </p>
          </div>
        )}
      </div>
      <Button onClick={onClose}
        style={{ padding: '10px 28px', background: meta.color, color: meta.bg, border: `2px solid ${meta.border}`, letterSpacing: '0.04em' }}>
        Continuar
      </Button>
    </Modal>
  )
}

// ── Sync toast ─────────────────────────────────────────────────────────────────
function SyncToast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      background: '#1a3a10', border: '1px solid #97C459',
      color: '#f5d78e', padding: '10px 16px', fontSize: 12,
      fontFamily: 'system-ui', zIndex: 2000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
    }}>
      <span>✅</span>
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: '#97C459',
        cursor: 'pointer', fontSize: 14, padding: '0 2px',
      }}>×</button>
    </div>
  )
}

// ── Mission confirm modal ─────────────────────────────────────────────────────
function MissionConfirmModal({ mission, isDaily, onConfirm, onCancel }) {
  const meta = CHAPTER_META[mission.chapter] ?? { bg: 'var(--c-mid)', border: 'var(--c-accent)', color: 'var(--c-text)' }
  return (
    <Modal maxWidth={360} style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${meta.border}` }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        margin: '0 0 10px', fontFamily: 'system-ui', color: meta.color,
        background: meta.bg, padding: '3px 8px', display: 'inline-block',
      }}>
        {isDaily ? 'MISSAO DIARIA' : `CAPITULO ${mission.chapter}`}
      </p>
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 8px', lineHeight: 1.3 }}>
        {mission.title}
      </p>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 14px', lineHeight: 1.5, fontFamily: 'system-ui' }}>
        {mission.desc.split(' — ')[0]}
      </p>
      <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 16px', fontFamily: 'system-ui',
        padding: '6px 10px', background: 'var(--c-mid)', border: '1px solid var(--c-accent)' }}>
        Ao confirmar, a missao fica ativa ate ser concluida.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={onCancel} style={{ flex: 1, padding: '10px' }}>Cancelar</Button>
        <Button onClick={onConfirm} style={{ flex: 1, padding: '10px' }}>Iniciar missao</Button>
      </div>
    </Modal>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const saved = loadState()

  const [username,   setUsername]   = useState(() => saved?.username   || null)
  const [realLevels, setRealLevels] = useState(() => saved?.realLevels || {})
  const [unlocked,   setUnlocked]   = useState(() => new Set(saved?.unlocked  || []))
  const [tab,        setTab]        = useState('board')
  const [pamCoins,   setPamCoins]   = useState(() => saved?.pamCoins   || 0)
  const [rerollTokens, setRerollTokens] = useState(() => saved?.rerollTokens ?? 0)
  const [accountType,   setAccountType]   = useState(() => saved?.accountType   || 'ironman')
  const [chapterCompleteNotif, setChapterCompleteNotif] = useState(null)
  const [obtainedEquipment,    setObtainedEquipment]    = useState(() => new Set(saved?.obtainedEquipment || []))

  const [syncToast,      setSyncToast]      = useState(null)
  const [collectionLog,  setCollectionLog]  = useState(null)
  const [isHCIMDead,     setIsHCIMDead]     = useState(() => saved?.isHCIMDead ?? false)

  const combatLevel  = calcCombatLevel(realLevels)
  const currentTheme = getCurrentTheme()
  const persistRef   = useRef(null)

  const {
    hunt, setHunt,
    huntUnlocked, setHuntUnlocked,
    huntHistory, setHuntHistory,
    huntPrefs, setHuntPrefs,
    tierUnlockNotif, setTierUnlockNotif,
    seedHuntStarters,
    handleHuntUpdate,
    handleHuntUnlockedChange,
    handleHuntCoins,
    handleShopBuyMonster,
    handleHuntPrefs,
  } = useHunt({ saved, persistRef, pamCoins, setPamCoins })

  const {
    options, setOptions,
    pickedId, setPickedId,
    showReward, setShowReward,
    isDailyPick, setIsDailyPick,
    dailyCard, setDailyCard,
    missionStreak, setMissionStreak,
    completed, setCompleted,
    history, setHistory,
    pendingMission, setPendingMission,
    handlePick, handleAccept, handleReroll, handleSkip,
  } = useMission({
    username, realLevels, accountType,
    unlocked, setUnlocked,
    pamCoins, setPamCoins,
    rerollTokens, setRerollTokens,
    huntUnlocked, setHuntUnlocked,
    hunt, huntHistory, huntPrefs,
    obtainedEquipment, isHCIMDead,
    weeklyTheme: currentTheme,
    setChapterCompleteNotif,
    saved,
  })

  const persist = useCallback((overrides = {}) => {
    saveState({
      username, realLevels, accountType, pamCoins, rerollTokens,
      options,
      unlocked: [...unlocked], completed: [...completed],
      history, pickedId, hunt, huntUnlocked: [...huntUnlocked],
      huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
      missionStreak, dailyCard, isHCIMDead,
      ...overrides,
    })
  }, [username, realLevels, accountType, pamCoins, rerollTokens, options, unlocked, completed, history, pickedId, hunt, huntUnlocked, huntHistory, huntPrefs, obtainedEquipment, missionStreak, dailyCard, isHCIMDead])
  persistRef.current = persist

  // ── RuneProfile sync ─────────────────────────────────────────────────────────
  async function syncRuneProfile(name, currentUnlocked) {
    try {
      const rp = await fetchRuneProfile(name)
      if (!rp?.found) return currentUnlocked

      const newU = new Set(currentUnlocked)
      let added = 0

      // Sync quests
      rp.completedQuestIds.forEach(id => {
        if (!newU.has(id)) { newU.add(id); added++ }
      })

      // Sync CA count milestones
      getCaUnlockIds(rp.caCount).forEach(id => {
        if (!newU.has(id)) { newU.add(id); added++ }
      })
      // Sync CA tier completion milestones
      getCaTierUnlockIds(rp.caByTier).forEach(id => {
        if (!newU.has(id)) { newU.add(id); added++ }
      })
      // Sync diary completions
      rp.completedDiaryIds.forEach(id => {
        if (!newU.has(id)) { newU.add(id); added++ }
      })

      if (added > 0) {
        setUnlocked(newU)
        setSyncToast(`${added} desbloqueio${added > 1 ? 's' : ''} sincronizado${added > 1 ? 's' : ''} do RuneProfile`)
      }

      // Fetch collection log in background
      fetchCollectionLogBosses(name).then(cl => {
        if (cl) setCollectionLog(cl)
      })

      return newU
    } catch { return currentUnlocked }
  }

  useEffect(() => {
    if (!username) return
    const { newSet, changed, notifications } = seedHuntStarters(realLevels, huntUnlocked)
    if (changed) {
      setHuntUnlocked(newSet)
      if (notifications.length) setTierUnlockNotif(notifications)
      saveState({
        username, realLevels, accountType, pamCoins, rerollTokens, options,
        unlocked: [...unlocked], completed: [...completed],
        history, pickedId, hunt, huntUnlocked: [...newSet],
        huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
        missionStreak, dailyCard, isHCIMDead,
      })
    }
    // Sync RuneProfile on mount (non-blocking)
    syncRuneProfile(username, unlocked).then(newU => {
      if (newU !== unlocked) {
        const next = drawOptions(newU, completed, realLevels)
        setOptions(next)
        saveState({
          username, realLevels, accountType, pamCoins, rerollTokens,
          options: next, unlocked: [...newU], completed: [...completed],
          history, pickedId, hunt, huntUnlocked: [...huntUnlocked],
          huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
          missionStreak, dailyCard, isHCIMDead,
        })
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Setup ──────────────────────────────────────────────────────────────────
  async function handleSetupComplete(name, levels, type, rpData = null) {
    setUsername(name)
    setRealLevels(levels)
    setAccountType(type)

    if (rpData?.isDeadHCIM) setIsHCIMDead(true)

    // Apply RuneProfile quest/CA unlocks immediately
    let u = new Set(unlocked)
    let synced = 0
    if (rpData?.completedQuestIds?.length > 0) {
      rpData.completedQuestIds.forEach(id => { if (!u.has(id)) { u.add(id); synced++ } })
    }
    if (rpData?.caCount > 0) {
      getCaUnlockIds(rpData.caCount).forEach(id => { if (!u.has(id)) { u.add(id); synced++ } })
      getCaTierUnlockIds(rpData.caByTier ?? {}).forEach(id => { if (!u.has(id)) { u.add(id); synced++ } })
    }
    if (rpData?.completedDiaryIds?.length > 0) {
      rpData.completedDiaryIds.forEach(id => { if (!u.has(id)) { u.add(id); synced++ } })
    }
    if (synced > 0) {
      setUnlocked(u)
      setSyncToast(`${synced} desbloqueio${synced > 1 ? 's' : ''} importado${synced > 1 ? 's' : ''} do RuneProfile`)
    }

    const next = drawOptions(u, completed, levels)
    setOptions(next)
    const { newSet, notifications } = seedHuntStarters(levels, huntUnlocked)
    setHuntUnlocked(newSet)
    if (notifications.length) setTierUnlockNotif(notifications)

    const card = computeDailyCard(completed, u, levels, null)
    setDailyCard(card)

    saveState({
      username: name, realLevels: levels, accountType: type, pamCoins, rerollTokens,
      unlocked: [...u], completed: [...completed],
      history, pickedId: null, hunt,
      huntUnlocked: [...newSet], huntHistory, huntPrefs,
      missionStreak: 0, dailyCard: card, isHCIMDead: rpData?.isDeadHCIM ?? false,
    })

    // Fetch CL in background
    if (rpData?.found) {
      fetchCollectionLogBosses(name).then(cl => { if (cl) setCollectionLog(cl) })
    }
  }

  // ── Refresh levels ─────────────────────────────────────────────────────────
  async function handleRefreshLevels() {
    if (!username) return
    try {
      const levels = await fetchPlayerLevels(username, accountType)
      setRealLevels(levels)
      // Also re-sync RuneProfile
      await syncRuneProfile(username, unlocked)
      saveState({
        username, realLevels: levels, accountType, pamCoins, rerollTokens,
        unlocked: [...unlocked], completed: [...completed],
        history, pickedId, hunt, huntUnlocked: [...huntUnlocked],
        huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
        missionStreak, dailyCard, isHCIMDead,
      })
      return true
    } catch {
      return false
    }
  }

  function handleEquipmentBuy(itemId, cost) {
    if (pamCoins < cost) return
    const newCoins = pamCoins - cost
    const newSet = new Set(obtainedEquipment)
    newSet.add(itemId)
    setPamCoins(newCoins)
    setObtainedEquipment(newSet)
    persist({ pamCoins: newCoins, obtainedEquipment: [...newSet] })
  }

  function handleReset() {
    const u = new Set(), c = new Set(), h = []
    setUnlocked(u); setCompleted(c); setHistory(h)
    setPickedId(null); setShowReward(false); setPamCoins(0); setRerollTokens(0)
    setHunt(null); setHuntHistory([])
    setHuntPrefs({ hideSlayer: false, sort: 'tier' })
    setObtainedEquipment(new Set())
    setMissionStreak(0)
    setIsDailyPick(false)
    setDailyCard(null)
    setOptions(drawOptions(u, c, realLevels))
    const { newSet } = seedHuntStarters(realLevels, new Set())
    setHuntUnlocked(newSet)
    saveState({
      username, realLevels, pamCoins: 0, rerollTokens: 0,
      unlocked: [], completed: [], history: [], pickedId: null,
      hunt: null, huntUnlocked: [...newSet], huntHistory: [],
      huntPrefs: { hideSlayer: false, sort: 'tier' }, obtainedEquipment: [],
      missionStreak: 0, dailyCard: null, isHCIMDead,
    })
  }

  function handleChangeUser() {
    if (!window.confirm('Trocar de usuário irá resetar o progresso. Confirma?')) return
    saveState(null)
    localStorage.clear()
    window.location.reload()
  }

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!username) return <SetupScreen onComplete={handleSetupComplete} />

  const TABS = [
    { id: 'board',   label: 'Missões' },
    { id: 'hunt',    label: 'Hunt' },
    { id: 'shop',    label: 'Loja' },
    { id: 'unlocks', label: `Desbloqueios (${unlocked.size})` },
    { id: 'history', label: `Histórico (${history.length + huntHistory.length})` },
    { id: 'guia',    label: 'Guia' },
    { id: 'config',  label: 'Config' },
  ]

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <TierUnlockModal notifications={tierUnlockNotif} onClose={() => setTierUnlockNotif(null)} />
      <ChapterCompleteModal chapter={chapterCompleteNotif} onClose={() => setChapterCompleteNotif(null)} />
      {isHCIMDead && <HCIMDeadModal username={username} onContinue={() => setIsHCIMDead(false)} />}
      {syncToast && <SyncToast message={syncToast} onClose={() => setSyncToast(null)} />}
      {pendingMission && (
        <MissionConfirmModal
          mission={pendingMission.mission}
          isDaily={pendingMission.isDaily}
          onConfirm={() => { handlePick(pendingMission.mission, pendingMission.isDaily); setPendingMission(null) }}
          onCancel={() => setPendingMission(null)}
        />
      )}

      <AppHeader
        username={username}
        combatLevel={combatLevel}
        completedCount={completed.size}
        missionStreak={missionStreak}
        pamCoins={pamCoins}
        rerollTokens={rerollTokens}
      />

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'board' && (
        <BoardTab
          options={options}
          pickedId={pickedId}
          dailyCard={dailyCard}
          isDailyPick={isDailyPick}
          completed={completed}
          missionStreak={missionStreak}
          pamCoins={pamCoins}
          rerollTokens={rerollTokens}
          showReward={showReward}
          weeklyTheme={currentTheme}
          onPick={setPendingMission}
          onAccept={handleAccept}
          onReroll={handleReroll}
          onSkip={handleSkip}
          onShowReward={() => setShowReward(true)}
        />
      )}

      {tab === 'hunt'    && (
        <HuntTab
          combatLevel={combatLevel}
          hunt={hunt}
          onHuntUpdate={handleHuntUpdate}
          onCoinsChange={handleHuntCoins}
          huntUnlocked={huntUnlocked}
          onHuntUnlockedChange={handleHuntUnlockedChange}
          huntPrefs={huntPrefs}
          onHuntPrefsChange={handleHuntPrefs}
          collectionLog={collectionLog}
        />
      )}
      {tab === 'shop'    && (
        <ShopTab
          combatLevel={combatLevel}
          pamCoins={pamCoins}
          huntUnlocked={huntUnlocked}
          onMonsterBuy={handleShopBuyMonster}
          obtainedEquipment={obtainedEquipment}
          onEquipmentBuy={handleEquipmentBuy}
          completed={completed}
        />
      )}
      {tab === 'unlocks' && <UnlocksTab unlocked={unlocked} realLevels={realLevels} onRefresh={handleRefreshLevels} obtainedEquipment={obtainedEquipment} />}
      {tab === 'history' && <HistoryTab history={history} huntHistory={huntHistory} />}
      {tab === 'guia'    && <GuiaTab />}
      {tab === 'config'  && (
        <ConfigTab
          username={username} onRefresh={handleRefreshLevels}
          onChangeUser={handleChangeUser} onReset={handleReset} />
      )}
    </div>
  )
}
