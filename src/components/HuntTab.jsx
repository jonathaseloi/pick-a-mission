import { useState, useEffect, useRef } from 'react'
import { MONSTERS, TIERS, BOSS_TIER, TIER_META, getActiveTiers, drawTierStarters } from '../data/monsters.js'
import { parchment } from '../constants.js'

const parch = parchment

function Tag({ color, bg, border, children }) {
  return (
    <span style={{
      fontSize: 10, padding: '1px 6px', borderRadius: 10,
      background: bg, color, border: `1px solid ${border}`,
      fontWeight: 600, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

function MonsterImg({ src, name, size = 56 }) {
  const [err, setErr] = useState(false)
  if (err) return (
    <div style={{
      width: size, height: size, borderRadius: 6, background: '#2a1a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35,
    }}>⚔️</div>
  )
  return (
    <img src={src} alt={name} onError={() => setErr(true)}
      style={{ width: size, height: size, objectFit: 'contain', imageRendering: 'pixelated', borderRadius: 4 }} />
  )
}

// ─── Monster row ──────────────────────────────────────────────────────────────
function MonsterCard({ monster, onSelect }) {
  const meta = TIER_META[monster.tier]
  return (
    <div onClick={() => onSelect(monster)}
      style={{
        ...parch, borderRadius: 10, padding: '10px 12px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 12,
        borderLeft: `4px solid ${meta.border}`, transition: 'transform 0.1s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}
    >
      <MonsterImg src={monster.img} name={monster.name} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00' }}>{monster.name}</span>
          <Tag {...meta}>{meta.label}</Tag>
          {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#8B6914' }}>
          <span>🪙 {monster.coinsPerKill}/kill</span>
          <span>+{monster.bonusAmount} a cada {monster.bonusEvery}k</span>
        </div>
      </div>
      <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          fontSize: 10, padding: '3px 8px', borderRadius: 6,
          border: '1px solid #c8a96e', color: '#8B6914',
          background: 'transparent', textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
        Wiki ↗
      </a>
    </div>
  )
}

// ─── Active hunt ──────────────────────────────────────────────────────────────
function ActiveHunt({ hunt, onAddKills, onAbandon, onFinish }) {
  const [killInput, setKillInput] = useState('')
  const monster = MONSTERS.find(m => m.id === hunt.monsterId)
  if (!monster) return null

  const meta = TIER_META[monster.tier]
  const kills = hunt.kills
  const intoMilestone = kills % monster.bonusEvery
  const totalMilestones = Math.floor(kills / monster.bonusEvery)
  const toNext = monster.bonusEvery - intoMilestone

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
        ...parch, borderRadius: 10, padding: '14px 16px', marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 14,
        borderLeft: `4px solid ${meta.border}`,
      }}>
        <MonsterImg src={monster.img} name={monster.name} size={72} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#2c1a00' }}>{monster.name}</span>
            <Tag {...meta}>{meta.label}</Tag>
            {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
          </div>
          <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#8B6914', textDecoration: 'underline' }}>
            Ver na Wiki ↗
          </a>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#2c1a00', lineHeight: 1 }}>
            {kills.toLocaleString()}
          </div>
          <div style={{ fontSize: 10, color: '#8B6914' }}>kills</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: '🪙 Total ganho', value: `${(hunt.totalCoinsEarned || 0).toLocaleString()} PAM` },
          { label: '🏆 Marcos',      value: `${totalMilestones}x` },
          { label: '⏭️ Próx. bônus', value: `${toNext} kills` },
        ].map(({ label, value }) => (
          <div key={label} style={{ ...parch, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2c1a00', marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: '#8B6914' }}>Progresso para +{monster.bonusAmount} 🪙</span>
          <span style={{ fontSize: 11, color: '#5a3a0e', fontWeight: 600 }}>{intoMilestone} / {monster.bonusEvery}</span>
        </div>
        <div style={{ height: 8, background: '#e8dcc0', borderRadius: 4, overflow: 'hidden', border: '1px solid #c8a96e' }}>
          <div style={{
            height: '100%',
            width: `${(intoMilestone / monster.bonusEvery) * 100}%`,
            background: `linear-gradient(90deg, ${meta.border}, ${meta.color})`,
            borderRadius: 4, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input type="number" min="1" value={killInput}
          onChange={e => setKillInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Quantas kills?"
          style={{
            flex: 1, padding: '10px 14px', fontSize: 13,
            borderRadius: 8, border: '1px solid #c8a96e',
            background: '#fffdf4', color: '#2c1a00', fontFamily: 'inherit', outline: 'none',
          }} />
        <button onClick={handleAdd} style={{
          padding: '10px 20px', fontSize: 13, borderRadius: 8, border: 'none',
          fontWeight: 600, background: '#2c1a00', color: '#f5ead0',
          fontFamily: 'inherit', cursor: 'pointer',
        }}>+ Registrar</button>
      </div>

      {/* Quick add */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {[1, 5, 10, 25, 50, 100].map(n => (
          <button key={n} onClick={() => onAddKills(n)} style={{
            padding: '5px 12px', fontSize: 12, borderRadius: 6,
            border: '1px solid #c8a96e', background: '#f5ead0',
            color: '#5a3a0e', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
          }}>+{n}</button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onFinish} style={{
          flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
          border: 'none', background: '#2c1a00', color: '#f5ead0',
          fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
        }}>✅ Finalizar Hunt</button>
        <button onClick={onAbandon} style={{
          padding: '10px 14px', fontSize: 12, borderRadius: 8,
          border: '1px solid #c8a96e', background: 'transparent',
          color: '#8B6914', fontFamily: 'inherit', cursor: 'pointer',
        }}>Abandonar</button>
      </div>
    </div>
  )
}

// ─── Confirm modal ────────────────────────────────────────────────────────────
function ConfirmModal({ monster, onConfirm, onCancel }) {
  const meta = TIER_META[monster.tier]
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{ ...parch, borderRadius: 14, padding: '1.5rem', maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <MonsterImg src={monster.img} name={monster.name} size={110} />
        </div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#2c1a00', margin: '0 0 4px', textAlign: 'center' }}>
          {monster.name}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
          <Tag {...meta}>{meta.label}</Tag>
          {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[
            { label: '🪙 Coins/kill', value: monster.coinsPerKill },
            { label: '🏆 Bônus', value: `+${monster.bonusAmount} / ${monster.bonusEvery}k` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#f5ead0', borderRadius: 6, padding: '6px 10px', border: '1px solid #e0c88a' }}>
              <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#2c1a00' }}>{value}</div>
            </div>
          ))}
        </div>
        <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', fontSize: 12, color: '#8B6914', marginBottom: 12 }}>
          Ver loot e locais na Wiki ↗
        </a>
        {monster.slayerReq && (
          <p style={{ fontSize: 11, color: '#5a2db0', textAlign: 'center', background: '#f0e8ff', border: '1px solid #b39ddb', borderRadius: 6, padding: '5px 10px', marginBottom: 10 }}>
            ⚠️ Requer Slayer Task ativa no jogo
          </p>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: '1px solid #c8a96e', background: 'transparent',
            color: '#8B6914', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={() => onConfirm(monster)} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: 'none', background: '#2c1a00', color: '#f5ead0',
            fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
          }}>Iniciar Hunt!</button>
        </div>
      </div>
    </div>
  )
}

// ─── Tier unlock banner ───────────────────────────────────────────────────────
function TierUnlockBanner({ tier, newMonsters, onDismiss }) {
  const meta = TIER_META[tier.id]
  return (
    <div style={{ ...parch, borderRadius: 10, padding: '14px 16px', marginBottom: 14, borderLeft: `4px solid ${meta.border}`, background: meta.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>🎉</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>Tier {meta.label} desbloqueado!</span>
      </div>
      <p style={{ fontSize: 12, color: '#5a3a0e', margin: '0 0 10px' }}>2 monstros adicionados à sua lista:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        {newMonsters.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MonsterImg src={m.img} name={m.name} size={36} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2c1a00' }}>{m.name}</span>
          </div>
        ))}
      </div>
      <button onClick={onDismiss} style={{
        padding: '6px 14px', fontSize: 12, borderRadius: 8,
        border: `1px solid ${meta.border}`, background: 'transparent',
        color: meta.color, fontFamily: 'inherit', cursor: 'pointer',
      }}>OK!</button>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function KillFeed({ events, onDismiss }) {
  if (!events.length) return null
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
      {events.map(ev => (
        <div key={ev.id} onClick={() => onDismiss(ev.id)} style={{
          background: ev.type === 'bonus' ? '#2c1a00' : '#1a3a10',
          border: `1px solid ${ev.type === 'bonus' ? '#c8a96e' : '#97C459'}`,
          borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HuntTab({ combatLevel, hunt, onHuntUpdate, onCoinsChange, huntUnlocked, onHuntUnlockedChange }) {
  const [pendingMonster, setPendingMonster] = useState(null)
  const [feedEvents, setFeedEvents]         = useState([])
  const [tierBanners, setTierBanners]       = useState([])
  const [search, setSearch]                 = useState('')
  const prevCBRef = useRef(combatLevel)

  // Detect tier unlocks on CB change (never bosses)
  useEffect(() => {
    const prevCB = prevCBRef.current
    prevCBRef.current = combatLevel

    const newBanners = []
    for (const tier of TIERS) {
      const justUnlocked = prevCB < tier.minCB && combatLevel >= tier.minCB
      const neverSeeded  = !MONSTERS.some(m => m.tier === tier.id && huntUnlocked.has(m.id))

      if (justUnlocked || (neverSeeded && combatLevel >= tier.minCB)) {
        const drawn = drawTierStarters(tier.id, combatLevel, huntUnlocked, 2)
        if (drawn.length > 0) {
          const newSet = new Set([...huntUnlocked, ...drawn])
          onHuntUnlockedChange(newSet)
          if (justUnlocked) {
            newBanners.push({ tier, monsters: drawn.map(id => MONSTERS.find(m => m.id === id)).filter(Boolean) })
          }
        }
      }
    }
    if (newBanners.length) setTierBanners(prev => [...prev, ...newBanners])
  }, [combatLevel])

  function addFeed(type, title, desc) {
    const id = Date.now() + Math.random()
    setFeedEvents(prev => [...prev, { id, type, title, desc }])
    setTimeout(() => setFeedEvents(prev => prev.filter(e => e.id !== id)), 4000)
  }

  function handleConfirmHunt(monster) {
    setPendingMonster(null)
    onHuntUpdate({ monsterId: monster.id, kills: 0, totalCoinsEarned: 0, startedAt: new Date().toISOString() })
  }

  function handleAddKills(n) {
    if (!hunt) return
    const monster = MONSTERS.find(m => m.id === hunt.monsterId)
    if (!monster) return
    const prevKills = hunt.kills
    const newKills  = prevKills + n
    const bonusCount = Math.floor(newKills / monster.bonusEvery) - Math.floor(prevKills / monster.bonusEvery)
    const earned = n * monster.coinsPerKill + bonusCount * monster.bonusAmount
    onHuntUpdate({ ...hunt, kills: newKills, totalCoinsEarned: (hunt.totalCoinsEarned || 0) + earned })
    onCoinsChange(earned)
    if (bonusCount > 0) {
      addFeed('bonus', `🏆 Marco ${Math.floor(newKills / monster.bonusEvery) * monster.bonusEvery} kills!`,
        `+${bonusCount * monster.bonusAmount} bônus + ${n * monster.coinsPerKill} base = ${earned} 🪙`)
    } else {
      addFeed('coins', `+${earned} PAM Coins`, `${n} kills de ${monster.name}`)
    }
  }

  function handleFinish() {
    onHuntUpdate(null)
    addFeed('bonus', '✅ Hunt finalizado!', `${hunt?.kills || 0} kills registradas`)
  }

  function handleAbandon() {
    if (!window.confirm('Abandonar o hunt? (coins já ganhos ficam)')) return
    onHuntUpdate(null)
  }

  // Build filtered list
  const unlockedMonsters = MONSTERS
    .filter(m => huntUnlocked.has(m.id))
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00', margin: 0 }}>🎯 Hunt</h2>
        <span style={{ fontSize: 11, color: '#8B6914' }}>CB {combatLevel} · {MONSTERS.filter(m => huntUnlocked.has(m.id)).length} monstros</span>
      </div>

      {tierBanners.map((b, i) => (
        <TierUnlockBanner key={i} tier={b.tier} newMonsters={b.monsters}
          onDismiss={() => setTierBanners(prev => prev.filter((_, j) => j !== i))} />
      ))}

      {/* Active hunt */}
      {hunt && (
        <div style={{ marginBottom: 16 }}>
          <ActiveHunt hunt={hunt} onAddKills={handleAddKills} onAbandon={handleAbandon} onFinish={handleFinish} />
        </div>
      )}

      {/* Monster selector */}
      {!hunt && (
        <>
          {/* Search */}
          <input
            type="text"
            placeholder="🔍  Buscar monstro..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px', fontSize: 12, marginBottom: 10,
              borderRadius: 8, border: '1px solid #c8a96e',
              background: '#fffdf4', color: '#2c1a00', fontFamily: 'inherit', outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          {unlockedMonsters.length === 0 ? (
            <p style={{ color: '#8B6914', fontSize: 13, textAlign: 'center', padding: '1rem' }}>
              {search ? 'Nenhum monstro encontrado.' : 'Nenhum monstro desbloqueado ainda.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 4px', letterSpacing: '0.05em' }}>
                SEUS MONSTROS — clique para iniciar
              </p>
              {unlockedMonsters.map(m => (
                <MonsterCard key={m.id} monster={m} onSelect={setPendingMonster} />
              ))}
            </div>
          )}
        </>
      )}

      {pendingMonster && (
        <ConfirmModal monster={pendingMonster} onConfirm={handleConfirmHunt} onCancel={() => setPendingMonster(null)} />
      )}

      <KillFeed events={feedEvents} onDismiss={id => setFeedEvents(prev => prev.filter(e => e.id !== id))} />
    </div>
  )
}