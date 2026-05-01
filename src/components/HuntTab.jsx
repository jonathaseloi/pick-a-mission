import { useState, useEffect } from 'react'
import { MONSTERS, getAvailableMonsters, TIER_META } from '../data/monsters.js'
import { parchment } from '../App.jsx'

// ─── Monster Card ─────────────────────────────────────────────────────────────
function MonsterCard({ monster, onSelect }) {
  const meta = TIER_META[monster.tier]
  return (
    <div
      onClick={() => onSelect(monster)}
      style={{
        ...parchment,
        borderRadius: 10,
        padding: '12px 14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transition: 'transform 0.12s, box-shadow 0.12s',
        borderLeft: `4px solid ${meta.border}`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{monster.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00' }}>{monster.name}</span>
          <span style={{
            fontSize: 10, padding: '1px 6px', borderRadius: 10,
            background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
            fontWeight: 600,
          }}>{meta.label}</span>
          {monster.slayerReq && (
            <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: '#f0e8ff', color: '#5a2db0', border: '1px solid #b39ddb',
              fontWeight: 600,
            }}>Slayer</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: '#8B6914', marginTop: 2 }}>
          📍 {monster.location}
        </div>
        <div style={{ fontSize: 11, color: '#5a3a0e', marginTop: 1 }}>
          {monster.desc}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: '#2c1a00', fontWeight: 600 }}>
          🪙 {monster.coinsPerKill}/kill
        </div>
        <div style={{ fontSize: 10, color: '#8B6914' }}>
          +{monster.bonusAmount} a cada {monster.bonusEvery}
        </div>
      </div>
    </div>
  )
}

// ─── Active Hunt Panel ────────────────────────────────────────────────────────
function ActiveHunt({ hunt, onAddKills, onAbandon, totalCoinsEarned }) {
  const [killInput, setKillInput] = useState('')
  const monster = MONSTERS.find(m => m.id === hunt.monsterId)
  if (!monster) return null

  const meta = TIER_META[monster.tier]

  // Calcula bônus ganhos até agora
  const prevMilestones = Math.floor((hunt.kills - (hunt.lastAdded || 0)) / monster.bonusEvery)
  const totalMilestones = Math.floor(hunt.kills / monster.bonusEvery)
  const nextMilestone = (Math.floor(hunt.kills / monster.bonusEvery) + 1) * monster.bonusEvery
  const killsToNext = nextMilestone - hunt.kills

  function handleAdd() {
    const n = parseInt(killInput, 10)
    if (!n || n <= 0) return
    setKillInput('')
    onAddKills(n)
  }

  return (
    <div>
      {/* Monster header */}
      <div style={{
        ...parchment,
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 12,
        borderLeft: `4px solid ${meta.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <span style={{ fontSize: 40 }}>{monster.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00' }}>{monster.name}</span>
            <span style={{
              fontSize: 10, padding: '1px 6px', borderRadius: 10,
              background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
              fontWeight: 600,
            }}>{meta.label}</span>
          </div>
          <div style={{ fontSize: 11, color: '#8B6914', marginTop: 2 }}>📍 {monster.location}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2c1a00' }}>
            {hunt.kills.toLocaleString()}
          </div>
          <div style={{ fontSize: 10, color: '#8B6914' }}>kills totais</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: '🪙 Ganho total', value: `${totalCoinsEarned.toLocaleString()} PAM` },
          { label: '🏆 Bônus obtidos', value: `${totalMilestones}x` },
          { label: '⏭️ Próx. bônus', value: `${killsToNext} kills` },
        ].map(({ label, value }) => (
          <div key={label} style={{
            ...parchment, borderRadius: 8, padding: '8px 10px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00', marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Progress bar to next bonus */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: '#8B6914' }}>
            Progresso para +{monster.bonusAmount} 🪙
          </span>
          <span style={{ fontSize: 11, color: '#5a3a0e', fontWeight: 600 }}>
            {hunt.kills % monster.bonusEvery} / {monster.bonusEvery}
          </span>
        </div>
        <div style={{ height: 8, background: '#e8dcc0', borderRadius: 4, overflow: 'hidden', border: '1px solid #c8a96e' }}>
          <div style={{
            height: '100%',
            width: `${((hunt.kills % monster.bonusEvery) / monster.bonusEvery) * 100}%`,
            background: `linear-gradient(90deg, ${meta.border}, ${meta.color})`,
            borderRadius: 4,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Add kills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          type="number"
          min="1"
          value={killInput}
          onChange={e => setKillInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Quantas kills?"
          style={{
            flex: 1, padding: '10px 14px', fontSize: 13,
            borderRadius: 8, border: '1px solid #c8a96e',
            background: '#fffdf4', color: '#2c1a00',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: '10px 20px', fontSize: 13, borderRadius: 8,
            border: 'none', fontWeight: 600, background: '#2c1a00',
            color: '#f5ead0', fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          + Registrar
        </button>
      </div>

      {/* Quick add buttons */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {[1, 5, 10, 25, 50, 100].map(n => (
          <button
            key={n}
            onClick={() => onAddKills(n)}
            style={{
              padding: '5px 12px', fontSize: 12, borderRadius: 6,
              border: '1px solid #c8a96e', background: '#f5ead0',
              color: '#5a3a0e', fontFamily: 'inherit', cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            +{n}
          </button>
        ))}
      </div>

      {/* Abandon */}
      <button
        onClick={onAbandon}
        style={{
          width: '100%', padding: '9px', fontSize: 12,
          borderRadius: 8, border: '1px solid #c8a96e',
          background: 'transparent', color: '#8B6914',
          fontFamily: 'inherit', cursor: 'pointer',
        }}
      >
        Abandonar Hunt (não perde kills registradas)
      </button>
    </div>
  )
}

// ─── Monster Selector ─────────────────────────────────────────────────────────
function MonsterSelector({ combatLevel, onSelect }) {
  const [filter, setFilter] = useState('all')
  const [showSlayer, setShowSlayer] = useState(false)
  const [search, setSearch] = useState('')

  const available = getAvailableMonsters(combatLevel, !showSlayer)
  const filtered = available.filter(m => {
    if (filter !== 'all' && m.tier !== filter) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const grouped = {
    boss:   filtered.filter(m => m.tier === 'boss'),
    medium: filtered.filter(m => m.tier === 'medium'),
    weak:   filtered.filter(m => m.tier === 'weak'),
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: '#8B6914', marginBottom: 12, textAlign: 'center' }}>
        Escolha um monstro para huntar — você não poderá trocar depois
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {[
          { id: 'all',    label: 'Todos' },
          { id: 'boss',   label: '👹 Bosses' },
          { id: 'medium', label: '⚔️ Médios' },
          { id: 'weak',   label: '🐔 Fracos' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '5px 12px', fontSize: 11, borderRadius: 20,
              border: '1px solid',
              borderColor: filter === f.id ? '#c8a96e' : '#5a3a0e',
              background: filter === f.id ? '#c8a96e' : '#2a1a0a',
              color: filter === f.id ? '#1a0f00' : '#c8a96e',
              fontFamily: 'inherit', cursor: 'pointer', fontWeight: filter === f.id ? 600 : 400,
            }}
          >{f.label}</button>
        ))}
        <label style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, color: '#c8a96e', cursor: 'pointer', marginLeft: 'auto',
        }}>
          <input
            type="checkbox"
            checked={showSlayer}
            onChange={e => setShowSlayer(e.target.checked)}
            style={{ accentColor: '#c8a96e' }}
          />
          Mostrar Slayer
        </label>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍  Buscar monstro..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '8px 12px', fontSize: 12,
          borderRadius: 8, border: '1px solid #c8a96e',
          background: '#fffdf4', color: '#2c1a00',
          fontFamily: 'inherit', outline: 'none', marginBottom: 12,
        }}
      />

      {/* List */}
      {filtered.length === 0 ? (
        <p style={{ color: '#8B6914', fontSize: 13, textAlign: 'center', padding: '1rem' }}>
          Nenhum monstro disponível com esse filtro.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['boss', 'medium', 'weak'].map(tier => {
            const group = grouped[tier]
            if (!group.length) return null
            return (
              <div key={tier}>
                <div style={{ fontSize: 11, color: '#8B6914', fontWeight: 600,
                  margin: '4px 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {TIER_META[tier].label}s
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {group.map(m => (
                    <MonsterCard key={m.id} monster={m} onSelect={onSelect} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
function ConfirmModal({ monster, onConfirm, onCancel }) {
  const meta = TIER_META[monster.tier]
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parchment,
        borderRadius: 14, padding: '1.5rem',
        maxWidth: 380, width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: 48 }}>{monster.icon}</span>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#2c1a00', margin: '8px 0 4px' }}>
            {monster.name}
          </h2>
          <p style={{ fontSize: 12, color: '#8B6914' }}>{monster.desc}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1rem' }}>
          {[
            { label: '🪙 Coins/kill', value: monster.coinsPerKill },
            { label: '🏆 Bônus', value: `+${monster.bonusAmount} a cada ${monster.bonusEvery}` },
            { label: '📍 Local', value: monster.location },
            { label: '⚡ Tier', value: TIER_META[monster.tier].label },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: '#f5ead0', borderRadius: 6, padding: '6px 10px',
              border: '1px solid #e0c88a',
            }}>
              <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#2c1a00' }}>{value}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: '#7A1F1F', textAlign: 'center',
          background: '#FAECE7', border: '1px solid #D85A30', borderRadius: 6,
          padding: '6px 10px', marginBottom: '1rem' }}>
          ⚠️ Você não poderá trocar de monstro após confirmar
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: '1px solid #c8a96e', background: 'transparent',
            color: '#8B6914', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={() => onConfirm(monster)} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: 'none', background: '#2c1a00',
            color: '#f5ead0', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
          }}>Confirmar Hunt!</button>
        </div>
      </div>
    </div>
  )
}

// ─── Kill Feed (notifications) ────────────────────────────────────────────────
function KillFeed({ events, onDismiss }) {
  if (!events.length) return null
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 500,
      display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
      {events.map(ev => (
        <div
          key={ev.id}
          onClick={() => onDismiss(ev.id)}
          style={{
            background: ev.type === 'bonus' ? '#2c1a00' : '#1a3a10',
            border: `1px solid ${ev.type === 'bonus' ? '#c8a96e' : '#97C459'}`,
            borderRadius: 10, padding: '10px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.2s ease',
          }}
        >
          <span style={{ fontSize: 20 }}>{ev.type === 'bonus' ? '🎉' : '🪙'}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f5d78e' }}>{ev.title}</div>
            <div style={{ fontSize: 11, color: '#c8a96e' }}>{ev.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Hunt Tab ─────────────────────────────────────────────────────────────────
export default function HuntTab({ combatLevel, hunt, onHuntUpdate, pamCoins, onCoinsChange }) {
  const [pendingMonster, setPendingMonster] = useState(null)
  const [feedEvents, setFeedEvents] = useState([])

  function addFeedEvent(type, title, desc) {
    const id = Date.now() + Math.random()
    setFeedEvents(prev => [...prev, { id, type, title, desc }])
    setTimeout(() => setFeedEvents(prev => prev.filter(e => e.id !== id)), 4000)
  }

  function dismissFeed(id) {
    setFeedEvents(prev => prev.filter(e => e.id !== id))
  }

  function handleSelectMonster(monster) {
    setPendingMonster(monster)
  }

  function handleConfirmHunt(monster) {
    setPendingMonster(null)
    onHuntUpdate({
      monsterId: monster.id,
      kills: 0,
      totalCoinsEarned: 0,
      startedAt: new Date().toISOString(),
    })
  }

  function handleAddKills(n) {
    if (!hunt) return
    const monster = MONSTERS.find(m => m.id === hunt.monsterId)
    if (!monster) return

    const prevKills = hunt.kills
    const newKills = prevKills + n

    // Calcula bônus
    const prevMilestones = Math.floor(prevKills / monster.bonusEvery)
    const newMilestones  = Math.floor(newKills  / monster.bonusEvery)
    const bonusCount = newMilestones - prevMilestones
    const bonusCoins = bonusCount * monster.bonusAmount
    const baseCoins  = n * monster.coinsPerKill
    const totalNew   = baseCoins + bonusCoins

    const newHunt = {
      ...hunt,
      kills: newKills,
      totalCoinsEarned: (hunt.totalCoinsEarned || 0) + totalNew,
    }

    onHuntUpdate(newHunt)
    onCoinsChange(totalNew)

    // Feed events
    if (bonusCount > 0) {
      addFeedEvent('bonus', `🏆 Marco de ${newMilestones * monster.bonusEvery} kills!`,
        `+${monster.bonusAmount} bônus + ${baseCoins} base = ${totalNew} 🪙`)
    } else {
      addFeedEvent('coins', `+${totalNew} PAM Coins`, `${n} kills de ${monster.name}`)
    }
  }

  function handleAbandon() {
    if (!window.confirm('Abandonar o hunt atual? (as kills não somem, só ficam registradas sem monstro ativo)')) return
    onHuntUpdate(null)
  }

  return (
    <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00', margin: 0 }}>
          🎯 Hunt
        </h2>
        {!hunt && (
          <span style={{ fontSize: 11, color: '#8B6914' }}>CB {combatLevel}</span>
        )}
      </div>

      {!hunt ? (
        <MonsterSelector combatLevel={combatLevel} onSelect={handleSelectMonster} />
      ) : (
        <ActiveHunt
          hunt={hunt}
          onAddKills={handleAddKills}
          onAbandon={handleAbandon}
          totalCoinsEarned={hunt.totalCoinsEarned || 0}
        />
      )}

      {pendingMonster && (
        <ConfirmModal
          monster={pendingMonster}
          onConfirm={handleConfirmHunt}
          onCancel={() => setPendingMonster(null)}
        />
      )}

      <KillFeed events={feedEvents} onDismiss={dismissFeed} />
    </div>
  )
}