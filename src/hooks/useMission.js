import { useState, useEffect } from 'react'
import { saveState } from './useSave.js'
import { MISSIONS, drawOptions, checkReq } from '../data/missions.js'
import { UNLOCKS } from '../data/unlocks.js'

export function computeDailyCard(completed, unlocked, realLevels, existingCard) {
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

export function useMission({
  username, realLevels, accountType,
  unlocked, setUnlocked,
  pamCoins, setPamCoins,
  rerollTokens, setRerollTokens,
  huntUnlocked, setHuntUnlocked,
  hunt, huntHistory, huntPrefs,
  obtainedEquipment, isHCIMDead,
  weeklyTheme,
  setChapterCompleteNotif,
  saved,
}) {
  const [options,        setOptions]        = useState(() => saved?.options || [])
  const [pickedId,       setPickedId]       = useState(() => saved?.pickedId || null)
  const [showReward,     setShowReward]     = useState(false)
  const [isDailyPick,    setIsDailyPick]    = useState(false)
  const [dailyCard,      setDailyCard]      = useState(() => saved?.dailyCard ?? null)
  const [missionStreak,  setMissionStreak]  = useState(() => saved?.missionStreak ?? 0)
  const [completed,      setCompleted]      = useState(() => new Set(saved?.completed || []))
  const [history,        setHistory]        = useState(() => saved?.history || [])
  const [pendingMission, setPendingMission] = useState(null)

  // Builds full state snapshot for saveState — merges local + external state
  function snap(overrides = {}) {
    return {
      username, realLevels, accountType, pamCoins, rerollTokens,
      options, unlocked: [...unlocked], completed: [...completed],
      history, pickedId, hunt, huntUnlocked: [...huntUnlocked],
      huntHistory, huntPrefs, obtainedEquipment: [...obtainedEquipment],
      missionStreak, dailyCard, isHCIMDead,
      ...overrides,
    }
  }

  // só recalcula ao trocar de usuário; completed/unlocked intencionalmente omitidos para não resetar pick ativo
  useEffect(() => {
    if (!username) return
    const card = computeDailyCard(completed, unlocked, realLevels, dailyCard)
    if (card?.missionId !== dailyCard?.missionId || card?.date !== dailyCard?.date) {
      setDailyCard(card)
    }
  }, [username]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pickedId) setOptions(drawOptions(unlocked, completed, realLevels))
    else if (options.length === 0) setOptions(drawOptions(unlocked, completed, realLevels))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handlePick(mission, isDaily = false) {
    setPickedId(mission.id)
    setIsDailyPick(isDaily)
    setShowReward(false)
    saveState(snap({ pickedId: mission.id }))
  }

  function handleAccept() {
    const m = MISSIONS.find(ms => ms.id === pickedId)
    if (!m) return

    const base        = m.coins ?? 20
    const streakBonus = Math.floor(base * Math.min(missionStreak, 5) * 0.1)
    const weeklyBonus = weeklyTheme.categories.includes(m.category) ? base : 0
    const isDailyBonus = isDailyPick && dailyCard?.missionId === m.id && !dailyCard?.completed
    const dailyBonus  = isDailyBonus ? Math.floor(base * 0.5) : 0
    const earned      = base + streakBonus + weeklyBonus + dailyBonus
    const newStreak   = missionStreak + 1
    const newU        = m.reward ? new Set([...unlocked, m.reward]) : new Set(unlocked)
    const newC        = new Set([...completed, m.id])
    const newCoins    = pamCoins + earned
    const newReroll   = rerollTokens + (m.reroll ?? 0)
    let   newHuntU    = huntUnlocked
    if (m.huntUnlock) newHuntU = new Set([...huntUnlocked, m.huntUnlock])

    const rewardLabel = m.reward ? (UNLOCKS[m.reward]?.label ?? m.reward) : null
    const bonusNotes  = [
      streakBonus > 0 && `🔥 Streak: +${streakBonus}`,
      weeklyBonus > 0 && `${weeklyTheme.emoji} ${weeklyTheme.label}: +${weeklyBonus}`,
      dailyBonus  > 0 && `⭐ Diária: +${dailyBonus}`,
    ].filter(Boolean).join(' · ') || null

    const newH = [{
      id: m.id, title: m.title, chapter: m.chapter, path: m.path,
      category: m.category, desc: m.desc,
      reward: rewardLabel, huntUnlock: m.huntUnlock ?? null,
      reroll: m.reroll ?? 0, coins: earned, bonusNotes,
      date: new Date().toLocaleDateString('pt-BR'),
    }, ...history]

    const chapterDone = MISSIONS
      .filter(ms => ms.chapter === m.chapter && ms.path === 'main')
      .every(ms => newC.has(ms.id))

    const newDailyCard = isDailyBonus ? { ...dailyCard, completed: true } : dailyCard

    setUnlocked(newU)
    setCompleted(newC)
    setHistory(newH)
    setPamCoins(newCoins)
    setRerollTokens(newReroll)
    setMissionStreak(newStreak)
    setIsDailyPick(false)
    setDailyCard(newDailyCard)
    if (m.huntUnlock) setHuntUnlocked(newHuntU)
    setPickedId(null)
    setShowReward(false)
    setOptions(drawOptions(newU, newC, realLevels))

    if (chapterDone) setChapterCompleteNotif(m.chapter)

    saveState({
      username, realLevels, accountType,
      pamCoins: newCoins, rerollTokens: newReroll,
      unlocked: [...newU], completed: [...newC],
      history: newH, pickedId: null,
      hunt, huntUnlocked: [...newHuntU],
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
    setOptions(drawOptions(unlocked, completed, realLevels))
    saveState(snap({ rerollTokens: newTokens, pickedId: null, missionStreak: 0 }))
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
    setOptions(drawOptions(unlocked, completed, realLevels))
    saveState(snap({ pamCoins: newCoins, pickedId: null, missionStreak: 0 }))
  }

  return {
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
  }
}
