import { useState, useEffect, useCallback } from 'react'
import { MISSIONS, drawOptions, CHAPTER_META, getChapterProgress, checkReq } from './data/missions.js'
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
import GuiaTab from './components/GuiaTab.jsx'
import { loadState, saveState } from './hooks/useSave.js'
import { fetchPlayerLevels, calcCombatLevel } from './hooks/useOSRSApi.js'
import { fetchRuneProfile, fetchCollectionLogBosses, getCaUnlockIds, getCaTierUnlockIds } from './hooks/useRuneProfile.js'
import { parchment } from './constants.js'
import { TIERS, MONSTERS, drawTierStarters } from './data/monsters.js'
import TierUnlockModal from './components/TierUnlockModal.jsx'

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

// ── Daily card ─────────────────────────────────────────────────────────────────
function computeDailyCard(completed, unlocked, realLevels, existingCard) {
  const today = new Date().toISOString().split('T')[0]
  if (existingCard?.date === today) return existingCard

  const seed = Math.floor(Date.now() / 86400000)
  const pool = MISSIONS.filter(m =>
    ['Boss', 'Slayer', 'Combat Achievement'].includes(m.category) &&
    !completed.has(m.id) &&
    (m.req ?? []).every(r => checkReq(r, unlocked, realLevels))
  )
  if (!pool.length) return null
  const mission = pool[seed % pool.length]
  return { date: today, missionId: mission.id, completed: false }
}

export function getRecommended(options) {
  if (!options.length) return null
  return options.reduce((best, m) =>
    (m.priority ?? 0) > (best.priority ?? 0) ? m : best
  ).id
}

// ── HCIM Dead Memorial ─────────────────────────────────────────────────────────
function HCIMDeadModal({ username, onContinue }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parchment, borderRadius: 0, padding: '2rem 1.5rem',
        maxWidth: 380, width: '100%', textAlign: 'center',
        border: '3px solid #4a4a4a',
        boxShadow: '0 0 40px #00000088',
      }}>
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
        <button onClick={onContinue} style={{
          padding: '10px 28px', fontSize: 13, borderRadius: 0, fontWeight: 600,
          background: '#3a2408', color: '#f0c860', border: '2px solid #6a4820',
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          Ver progresso memorial
        </button>
      </div>
    </div>
  )
}

// ── Chapter complete modal ─────────────────────────────────────────────────────
function ChapterCompleteModal({ chapter, onClose }) {
  if (!chapter) return null
  const meta = CHAPTER_META[chapter]
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parchment, borderRadius: 0, padding: '2rem 1.5rem',
        maxWidth: 380, width: '100%', textAlign: 'center',
        border: `3px solid ${meta.border}`,
        boxShadow: `0 0 40px ${meta.border}55, 0 20px 60px rgba(0,0,0,0.5)`,
      }}>
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
          background: `${meta.bg}`, border: `1px solid ${meta.border}`,
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
        <button onClick={onClose} style={{
          padding: '10px 28px', fontSize: 13, borderRadius: 0, fontWeight: 600,
          background: meta.color, color: meta.bg, border: `2px solid ${meta.border}`,
          fontFamily: 'inherit', cursor: 'pointer', letterSpacing: '0.04em',
        }}>
          Continuar
        </button>
      </div>
    </div>
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
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parchment, padding: '1.5rem', maxWidth: 360, width: '100%',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${meta.border}`,
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          margin: '0 0 10px', fontFamily: 'system-ui',
          color: meta.color,
          background: meta.bg, padding: '3px 8px', display: 'inline-block',
        }}>
          {isDaily ? 'MISSAO DIARIA' : `CAPITULO ${mission.chapter}`}
        </p>
        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 8px', lineHeight: 1.3 }}>
          {mission.title}
        </p>
        <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 14px', lineHeight: 1.5,
          fontFamily: 'system-ui' }}>
          {mission.desc.split(' — ')[0]}
        </p>
        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 16px', fontFamily: 'system-ui',
          padding: '6px 10px', background: 'var(--c-mid)', border: '1px solid var(--c-accent)' }}>
          Ao confirmar, a missao fica ativa ate ser concluida.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: '1px solid var(--c-accent)', background: 'transparent',
            color: 'var(--c-muted)', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: '2px solid var(--btn-bd)', background: 'var(--btn-bg)', color: 'var(--btn-fg)',
            fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
            boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)',
          }}>Iniciar missao</button>
        </div>
      </div>
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const saved = loadState()

  const [username,   setUsername]   = useState(() => saved?.username   || null)
  const [realLevels, setRealLevels] = useState(() => saved?.realLevels || {})
  const [unlocked,   setUnlocked]   = useState(() => new Set(saved?.unlocked  || []))
  const [completed,  setCompleted]  = useState(() => new Set(saved?.completed || []))
  const [history,    setHistory]    = useState(() => saved?.history    || [])
  const [options,    setOptions]    = useState(() => saved?.options || [])
  const [pickedId,   setPickedId]   = useState(() => saved?.pickedId   || null)
  const [showReward, setShowReward] = useState(false)
  const [tab,        setTab]        = useState('board')
  const [pamCoins,   setPamCoins]   = useState(() => saved?.pamCoins   || 0)
  const [rerollTokens, setRerollTokens] = useState(() => saved?.rerollTokens ?? 0)
  const [hunt,          setHunt]          = useState(() => saved?.hunt          || null)
  const [huntUnlocked,  setHuntUnlocked]  = useState(() => new Set(saved?.huntUnlocked || []))
  const [huntHistory,   setHuntHistory]   = useState(() => saved?.huntHistory   || [])
  const [huntPrefs,     setHuntPrefs]     = useState(() => saved?.huntPrefs     || { hideSlayer: false, sort: 'tier' })
  const [accountType,   setAccountType]   = useState(() => saved?.accountType   || 'ironman')
  const [tierUnlockNotif,      setTierUnlockNotif]      = useState(null)
  const [chapterCompleteNotif, setChapterCompleteNotif] = useState(null)
  const [obtainedEquipment,    setObtainedEquipment]    = useState(() => new Set(saved?.obtainedEquipment || []))

  // ── New state ────────────────────────────────────────────────────────────────
  const [missionStreak,  setMissionStreak]  = useState(() => saved?.missionStreak ?? 0)
  const [isDailyPick,    setIsDailyPick]    = useState(false)
  const [dailyCard,      setDailyCard]      = useState(() => saved?.dailyCard ?? null)
  const [syncToast,      setSyncToast]      = useState(null)
  const [collectionLog,  setCollectionLog]  = useState(null)
  const [isHCIMDead,     setIsHCIMDead]     = useState(() => saved?.isHCIMDead ?? false)
  const [pendingMission, setPendingMission] = useState(null) // { mission, isDaily }

  const combatLevel  = calcCombatLevel(realLevels)
  const activeMission = pickedId ? MISSIONS.find(m => m.id === pickedId) : null
  const currentTheme  = getCurrentTheme()

  // Daily card: recalculate when needed
  useEffect(() => {
    if (!username) return
    const card = computeDailyCard(completed, unlocked, realLevels, dailyCard)
    if (card?.missionId !== dailyCard?.missionId || card?.date !== dailyCard?.date) {
      setDailyCard(card)
    }
  }, [username]) // eslint-disable-line react-hooks/exhaustive-deps

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

  function seedHuntStarters(levels, existingUnlocked) {
    const cb = calcCombatLevel(levels)
    let newSet = new Set(existingUnlocked)
    let changed = false
    const notifications = []
    for (const tier of TIERS) {
      if (cb >= tier.minCB) {
        const drawn = drawTierStarters(tier.id, cb, newSet, 2)
        if (drawn.length > 0) {
          drawn.forEach(id => newSet.add(id))
          changed = true
          notifications.push({
            tierLabel: tier.label,
            monsters: drawn.map(id => MONSTERS.find(m => m.id === id)).filter(Boolean),
          })
        }
      }
    }
    return { newSet, changed, notifications }
  }

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

  useEffect(() => {
    if (!pickedId) setOptions(drawOptions(unlocked, completed, realLevels))
    else if (options.length === 0) setOptions(drawOptions(unlocked, completed, realLevels))
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

  // ── Mission flow ───────────────────────────────────────────────────────────
  function handlePick(mission, isDaily = false) {
    setPickedId(mission.id)
    setIsDailyPick(isDaily)
    setShowReward(false)
    persist({ pickedId: mission.id })
  }

  function handleAccept() {
    const m    = activeMission
    const base = m.coins ?? 20

    // Streak bonus (+10% per streak level, max +50%)
    const streakBonus = Math.floor(base * Math.min(missionStreak, 5) * 0.1)

    // Weekly theme bonus (+100% if category matches)
    const isThemeMatch  = currentTheme.categories.includes(m.category)
    const weeklyBonus   = isThemeMatch ? base : 0

    // Daily card bonus (+50% if picked from daily slot today)
    const isDailyBonus = isDailyPick && dailyCard?.missionId === m.id && !dailyCard?.completed
    const dailyBonus   = isDailyBonus ? Math.floor(base * 0.5) : 0

    const earned     = base + streakBonus + weeklyBonus + dailyBonus
    const newStreak  = missionStreak + 1
    const newU = m.reward ? new Set([...unlocked, m.reward]) : new Set(unlocked)
    const newC = new Set([...completed, m.id])
    const newCoins  = pamCoins + earned
    const newReroll = rerollTokens + (m.reroll ?? 0)

    let newHuntUnlocked = huntUnlocked
    if (m.huntUnlock) newHuntUnlocked = new Set([...huntUnlocked, m.huntUnlock])

    const rewardLabel = m.reward ? (UNLOCKS[m.reward]?.label ?? m.reward) : null
    const bonusNotes = [
      streakBonus > 0 && `🔥 Streak: +${streakBonus}`,
      weeklyBonus > 0 && `${currentTheme.emoji} ${currentTheme.label}: +${weeklyBonus}`,
      dailyBonus  > 0 && `⭐ Diária: +${dailyBonus}`,
    ].filter(Boolean).join(' · ')

    const newH = [{
      id: m.id, title: m.title, chapter: m.chapter, path: m.path,
      category: m.category, desc: m.desc,
      reward: rewardLabel,
      huntUnlock: m.huntUnlock ?? null,
      reroll: m.reroll ?? 0,
      coins: earned,
      bonusNotes: bonusNotes || null,
      date: new Date().toLocaleDateString('pt-BR'),
    }, ...history]

    const chapterMains = MISSIONS.filter(ms => ms.chapter === m.chapter && ms.path === 'main')
    const chapterDone  = chapterMains.every(ms => newC.has(ms.id))

    // Update daily card if used
    let newDailyCard = dailyCard
    if (isDailyBonus) newDailyCard = { ...dailyCard, completed: true }

    setUnlocked(newU); setCompleted(newC)
    setHistory(newH);  setPamCoins(newCoins)
    setRerollTokens(newReroll)
    setMissionStreak(newStreak)
    setIsDailyPick(false)
    setDailyCard(newDailyCard)
    if (m.huntUnlock) setHuntUnlocked(newHuntUnlocked)
    setPickedId(null); setShowReward(false)
    const next = drawOptions(newU, newC, realLevels)
    setOptions(next)

    if (chapterDone) setChapterCompleteNotif(m.chapter)

    saveState({
      username, realLevels, accountType, pamCoins: newCoins, rerollTokens: newReroll,
      unlocked: [...newU], completed: [...newC],
      history: newH, pickedId: null, hunt, huntUnlocked: [...newHuntUnlocked],
      huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
      missionStreak: newStreak, dailyCard: newDailyCard, isHCIMDead,
    })
  }

  function handleReroll() {
    if (rerollTokens < 1) return
    const newTokens = rerollTokens - 1
    setRerollTokens(newTokens)
    setMissionStreak(0)
    setPickedId(null)
    setIsDailyPick(false)
    setShowReward(false)
    const next = drawOptions(unlocked, completed, realLevels)
    setOptions(next)
    persist({ rerollTokens: newTokens, pickedId: null, missionStreak: 0 })
  }

  function handleSkip() {
    const SKIP_COST = 15
    if (pamCoins < SKIP_COST) return
    const newCoins = pamCoins - SKIP_COST
    setPamCoins(newCoins)
    setMissionStreak(0)
    setPickedId(null)
    setIsDailyPick(false)
    setShowReward(false)
    const next = drawOptions(unlocked, completed, realLevels)
    setOptions(next)
    persist({ pamCoins: newCoins, pickedId: null, missionStreak: 0 })
  }

  function handleHuntUpdate(newHunt, finishedHunt = null) {
    setHunt(newHunt)
    if (finishedHunt) {
      const newHH = [finishedHunt, ...huntHistory]
      setHuntHistory(newHH)
      persist({ hunt: newHunt, huntHistory: newHH })
    } else {
      persist({ hunt: newHunt, huntHistory })
    }
  }

  function handleHuntUnlockedChange(newSet) {
    setHuntUnlocked(newSet)
    persist({ hunt, huntUnlocked: [...newSet] })
  }

  function handleHuntCoins(amount) {
    const newCoins = pamCoins + amount
    setPamCoins(newCoins)
    persist({ pamCoins: newCoins })
  }

  function handleShopBuyMonster(newHuntUnlocked, cost) {
    const newCoins = pamCoins - cost
    setHuntUnlocked(newHuntUnlocked)
    setPamCoins(newCoins)
    persist({ huntUnlocked: [...newHuntUnlocked], pamCoins: newCoins })
  }

  function handleHuntPrefs(newPrefs) {
    setHuntPrefs(newPrefs)
    persist({ huntPrefs: newPrefs })
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

  const recId          = getRecommended(options)
  const chapterProgress = getChapterProgress(completed)

  // Compute daily mission for display
  const dailyMission = dailyCard
    ? MISSIONS.find(m => m.id === dailyCard.missionId)
    : null

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

      {/* Header */}
      <div style={{ ...parchment, padding: '1rem 1.5rem',
        marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 2px', color: 'var(--c-text)' }}>
            Pick a Mission
          </h1>
          <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            {username} · CB {combatLevel} · {completed.size} missões
            {missionStreak >= 2 && (
              <span style={{ fontSize: 11, background: '#3a1a00', border: '1px solid #c8692a',
                color: '#f5a060', padding: '1px 7px', fontFamily: 'system-ui', fontWeight: 700 }}>
                🔥 {missionStreak}
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          {/* PAM Coins */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--c-text)', borderRadius: 8, padding: '4px 12px' }}>
            <span style={{ fontSize: 20 }}>🪙</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#f5d78e', fontFamily: 'system-ui, sans-serif' }}>
              {pamCoins.toLocaleString()}
            </span>
            <span style={{ fontSize: 13, color: 'var(--c-muted)' }}>PAM</span>
          </div>
          {rerollTokens > 0 && (
            <div style={{ fontSize: 11, color: 'var(--c-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#c8a96e', fontWeight: 600 }}>{rerollTokens}</span>
              <span>re-roll{rerollTokens !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      <TabNav tabs={TABS} active={tab} onChange={setTab} />

      {/* Board */}
      {tab === 'board' && (
        <div style={{ ...parchment, padding: '1.25rem' }}>

          {/* Chapter progress bar */}
          <div style={{ display: 'flex', gap: 4, marginBottom: '1rem' }}>
            {[1,2,3,4,5,6].map(ch => {
              const p    = chapterProgress[ch]
              const meta = CHAPTER_META[ch]
              const done   = p.done === p.total && p.total > 0
              const active = !done && p.done > 0
              return (
                <div key={ch} title={`${meta.label}: ${p.done}/${p.total}`}
                  style={{ flex: 1, height: 4, background: done ? meta.border : active ? `${meta.border}66` : '#3a2a0a' }} />
              )
            })}
          </div>

          {/* Weekly theme banner */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1a1000', border: '1px solid #c8a96e',
            padding: '6px 12px', marginBottom: '1rem',
            fontSize: 11, color: '#c8a96e', fontFamily: 'system-ui',
          }}>
            <span style={{ fontSize: 14 }}>{currentTheme.emoji}</span>
            <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{currentTheme.label}</span>
            <span style={{ color: '#8a7050' }}>— missões de {currentTheme.label.replace(' Week','')} dão 2× moedas esta semana</span>
          </div>

          {!pickedId && (
            <>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 1rem', textAlign: 'center' }}>
                Escolha uma missão — a recompensa é revelada ao concluir
              </p>
              {options.length === 0
                ? <p style={{ color: 'var(--c-muted)', fontSize: 13, textAlign: 'center' }}>
                    Nenhuma missão disponível com seus desbloqueios atuais.
                  </p>
                : <div style={{ display: 'flex', gap: 10 }}>
                    {options.map(m => (
                      <MissionCard key={m.id} mission={m} state="idle"
                        recommended={m.id === recId}
                        isThemeMatch={currentTheme.categories.includes(m.category)}
                        onClick={() => setPendingMission({ mission: m, isDaily: false })} />
                    ))}
                  </div>
              }

              {/* Daily card */}
              {dailyMission && !dailyCard?.completed && !completed.has(dailyMission.id) && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#c8a96e', fontFamily: 'system-ui',
                      fontWeight: 700, letterSpacing: '0.08em' }}>
                      ⭐ MISSÃO DIÁRIA
                    </span>
                    <span style={{ fontSize: 10, color: '#8a7050', fontFamily: 'system-ui' }}>
                      +50% recompensa · muda à meia-noite
                    </span>
                  </div>
                  <div style={{ border: '2px solid #c8a96e', boxShadow: '0 0 12px #c8a96e33' }}>
                    <MissionCard mission={dailyMission} state="idle"
                      recommended={false} isDaily={true}
                      onClick={() => setPendingMission({ mission: dailyMission, isDaily: true })} />
                  </div>
                </div>
              )}

              {dailyCard?.completed && (
                <div style={{ marginTop: 14, padding: '8px 12px', background: '#1a2a10',
                  border: '1px solid #97C459', fontSize: 11, color: '#97C459',
                  fontFamily: 'system-ui', textAlign: 'center' }}>
                  ✅ Missão diária concluída! Nova missão amanhã.
                </div>
              )}
            </>
          )}

          {pickedId && !showReward && activeMission && (
            <>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 1rem', textAlign: 'center' }}>
                Complete a missão no jogo e volte aqui
              </p>
              {isDailyPick ? (
                <div style={{ marginBottom: '1rem', border: '2px solid #c8a96e', boxShadow: '0 0 12px #c8a96e33' }}>
                  <MissionCard mission={activeMission} state="selected"
                    recommended={false} isDaily={true} onClick={() => {}} />
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
                  {options.map(m => (
                    <MissionCard key={m.id} mission={m}
                      state={m.id === pickedId ? 'selected' : 'faded'}
                      recommended={false}
                      isThemeMatch={currentTheme.categories.includes(m.category)}
                      onClick={() => {}} />
                  ))}
                </div>
              )}

              {/* Bonus preview */}
              {(() => {
                const base = activeMission.coins ?? 20
                const sk   = Math.floor(base * Math.min(missionStreak, 5) * 0.1)
                const wk   = currentTheme.categories.includes(activeMission.category) ? base : 0
                const dy   = isDailyPick && !dailyCard?.completed ? Math.floor(base * 0.5) : 0
                const total = base + sk + wk + dy
                if (total === base) return null
                return (
                  <div style={{ marginBottom: 10, padding: '6px 12px', background: '#1a1000',
                    border: '1px solid #6a4820', fontSize: 11, color: '#c8a96e',
                    fontFamily: 'system-ui', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span>Base: {base}🪙</span>
                    {sk > 0 && <span>🔥 Streak: +{sk}</span>}
                    {wk > 0 && <span>{currentTheme.emoji} Tema: +{wk}</span>}
                    {dy > 0 && <span>⭐ Diária: +{dy}</span>}
                    <span style={{ fontWeight: 700 }}>= {total}🪙</span>
                  </div>
                )
              })()}

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowReward(true)}
                  style={{ flex: 1, padding: 11, fontSize: 13, borderRadius: 0,
                    border: '2px solid var(--btn-bd)', fontWeight: 600, background: 'var(--btn-bg)',
                    color: 'var(--btn-fg)', fontFamily: 'inherit', cursor: 'pointer',
                    boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)' }}>
                  Completei! Revelar recompensa
                </button>
                {rerollTokens > 0 && (
                  <button onClick={handleReroll}
                    title={`Usar 1 re-roll (${rerollTokens} disponíveis) — reseta streak`}
                    style={{ padding: '11px 14px', fontSize: 13, borderRadius: 0,
                      border: '1px solid #c8a96e', fontWeight: 600, fontFamily: 'inherit',
                      cursor: 'pointer', background: 'transparent', color: '#c8a96e',
                      whiteSpace: 'nowrap' }}>
                    Re-roll ({rerollTokens})
                  </button>
                )}
                <button onClick={handleSkip} disabled={pamCoins < 15}
                  title={pamCoins < 15 ? 'Precisa de 15 PAM Coins' : 'Pular missão (15 🪙) — reseta streak'}
                  style={{ padding: '11px 14px', fontSize: 13, borderRadius: 0,
                    border: '1px solid #6a4820', fontWeight: 600, fontFamily: 'inherit',
                    cursor: pamCoins >= 15 ? 'pointer' : 'not-allowed',
                    background: 'transparent', color: pamCoins >= 15 ? 'var(--c-muted)' : '#4a3010',
                    whiteSpace: 'nowrap' }}>
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
