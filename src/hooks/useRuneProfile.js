const API = 'https://api.runeprofile.com/v1'
const TTL  = 5 * 60 * 1000 // 5 min

// RuneProfile quest name → PAM unlock ID
export const QUEST_TO_PAM = {
  "Waterfall Quest":                        'q_waterfall',
  "Cook's Assistant":                       'q_cooks_assistant',
  "Doric's Quest":                          'q_dorics',
  "Stronghold of Security":                 'q_stronghold',
  "The Knight's Sword":                     'q_knights_sword',
  "Priest in Peril":                        'q_priest_peril',
  "Biohazard":                              'q_biohazard',
  "Fairytale I - Growing Pains":            'q_fairytale1',
  "Rune Mysteries":                         'q_rune_mysteries',
  "Druidic Ritual":                         'q_druidic',
  "Dragon Slayer I":                        'q_ds1',
  "Monkey Madness I":                       'q_mm1',
  "Recipe for Disaster":                    'q_rfd',
  "Regicide":                               'q_regicide',
  "Monkey Madness II":                      'q_mm2',
  "Dragon Slayer II":                       'q_ds2',
  "Song of the Elves":                      'q_sote',
  "Desert Treasure I":                      'q_dt1',
  "Desert Treasure II - The Fallen Empire": 'q_dt2',
}

// CA count milestones auto-added to unlocked when detected
export const CA_MILESTONES = [
  { id: 'ca_10',  count: 10  },
  { id: 'ca_20',  count: 20  },
  { id: 'ca_50',  count: 50  },
  { id: 'ca_100', count: 100 },
]

// CA tier completion milestones (total tasks per tier in OSRS as of 2024)
export const CA_TIER_TOTALS = {
  Easy:          { id: 'ca_easy_done',   total: 33  },
  Medium:        { id: 'ca_medium_done', total: 41  },
  Hard:          { id: 'ca_hard_done',   total: 65  },
  Elite:         { id: 'ca_elite_done',  total: 37  },
  Master:        { id: 'ca_master_done', total: 130 },
  Grandmaster:   { id: 'ca_gm_done',     total: 7   },
}

// RuneProfile diary name → PAM unlock ID  (region name as returned by API)
export const DIARY_TO_PAM = {
  'Lumbridge & Draynor': {
    Easy:   'diary_lumbridge_easy',
    Medium: 'diary_lumbridge_medium',
  },
  'Varrock': {
    Easy:   'diary_varrock_easy',
    Medium: 'diary_varrock_medium',
  },
  'Falador': {
    Easy:   'diary_falador_easy',
  },
  'Karamja': {
    Easy:   'diary_karamja_easy',
  },
  'Ardougne': {
    Easy:   'diary_ardougne_easy',
    Medium: 'diary_ardougne_medium',
  },
  'Morytania': {
    Easy:   'diary_morytania_easy',
    Medium: 'diary_morytania_medium',
  },
}

function getCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { v, ts } = JSON.parse(raw)
    if (Date.now() - ts > TTL) return null
    return v
  } catch { return null }
}

function setCache(key, v) {
  try { localStorage.setItem(key, JSON.stringify({ v, ts: Date.now() })) } catch {}
}

const H = { 'User-Agent': 'PickAMission-PAM' }

export async function fetchRuneProfile(username) {
  const ck  = `rp:${username.toLowerCase()}`
  const hit = getCache(ck)
  if (hit) return hit

  const url = path => `${API}/accounts/${encodeURIComponent(username)}${path}`

  const [sumR, qR, actR, diaryR] = await Promise.allSettled([
    fetch(url(''),                         { headers: H }),
    fetch(url('/quests'),                  { headers: H }),
    fetch(url('/activities?limit=30'),     { headers: H }),
    fetch(url('/achievement-diaries'),     { headers: H }),
  ])

  const out = {
    found:               false,
    accountType:         null,
    isDeadHCIM:          false,
    completedQuestIds:   [],
    caCount:             0,
    caByTier:            {},
    completedDiaryIds:   [], // PAM unlock IDs for completed diaries
    recentActivities:    [],
  }

  if (sumR.status === 'fulfilled' && sumR.value.ok) {
    const s  = await sumR.value.json()
    const rk = s.accountType?.key ?? null
    out.found      = true
    out.isDeadHCIM = rk === 'dead_hardcore_ironman'
    out.accountType = rk?.includes('hardcore') ? 'hcim'
      : rk === 'ironman' || rk?.includes('ironman') ? 'ironman'
      : rk ? 'normal' : null

    ;(Array.isArray(s.combatAchievements) ? s.combatAchievements : []).forEach(t => {
      const name  = t.tierName ?? t.name ?? t.tier
      const count = t.completed ?? t.completedCount ?? 0
      if (name) { out.caByTier[name] = count; out.caCount += count }
    })
  }

  if (qR.status === 'fulfilled' && qR.value.ok) {
    const body = await qR.value.json()
    out.completedQuestIds = (body.data ?? body ?? [])
      .filter(q => q.state === 'finished')
      .map(q => QUEST_TO_PAM[q.name])
      .filter(Boolean)
  }

  if (actR.status === 'fulfilled' && actR.value.ok) {
    const body = await actR.value.json()
    out.recentActivities = body.activities ?? []
  }

  if (diaryR.status === 'fulfilled' && diaryR.value.ok) {
    const body = await diaryR.value.json()
    const diaries = body.data ?? body ?? []
    for (const diary of diaries) {
      const region = diary.region ?? diary.name
      const tiers  = diary.tiers ?? []
      const pamRegion = DIARY_TO_PAM[region]
      if (!pamRegion) continue
      for (const tier of tiers) {
        const tierName  = tier.tier ?? tier.name
        const completed = tier.completed === true || tier.status === 'completed'
        if (completed && pamRegion[tierName]) {
          out.completedDiaryIds.push(pamRegion[tierName])
        }
      }
    }
  }

  if (out.found) setCache(ck, out)
  return out
}

export async function fetchCollectionLogBosses(username) {
  const ck  = `rp:cl:${username.toLowerCase()}`
  const hit = getCache(ck)
  if (hit) return hit

  try {
    const res = await fetch(
      `${API}/accounts/${encodeURIComponent(username)}/collection-log/Bosses`,
      { headers: H }
    )
    if (!res.ok) return null
    const data = await res.json()
    setCache(ck, data)
    return data
  } catch { return null }
}

// Derive CA unlock IDs from total CA count
export function getCaUnlockIds(caCount) {
  return CA_MILESTONES.filter(m => caCount >= m.count).map(m => m.id)
}

// Derive CA tier-completion unlock IDs from caByTier object
export function getCaTierUnlockIds(caByTier) {
  return Object.entries(CA_TIER_TOTALS)
    .filter(([tier, { total }]) => (caByTier[tier] ?? 0) >= total)
    .map(([, { id }]) => id)
}
