import { useState, useEffect, Fragment } from 'react'
import { MONSTERS, TIERS, BOSS_TIER, TIER_META, getBuyableMonsters, getTierCost } from '../data/monsters.js'
import { parchment } from '../constants.js'
import EquipmentSection from './EquipmentSection.jsx'

const parch = parchment

function Tag({ color, bg, border, children }) {
  return (
    <span style={{
      fontSize: 11, padding: '1px 6px', borderRadius: 10,
      background: bg, color, border: `1px solid ${border}`,
      fontWeight: 600, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

function MonsterImg({ src, name, size = 48 }) {
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

// ─── Unlock reveal modal ──────────────────────────────────────────────────────
function UnlockReveal({ monster, onClose }) {
  const meta = TIER_META[monster.tier]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // pequeno delay para a animação entrar
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parch, padding: '2rem 1.5rem',
        maxWidth: 340, width: '100%',
        boxShadow: `0 0 60px ${meta.border}55, 0 20px 60px rgba(0,0,0,0.5)`,
        border: `2px solid ${meta.border}`,
        textAlign: 'center',
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
      }}>
        <p style={{ fontSize: 11, color: meta.color, fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 14px' }}>
          MONSTRO DESBLOQUEADO
        </p>

        {/* Imagem grande */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14, filter: `drop-shadow(0 0 12px ${meta.border})` }}>
          <div style={{ width: 120, height: 120, background: 'var(--c-mid)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <MonsterImg src={monster.img} name={monster.name} size={100} />
          </div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 6px' }}>
          {monster.name}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
          <Tag {...meta}>{meta.label}</Tag>
          {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { label: '🪙 Por kill', value: `${monster.coinsPerKill}` },
            { label: 'Bônus',       value: `+${monster.bonusAmount}` },
            { label: 'A cada',      value: `${monster.bonusEvery}kc` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: 'var(--c-panel)', borderRadius: 0, padding: '8px 6px',
              border: `1px solid ${meta.border}`,
            }}>
              <div style={{ fontSize: 9, color: meta.color, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', fontFamily: 'system-ui, sans-serif' }}>{value}</div>
            </div>
          ))}
        </div>

        <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', fontSize: 12, color: 'var(--c-muted)', marginBottom: 14, textDecoration: 'underline' }}>
          Ver loot e locais na Wiki ↗
        </a>

        <button onClick={onClose} style={{
          width: '100%', padding: '12px', fontSize: 14, borderRadius: 0,
          border: '1px solid #6a4820', background: 'transparent', color: 'var(--c-muted)',
          fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
        }}>
          Fechar
        </button>
      </div>
    </div>
  )
}
function BuyModal({ tierId, monster, cost, onConfirm, onCancel }) {
  const meta = TIER_META[tierId]
  const isMystery = !monster // compra sem saber qual

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{ ...parch, padding: '1.5rem', maxWidth: 360, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          {isMystery ? (
            <div style={{
              width: 90, height: 90, borderRadius: 12, background: '#2a1a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, margin: '0 auto 10px',
              border: `2px dashed ${meta.border}`,
            }}>🔒</div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <div style={{ width: 90, height: 90, background: 'var(--c-mid)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <MonsterImg src={monster.img} name={monster.name} size={76} />
              </div>
            </div>
          )}
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px' }}>
            {isMystery ? `Monstro misterioso — ${meta.label}` : monster.name}
          </h2>
          {isMystery && (
            <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 8px' }}>
              Um monstro aleatório do tier <strong>{meta.label}</strong> será desbloqueado
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            <Tag {...meta}>{meta.label}</Tag>
            {monster?.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
          </div>
        </div>

        {monster && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[
              { label: '🪙 Coins/kill', value: monster.coinsPerKill },
              { label: '🏆 Bônus', value: `+${monster.bonusAmount} / ${monster.bonusEvery}k` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'var(--c-panel)', borderRadius: 0, padding: '6px 10px', border: '1px solid var(--c-accent)' }}>
                <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          background: 'var(--c-panel)', border: '1px solid var(--c-accent)', borderRadius: 0,
          padding: '10px', textAlign: 'center', marginBottom: 14,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>
            Custo: {cost} 🪙
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: '1px solid #6a4820', background: 'transparent',
            color: 'var(--c-muted)', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: '2px solid var(--btn-bd)', background: 'var(--btn-bg)', color: 'var(--btn-fg)',
            fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
            boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)',
          }}>Comprar!</button>
        </div>
      </div>
    </div>
  )
}

function LockedSlots({ monsters }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {monsters.map(m => (
        <div key={m.id} title={`${m.name} — requer CB ${m.minCB}`} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 56,
          opacity: 0.45,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 0,
            background: '#1a1208', border: '1px solid #3a2a0a',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2,
          }}>
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ fontSize: 9, color: 'var(--c-muted)', lineHeight: 1 }}>CB {m.minCB}</span>
          </div>
          <span title={m.name} style={{ fontSize: 11, color: 'var(--c-muted)', textAlign: 'center', lineHeight: 1.2, maxWidth: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {m.name}
          </span>
        </div>
      ))}
    </div>
  )
}

function ToggleLockedBtn({ count, expanded, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      padding: '3px 10px', fontSize: 11, borderRadius: 0,
      border: '1px solid var(--c-accent)', background: 'transparent',
      color: 'var(--c-muted)', fontFamily: 'inherit', cursor: 'pointer',
      whiteSpace: 'nowrap',
    }}>
      {expanded ? 'Ocultar' : `${count} bloqueado${count !== 1 ? 's' : ''}`}
    </button>
  )
}

// ─── Mission-locked monster card ──────────────────────────────────────────────
function MissionLockedCard({ monster }) {
  return (
    <div title={`${monster.name} — desbloqueado via missão`}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 56, opacity: 0.6 }}>
      <div style={{
        width: 56, height: 56, borderRadius: 0,
        background: '#1a1208', border: '1px solid #7a5a1e',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <span style={{ fontSize: 9, color: '#c8a96e', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1 }}>
          MISSÃO
        </span>
        <span style={{ fontSize: 8, color: 'var(--c-muted)', lineHeight: 1 }}>🔒</span>
      </div>
      <span title={monster.name} style={{
        fontSize: 11, color: 'var(--c-muted)', textAlign: 'center', lineHeight: 1.2,
        maxWidth: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {monster.name}
      </span>
    </div>
  )
}

// ─── Tier section ─────────────────────────────────────────────────────────────
function TierSection({ tier, monsters, unlockedIds, combatLevel, pamCoins, onBuy }) {
  const [showLocked, setShowLocked] = useState(false)
  const meta = TIER_META[tier.id]
  const cost = getTierCost(tier.id)
  const canAfford = pamCoins >= cost
  const tierLocked = tier.id !== 'boss' && combatLevel < tier.minCB

  // Monsters only unlockable via mission (not buyable)
  const missionLocked = monsters.filter(m => m.missionUnlock && !unlockedIds.has(m.id))
  const missionLockedIds = new Set(missionLocked.map(m => m.id))

  // Buyable (no missionUnlock, not yet owned, CB accessible)
  const available = tierLocked ? [] : monsters.filter(m =>
    !unlockedIds.has(m.id) && !missionLockedIds.has(m.id) && combatLevel >= m.minCB
  )
  const owned = monsters.filter(m => unlockedIds.has(m.id))
  const lockedByLevel = monsters.filter(m =>
    !unlockedIds.has(m.id) && !missionLockedIds.has(m.id) && combatLevel < m.minCB
  )

  // Entire non-boss tier locked: show collapsed header + optional monster list
  if (tierLocked) {
    return (
      <div style={{ padding: '10px 0 10px 14px', borderLeft: `4px solid ${meta.border}`, opacity: showLocked ? 1 : 0.55 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag {...meta}>{meta.label}</Tag>
          <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>Disponível no CB {tier.minCB}</span>
          <span style={{ fontSize: 16 }}>🔒</span>
          <div style={{ flex: 1 }} />
          <ToggleLockedBtn count={lockedByLevel.length + missionLocked.length} expanded={showLocked} onToggle={() => setShowLocked(s => !s)} />
        </div>
        {showLocked && (
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lockedByLevel.length > 0 && <LockedSlots monsters={lockedByLevel} />}
            {missionLocked.map(m => <MissionLockedCard key={m.id} monster={m} />)}
          </div>
        )}
      </div>
    )
  }

  // Accessible tier (or boss tier)
  const totalLocked = lockedByLevel.length + missionLocked.length
  const hasContent  = available.length > 0 || owned.length > 0
  return (
    <div style={{ padding: '12px 0 12px 14px', borderLeft: `4px solid ${meta.border}` }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: hasContent ? 12 : 0 }}>
        <Tag {...meta}>{meta.label}</Tag>
        <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>
          {owned.length} desbloqueado{owned.length !== 1 ? 's' : ''} · {available.length} disponíve{available.length !== 1 ? 'is' : 'l'}
        </span>
        <div style={{ flex: 1 }} />
        {totalLocked > 0 && (
          <ToggleLockedBtn count={totalLocked} expanded={showLocked} onToggle={() => setShowLocked(s => !s)} />
        )}
        {available.length > 0 && (
          <button
            onClick={() => canAfford && onBuy(tier.id)}
            disabled={!canAfford}
            style={{
              padding: '6px 14px', fontSize: 12, borderRadius: 8,
              border: 'none', fontFamily: 'inherit',
              cursor: canAfford ? 'pointer' : 'not-allowed',
              background: canAfford ? 'var(--c-text)' : '#3a2a0a',
              color: canAfford ? '#f5d78e' : 'var(--c-muted)',
              fontWeight: 600, whiteSpace: 'nowrap',
            }}
            title={canAfford ? `Comprar por ${cost} 🪙` : `Precisa de ${cost} 🪙`}
          >
            {cost} 🪙
          </button>
        )}
      </div>

      {/* Available mystery slots */}
      {available.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: owned.length ? 12 : 0 }}>
          {available.map(m => (
            <div key={m.id} style={{
              width: 56, height: 56, borderRadius: 0,
              background: 'var(--c-mid)', border: `1px dashed ${meta.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: 'rgba(148,134,109,0.5)',
            }}>?</div>
          ))}
        </div>
      )}

      {/* Owned monsters */}
      {owned.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {owned.map(m => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 56 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 0,
                border: `2px solid ${meta.border}`, background: 'var(--c-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                <MonsterImg src={m.img} name={m.name} size={42} />
              </div>
              <span title={m.name} style={{ fontSize: 11, color: '#5a3a0e', textAlign: 'center', lineHeight: 1.2, maxWidth: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Locked (CB level + mission) — all collapsed under toggle */}
      {showLocked && totalLocked > 0 && (
        <div style={{ marginTop: hasContent ? 12 : 0, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {lockedByLevel.length > 0 && <LockedSlots monsters={lockedByLevel} />}
          {missionLocked.map(m => <MissionLockedCard key={m.id} monster={m} />)}
        </div>
      )}

      {!hasContent && totalLocked === 0 && (
        <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0 }}>Nenhum monstro disponível para seu CB neste tier.</p>
      )}
    </div>
  )
}

// ─── Main ShopTab ─────────────────────────────────────────────────────────────
export default function ShopTab({ combatLevel, pamCoins, huntUnlocked, onMonsterBuy, obtainedEquipment, onEquipmentBuy }) {
  const [view, setView]         = useState('monsters') // 'monsters' | 'equipment'
  const [buyModal, setBuyModal] = useState(null)
  const [lastUnlocked, setLastUnlocked] = useState(null)

  function handleBuy(tierId) {
    const cost = getTierCost(tierId)
    if (pamCoins < cost) return
    setBuyModal({ tierId, monster: null, cost })
  }

  function handleConfirmBuy() {
    const { tierId, cost } = buyModal
    const pool = getBuyableMonsters(combatLevel, huntUnlocked).filter(m => m.tier === tierId && !m.missionUnlock)
    if (!pool.length) { setBuyModal(null); return }
    const picked = pool[Math.floor(Math.random() * pool.length)]
    const newSet = new Set([...huntUnlocked, picked.id])
    onMonsterBuy(newSet, cost)
    setLastUnlocked(picked)
    setBuyModal(null)
  }

  const allTiers = [...TIERS, BOSS_TIER]

  const subTabs = (
    <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-accent)', border: '2px solid var(--c-border)' }}>
      {[{ id: 'monsters', label: 'Monstros' }, { id: 'equipment', label: 'Equipamentos' }].map((v, i) => (
        <Fragment key={v.id}>
          {i > 0 && <span style={{ color: 'var(--c-mid)', fontSize: 16, alignSelf: 'center', userSelect: 'none', flexShrink: 0 }}>|</span>}
          <button onClick={() => setView(v.id)} style={{
            flex: 1, padding: '8px 12px', fontSize: 12, border: 'none', borderRadius: 0,
            fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
            background: view === v.id ? 'var(--c-panel)' : 'transparent',
            color: view === v.id ? 'var(--c-text)' : 'var(--c-panel)',
            fontWeight: view === v.id ? 700 : 400,
          }}>{v.label}</button>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {lastUnlocked && (
        <UnlockReveal monster={lastUnlocked} onClose={() => setLastUnlocked(null)} />
      )}

      {/* Monstros view: único card com sub-tabs + tier sections */}
      {view === 'monsters' && (
        <div style={{ ...parch, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 2px' }}>Loja</h2>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0 }}>Compre monstros aleatórios para huntar. Bosses precisam ser comprados aqui.</p>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>{subTabs}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {allTiers.map(tier => {
              const monsters = MONSTERS.filter(m => m.tier === tier.id)
              return (
                <TierSection key={tier.id} tier={tier} monsters={monsters} unlockedIds={huntUnlocked} combatLevel={combatLevel} pamCoins={pamCoins} onBuy={handleBuy} />
              )
            })}
          </div>
        </div>
      )}

      {/* Equipamentos view: single card with sub-tabs + content */}
      {view === 'equipment' && (
        <div style={{ ...parch, padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 2px' }}>Loja</h2>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0 }}>Compre equipamentos com PAM coins para registrar seu progresso.</p>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>{subTabs}</div>
          <EquipmentSection obtained={obtainedEquipment} onBuy={onEquipmentBuy} pamCoins={pamCoins} />
        </div>
      )}

      {buyModal && (
        <BuyModal
          tierId={buyModal.tierId}
          monster={buyModal.monster}
          cost={buyModal.cost}
          onConfirm={handleConfirmBuy}
          onCancel={() => setBuyModal(null)}
        />
      )}
    </div>
  )
}