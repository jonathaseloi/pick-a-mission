// ─────────────────────────────────────────────────────────────────────────────
// OSRS Hiscores API — Ironman
// Proxy público para evitar CORS
// ─────────────────────────────────────────────────────────────────────────────

const PROXY = 'https://api.osrsproxy.com/hiscores/ironman'

// Ordem das skills no retorno da API (formato CSV da Jagex)
const SKILL_ORDER = [
  'Overall', 'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged',
  'Prayer', 'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing',
  'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility',
  'Thieving', 'Slayer', 'Farming', 'Runecraft', 'Hunter', 'Construction',
]

/**
 * Busca os níveis reais de um jogador ironman.
 * Retorna um objeto { Attack: 70, Strength: 65, ... } ou lança erro.
 */
export async function fetchPlayerLevels(username) {
  const url = `${PROXY}/${encodeURIComponent(username)}`
  const res = await fetch(url)

  if (!res.ok) throw new Error(`Jogador não encontrado ou erro na API (${res.status})`)

  const text = await res.text()

  // Formato CSV: rank,level,xp por linha, uma skill por linha
  const lines = text.trim().split('\n')
  const levels = {}

  lines.forEach((line, i) => {
    if (i >= SKILL_ORDER.length) return
    const parts = line.split(',')
    const level = parseInt(parts[1], 10)
    if (!isNaN(level) && SKILL_ORDER[i]) {
      levels[SKILL_ORDER[i]] = level
    }
  })

  if (Object.keys(levels).length === 0) throw new Error('Resposta inválida da API')

  return levels
}

/**
 * Calcula o combat level baseado nos níveis reais.
 */
export function calcCombatLevel(levels) {
  const att = levels.Attack      ?? 1
  const str = levels.Strength    ?? 1
  const def = levels.Defence     ?? 1
  const hp  = levels.Hitpoints   ?? 10
  const pra = levels.Prayer      ?? 1
  const ran = levels.Ranged      ?? 1
  const mag = levels.Magic       ?? 1

  const base   = 0.25 * (def + hp + Math.floor(pra / 2))
  const melee  = 0.325 * (att + str)
  const ranged = 0.325 * Math.floor(ran * 1.5)
  const magic  = 0.325 * Math.floor(mag * 1.5)

  return Math.floor(base + Math.max(melee, ranged, magic))
}