import { useState } from 'react'
import { TIERS, MONSTERS, drawTierStarters } from '../data/monsters.js'
import { calcCombatLevel } from './useOSRSApi.js'

export function useHunt({ saved, persistRef, pamCoins, setPamCoins }) {
  const [hunt,            setHunt]            = useState(() => saved?.hunt || null)
  const [huntUnlocked,    setHuntUnlocked]    = useState(() => new Set(saved?.huntUnlocked || []))
  const [huntHistory,     setHuntHistory]     = useState(() => saved?.huntHistory || [])
  const [huntPrefs,       setHuntPrefs]       = useState(() => saved?.huntPrefs || { hideSlayer: false, sort: 'tier' })
  const [tierUnlockNotif, setTierUnlockNotif] = useState(null)

  // roda só no mount; seedHuntStarters usa realLevels snapshot inicial, re-rodar causaria desbloqueios duplicados
  function seedHuntStarters(levels, existingUnlocked) {
    const cb = calcCombatLevel(levels)
    const newSet = new Set(existingUnlocked)
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

  function handleHuntUpdate(newHunt, finishedHunt = null) {
    setHunt(newHunt)
    if (finishedHunt) {
      const newHH = [finishedHunt, ...huntHistory]
      setHuntHistory(newHH)
      persistRef.current?.({ hunt: newHunt, huntHistory: newHH })
    } else {
      persistRef.current?.({ hunt: newHunt, huntHistory })
    }
  }

  function handleHuntUnlockedChange(newSet) {
    setHuntUnlocked(newSet)
    persistRef.current?.({ hunt, huntUnlocked: [...newSet] })
  }

  function handleHuntCoins(amount) {
    const newCoins = pamCoins + amount
    setPamCoins(newCoins)
    persistRef.current?.({ pamCoins: newCoins })
  }

  function handleShopBuyMonster(newHuntUnlocked, cost) {
    const newCoins = pamCoins - cost
    setHuntUnlocked(newHuntUnlocked)
    setPamCoins(newCoins)
    persistRef.current?.({ huntUnlocked: [...newHuntUnlocked], pamCoins: newCoins })
  }

  function handleHuntPrefs(newPrefs) {
    setHuntPrefs(newPrefs)
    persistRef.current?.({ huntPrefs: newPrefs })
  }

  return {
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
  }
}
