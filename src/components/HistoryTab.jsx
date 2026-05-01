import { useState } from 'react'
import { DiffBadge } from './MissionCard.jsx'
import { TIER_META } from '../data/monsters.js'
import { parchment } from '../constants.js'

const parch = parchment

// ─── Mission entry ────────────────────────────────────────────────────────────
function MissionEntry({ h }) {
  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <DiffBadge diff={h.diff} />
          <span style={{ fontSize: 11, color: '#8B6914' }}>{h.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#8B6914' }}>+{h.coins} 🪙</span>
          <span style={{ fontSize: 16 }}>{h.rewardIcon}</span>
        </div>
      </div>
      <p style={{ fontWeight: 500, fontSize: 14, margin: '0 0 4px', color: '#2c1a00' }}>{h.title}</p>
      <p style={{ fontSize: 12, color: '#5a3e1b', margin: '0 0 8px', lineHeight: 1.5 }}>{h.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
        background: '#2c1a0011', borderRadius: 6, border: '1px solid #c8a96e44' }}>
        <span style={{ fontSize: 11, color: '#8B6914' }}>Recompensa:</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#2c1a00' }}>{h.reward}</span>
      </div>
    </div>
  )
}

// ─── Hunt entry ───────────────────────────────────────────────────────────────
function HuntEntry({ h }) {
  const [imgErr, setImgErr] = useState(false)
  const meta = TIER_META[h.monsterTier] ?? TIER_META.cb1

  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1rem 1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Monster image */}
        <div style={{
          width: 48, height: 48, borderRadius: 8, background: '#1e1005',
          border: `2px solid ${meta.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          {!imgErr && h.monsterImg ? (
            <img src={h.monsterImg} alt={h.monsterName} onError={() => setImgErr(true)}
              style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }} />
          ) : (
            <span style={{ fontSize: 22 }}>⚔️</span>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00' }}>{h.monsterName}</span>
            <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
              fontWeight: 600,
            }}>{meta.label}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#8B6914' }}>
            <span>⚔️ {h.kills.toLocaleString()} kills</span>
            <span>🪙 {h.coinsEarned.toLocaleString()} PAM</span>
          </div>
        </div>

        <span style={{ fontSize: 11, color: '#8B6914', flexShrink: 0 }}>{h.date}</span>
      </div>
    </div>
  )
}

// ─── Kill totals per monster ──────────────────────────────────────────────────
function KillTotals({ huntHistory }) {
  if (!huntHistory.length) return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhum hunt finalizado ainda.</p>
    </div>
  )

  // Aggregate by monster
  const totals = {}
  for (const h of huntHistory) {
    if (!totals[h.monsterId]) {
      totals[h.monsterId] = { name: h.monsterName, img: h.monsterImg, tier: h.monsterTier, kills: 0, coins: 0, sessions: 0 }
    }
    totals[h.monsterId].kills   += h.kills
    totals[h.monsterId].coins   += h.coinsEarned
    totals[h.monsterId].sessions += 1
  }

  const sorted = Object.entries(totals).sort((a, b) => b[1].kills - a[1].kills)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: '⚔️ Total kills', value: Object.values(totals).reduce((s, t) => s + t.kills, 0).toLocaleString() },
          { label: '🪙 Total ganho', value: Object.values(totals).reduce((s, t) => s + t.coins, 0).toLocaleString() },
          { label: '🎯 Sessões',     value: huntHistory.length },
        ].map(({ label, value }) => (
          <div key={label} style={{ ...parch, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2c1a00', marginTop: 2, fontFamily: 'system-ui, sans-serif' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Per monster */}
      {sorted.map(([id, t]) => {
        const [imgErr, setImgErr] = useState(false)
        const meta = TIER_META[t.tier] ?? TIER_META.cb1
        return (
          <div key={id} style={{ ...parch, borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: '#1e1005', border: `2px solid ${meta.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
              {!imgErr && t.img ? (
                <img src={t.img} alt={t.name} onError={() => setImgErr(true)} style={{ width: 36, height: 36, objectFit: 'contain', imageRendering: 'pixelated' }} />
              ) : <span>⚔️</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00', marginBottom: 2 }}>{t.name}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#8B6914' }}>
                <span>⚔️ {t.kills.toLocaleString()} kills</span>
                <span>🪙 {t.coins.toLocaleString()} PAM</span>
                <span>🎯 {t.sessions} sessão{t.sessions !== 1 ? 'ões' : ''}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HistoryTab({ history, huntHistory }) {
  const [filter, setFilter] = useState('all') // 'all' | 'missions' | 'hunts' | 'totals'

  const FILTERS = [
    { id: 'all',      label: `Todos (${history.length + huntHistory.length})` },
    { id: 'missions', label: `Missões (${history.length})` },
    { id: 'hunts',    label: `Hunts (${huntHistory.length})` },
    { id: 'totals',   label: 'Totais por monstro' },
  ]

  const isEmpty = history.length === 0 && huntHistory.length === 0

  if (isEmpty) return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhuma missão ou hunt concluída ainda.</p>
    </div>
  )

  // Merge and sort by date for 'all'
  const allEntries = [
    ...history.map(h => ({ ...h, _type: 'mission' })),
    ...huntHistory.map(h => ({ ...h, _type: 'hunt' })),
  ]

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: '5px 12px', fontSize: 11, borderRadius: 20, cursor: 'pointer',
            fontFamily: 'inherit', border: '1px solid',
            borderColor: filter === f.id ? '#c8a96e' : '#5a3a0e',
            background:  filter === f.id ? '#c8a96e' : '#2a1a0a',
            color:       filter === f.id ? '#1a0f00' : '#c8a96e',
            fontWeight:  filter === f.id ? 600 : 400,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Totals view */}
      {filter === 'totals' && <KillTotals huntHistory={huntHistory} />}

      {/* List views */}
      {filter !== 'totals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filter === 'all' && allEntries.map((h, i) =>
            h._type === 'mission'
              ? <MissionEntry key={`m-${i}`} h={h} />
              : <HuntEntry    key={`h-${i}`} h={h} />
          )}
          {filter === 'missions' && history.map((h, i) => <MissionEntry key={i} h={h} />)}
          {filter === 'hunts'    && huntHistory.map((h, i) => <HuntEntry key={i} h={h} />)}
          {filter === 'hunts' && huntHistory.length === 0 && (
            <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
              <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhum hunt finalizado ainda.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}