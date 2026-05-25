import { useState, Fragment } from 'react'
import { DiffBadge, ChapterBadge } from './MissionCard.jsx'
import { TIER_META } from '../data/monsters.js'
import { MONSTERS } from '../data/monsters.js'
import { parchment } from '../constants.js'

const parch = parchment

// ─── Mission entry ────────────────────────────────────────────────────────────
function MissionEntry({ h }) {
  const huntMonster = h.huntUnlock ? MONSTERS.find(m => m.id === h.huntUnlock) : null
  return (
    <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--c-accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {h.chapter ? <ChapterBadge chapter={h.chapter} /> : <DiffBadge diff={h.diff} />}
          <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>{h.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>+{h.coins} 🪙</span>
          {h.reroll > 0 && <span style={{ fontSize: 11, color: '#c8a96e' }}>+{h.reroll} re-roll{h.reroll !== 1 ? 's' : ''}</span>}
          {h.rewardIcon && <span style={{ fontSize: 16 }}>{h.rewardIcon}</span>}
        </div>
      </div>
      <p style={{ fontWeight: 500, fontSize: 14, margin: '0 0 4px', color: 'var(--c-text)' }}>{h.title}</p>
      <p style={{ fontSize: 12, color: '#5a3e1b', margin: '0 0 8px', lineHeight: 1.5 }}>{h.desc}</p>
      {(h.reward || huntMonster) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {h.reward && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
              background: 'rgba(148,134,109,0.13)', border: '1px solid var(--c-accent)' }}>
              <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>Desbloqueio:</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--c-text)' }}>{h.reward}</span>
            </div>
          )}
          {huntMonster && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
              background: '#e8f0e033', border: '1px solid #97C45966' }}>
              <span style={{ fontSize: 11, color: '#3B6D11' }}>Monstro:</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--c-text)' }}>{huntMonster.name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Hunt entry ───────────────────────────────────────────────────────────────
function HuntEntry({ h }) {
  const [imgErr, setImgErr] = useState(false)
  const meta = TIER_META[h.monsterTier] ?? TIER_META.cb1

  return (
    <div style={{ padding: '1rem 0', borderBottom: '1px solid var(--c-accent)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 8, background: 'var(--c-mid)',
          border: `2px solid ${meta.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
        }}>
          {!imgErr && h.monsterImg ? (
            <img src={h.monsterImg} alt={h.monsterName} onError={() => setImgErr(true)}
              style={{ width: 34, height: 34, objectFit: 'contain', imageRendering: 'pixelated' }} />
          ) : (
            <span style={{ fontSize: 22 }}>⚔</span>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)' }}>{h.monsterName}</span>
            <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
              fontWeight: 600,
            }}>{meta.label}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--c-muted)' }}>
            <span>{h.kills.toLocaleString()} kills</span>
            <span>{h.coinsEarned.toLocaleString()} PAM</span>
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--c-muted)', flexShrink: 0 }}>{h.date}</span>
      </div>
    </div>
  )
}

// ─── Kill totals per monster ──────────────────────────────────────────────────
function MonsterTotalRow({ t }) {
  const [imgErr, setImgErr] = useState(false)
  const meta = TIER_META[t.tier] ?? TIER_META.cb1
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--c-accent)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--c-mid)', border: `2px solid ${meta.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        {!imgErr && t.img ? (
          <img src={t.img} alt={t.name} onError={() => setImgErr(true)} style={{ width: 30, height: 30, objectFit: 'contain', imageRendering: 'pixelated' }} />
        ) : <span>*</span>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', marginBottom: 2 }}>{t.name}</div>
        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--c-muted)' }}>
          <span>{t.kills.toLocaleString()} kills</span>
          <span>{t.coins.toLocaleString()} PAM</span>
          <span>{t.sessions} sessão{t.sessions !== 1 ? 'ões' : ''}</span>
        </div>
      </div>
    </div>
  )
}

function KillTotals({ huntHistory }) {
  if (!huntHistory.length)
    return <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Nenhum hunt finalizado ainda.</p>

  const totals = {}
  for (const h of huntHistory) {
    if (!totals[h.monsterId]) {
      totals[h.monsterId] = { name: h.monsterName, img: h.monsterImg, tier: h.monsterTier, kills: 0, coins: 0, sessions: 0 }
    }
    totals[h.monsterId].kills    += h.kills
    totals[h.monsterId].coins    += h.coinsEarned
    totals[h.monsterId].sessions += 1
  }

  const sorted = Object.entries(totals).sort((a, b) => b[1].kills - a[1].kills)

  return (
    <>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Total kills', value: Object.values(totals).reduce((s, t) => s + t.kills, 0).toLocaleString() },
          { label: 'Total ganho', value: Object.values(totals).reduce((s, t) => s + t.coins, 0).toLocaleString() + ' PAM' },
          { label: 'Sessões',     value: huntHistory.length },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: '8px 10px', textAlign: 'center', background: 'var(--c-mid)', border: '1px solid var(--c-accent)', borderRadius: 6 }}>
            <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)', marginTop: 2, fontFamily: 'system-ui, sans-serif' }}>{value}</div>
          </div>
        ))}
      </div>
      {sorted.map(([id, t]) => <MonsterTotalRow key={id} t={t} />)}
    </>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HistoryTab({ history, huntHistory }) {
  const [filter, setFilter] = useState('all')

  const FILTERS = [
    { id: 'all',      label: `Todos (${history.length + huntHistory.length})` },
    { id: 'missions', label: `Missões (${history.length})` },
    { id: 'hunts',    label: `Hunts (${huntHistory.length})` },
    { id: 'totals',   label: 'Totais' },
  ]

  const isEmpty = history.length === 0 && huntHistory.length === 0

  const allEntries = [
    ...history.map(h => ({ ...h, _type: 'mission' })),
    ...huntHistory.map(h => ({ ...h, _type: 'hunt' })),
  ]

  return (
    <div style={{ ...parch, padding: 0, overflow: 'hidden' }}>
      {/* Tab bar inside the card */}
      <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-accent)', borderBottom: '2px solid var(--c-border)' }}>
        {FILTERS.map((f, i) => (
          <Fragment key={f.id}>
            {i > 0 && <span style={{ color: 'var(--c-mid)', fontSize: 16, alignSelf: 'center', userSelect: 'none', flexShrink: 0 }}>|</span>}
            <button onClick={() => setFilter(f.id)} style={{
              padding: '8px 12px', fontSize: 11, border: 'none', borderRadius: 0,
              fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              background: filter === f.id ? 'var(--c-panel)' : 'transparent',
              color: filter === f.id ? 'var(--c-text)' : 'var(--c-panel)',
              fontWeight: filter === f.id ? 700 : 400,
            }}>{f.label}</button>
          </Fragment>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        {isEmpty ? (
          <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Nenhuma missão ou hunt concluída ainda.</p>
        ) : filter === 'totals' ? (
          <KillTotals huntHistory={huntHistory} />
        ) : (
          <>
            {filter === 'all'      && allEntries.map((h, i) =>
              h._type === 'mission'
                ? <MissionEntry key={`m-${i}`} h={h} />
                : <HuntEntry    key={`h-${i}`} h={h} />
            )}
            {filter === 'missions' && history.map((h, i) => <MissionEntry key={i} h={h} />)}
            {filter === 'hunts'    && (
              huntHistory.length === 0
                ? <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Nenhum hunt finalizado ainda.</p>
                : huntHistory.map((h, i) => <HuntEntry key={i} h={h} />)
            )}
          </>
        )}
      </div>
    </div>
  )
}
