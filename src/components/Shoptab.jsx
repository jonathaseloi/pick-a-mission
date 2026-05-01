import { useState, useEffect } from 'react'
import { MONSTERS, TIERS, BOSS_TIER, TIER_META, getBuyableMonsters, getTierCost } from '../data/monsters.js'
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
        ...parch, borderRadius: 16, padding: '2rem 1.5rem',
        maxWidth: 340, width: '100%',
        boxShadow: `0 0 60px ${meta.border}55, 0 20px 60px rgba(0,0,0,0.5)`,
        border: `2px solid ${meta.border}`,
        textAlign: 'center',
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Brilho no topo */}
        <div style={{
          fontSize: 26, marginBottom: 6,
          filter: 'drop-shadow(0 0 8px gold)',
        }}>✨</div>

        <p style={{ fontSize: 11, color: meta.color, fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 14px' }}>
          MONSTRO DESBLOQUEADO
        </p>

        {/* Imagem grande */}
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: 14,
          filter: `drop-shadow(0 0 12px ${meta.border})`,
        }}>
          <MonsterImg src={monster.img} name={monster.name} size={120} />
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#2c1a00', margin: '0 0 6px' }}>
          {monster.name}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
          <Tag {...meta}>{meta.label}</Tag>
          {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { label: '🪙 Por kill',  value: `${monster.coinsPerKill}` },
            { label: '🏆 Bônus',     value: `+${monster.bonusAmount}` },
            { label: '⏱️ A cada',    value: `${monster.bonusEvery}k` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: meta.bg, borderRadius: 8, padding: '8px 6px',
              border: `1px solid ${meta.border}`,
            }}>
              <div style={{ fontSize: 9, color: meta.color, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00', fontFamily: 'system-ui, sans-serif' }}>{value}</div>
            </div>
          ))}
        </div>

        <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', fontSize: 12, color: '#8B6914', marginBottom: 14, textDecoration: 'underline' }}>
          Ver loot e locais na Wiki ↗
        </a>

        <button onClick={onClose} style={{
          width: '100%', padding: '12px', fontSize: 14, borderRadius: 10,
          border: 'none', background: '#2c1a00', color: '#f5d78e',
          fontFamily: 'inherit', cursor: 'pointer', fontWeight: 700,
          letterSpacing: '0.03em',
        }}>
          Ir Huntar! 🎯
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
      <div style={{ ...parch, borderRadius: 14, padding: '1.5rem', maxWidth: 360, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          {isMystery ? (
            <div style={{
              width: 90, height: 90, borderRadius: 12, background: '#2a1a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, margin: '0 auto 10px',
              border: `2px dashed ${meta.border}`,
            }}>🎲</div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <MonsterImg src={monster.img} name={monster.name} size={90} />
            </div>
          )}
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00', margin: '0 0 4px' }}>
            {isMystery ? `Monstro misterioso — ${meta.label}` : monster.name}
          </h2>
          {isMystery && (
            <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 8px' }}>
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
              <div key={label} style={{ background: '#f5ead0', borderRadius: 6, padding: '6px 10px', border: '1px solid #e0c88a' }}>
                <div style={{ fontSize: 10, color: '#8B6914' }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2c1a00' }}>{value}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          background: '#f5ead0', border: '1px solid #c8a96e', borderRadius: 8,
          padding: '10px', textAlign: 'center', marginBottom: 14,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#2c1a00' }}>
            Custo: {cost} 🪙
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: '1px solid #c8a96e', background: 'transparent',
            color: '#8B6914', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: 'none', background: '#2c1a00', color: '#f5ead0',
            fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
          }}>Comprar!</button>
        </div>
      </div>
    </div>
  )
}

// ─── Tier section ─────────────────────────────────────────────────────────────
function TierSection({ tier, monsters, unlockedIds, combatLevel, pamCoins, onBuy }) {
  const meta = TIER_META[tier.id]
  const cost = getTierCost(tier.id)
  const canAfford = pamCoins >= cost
  const available = monsters.filter(m => !unlockedIds.has(m.id) && combatLevel >= m.minCB)
  const owned = monsters.filter(m => unlockedIds.has(m.id))

  if (combatLevel < tier.minCB && tier.id !== 'boss') {
    return (
      <div style={{ ...parch, borderRadius: 10, padding: '12px 14px', opacity: 0.5, borderLeft: `4px solid ${meta.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag {...meta}>{meta.label}</Tag>
          <span style={{ fontSize: 12, color: '#8B6914' }}>Disponível no CB {tier.minCB}</span>
          <span style={{ marginLeft: 'auto', fontSize: 18 }}>🔒</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ ...parch, borderRadius: 10, padding: '14px', borderLeft: `4px solid ${meta.border}` }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Tag {...meta}>{meta.label}</Tag>
        <span style={{ fontSize: 11, color: '#8B6914' }}>
          {owned.length} desbloqueado{owned.length !== 1 ? 's' : ''} · {available.length} disponíve{available.length !== 1 ? 'is' : 'l'}
        </span>
        {available.length > 0 && (
          <button
            onClick={() => canAfford && onBuy(tier.id)}
            disabled={!canAfford}
            style={{
              marginLeft: 'auto', padding: '6px 14px', fontSize: 12, borderRadius: 8,
              border: 'none', fontFamily: 'inherit',
              cursor: canAfford ? 'pointer' : 'not-allowed',
              background: canAfford ? '#2c1a00' : '#3a2a0a',
              color: canAfford ? '#f5d78e' : '#8B6914',
              fontWeight: 600, whiteSpace: 'nowrap',
            }}
            title={canAfford ? `Comprar monstro aleatório por ${cost} 🪙` : `Precisa de ${cost} 🪙`}
          >
            🎲 {cost} 🪙
          </button>
        )}
      </div>

      {/* Available mystery slots */}
      {available.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: owned.length ? 12 : 0 }}>
          {available.map(m => (
            <div key={m.id} style={{
              width: 56, height: 56, borderRadius: 8,
              background: '#2a1a0a',
              border: `1px dashed ${meta.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, color: '#c8a96e33',
              title: 'Monstro bloqueado',
            }}>🔒</div>
          ))}
        </div>
      )}

      {/* Owned monsters */}
      {owned.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {owned.map(m => (
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 56 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 8,
                border: `2px solid ${meta.border}`,
                background: '#1e1005',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <MonsterImg src={m.img} name={m.name} size={48} />
              </div>
              <span style={{ fontSize: 9, color: '#5a3a0e', textAlign: 'center', lineHeight: 1.2, maxWidth: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {m.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {available.length === 0 && owned.length === 0 && (
        <p style={{ fontSize: 12, color: '#8B6914', margin: 0 }}>Nenhum monstro disponível para seu CB neste tier.</p>
      )}
    </div>
  )
}

// ─── Main ShopTab ─────────────────────────────────────────────────────────────
export default function ShopTab({ combatLevel, pamCoins, huntUnlocked, onHuntUnlockedChange, onCoinsChange }) {
  const [buyModal, setBuyModal] = useState(null) // { tierId, monster|null }
  const [lastUnlocked, setLastUnlocked] = useState(null)

  function handleBuy(tierId) {
    const cost = getTierCost(tierId)
    if (pamCoins < cost) return
    // Show mystery modal first
    setBuyModal({ tierId, monster: null, cost })
  }

  function handleConfirmBuy() {
    const { tierId, cost } = buyModal
    const pool = getBuyableMonsters(combatLevel, huntUnlocked).filter(m => m.tier === tierId)
    if (!pool.length) { setBuyModal(null); return }
    const picked = pool[Math.floor(Math.random() * pool.length)]
    const newSet = new Set([...huntUnlocked, picked.id])
    onHuntUnlockedChange(newSet)
    onCoinsChange(-cost)
    setLastUnlocked(picked)
    setBuyModal(null)
  }

  const allTiers = [...TIERS, BOSS_TIER]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Header */}
      <div style={{ ...parch, borderRadius: 12, padding: '1rem 1.25rem' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00', margin: '0 0 4px' }}>🏪 Loja</h2>
        <p style={{ fontSize: 12, color: '#8B6914', margin: 0 }}>
          Compre monstros aleatórios para huntar. Bosses precisam ser comprados aqui.
        </p>
      </div>

      {/* Unlock reveal */}
      {lastUnlocked && (
        <UnlockReveal monster={lastUnlocked} onClose={() => setLastUnlocked(null)} />
      )}

      {/* Tier sections */}
      {allTiers.map(tier => {
        const monsters = MONSTERS.filter(m => m.tier === tier.id)
        return (
          <TierSection
            key={tier.id}
            tier={tier}
            monsters={monsters}
            unlockedIds={huntUnlocked}
            combatLevel={combatLevel}
            pamCoins={pamCoins}
            onBuy={handleBuy}
          />
        )
      })}

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