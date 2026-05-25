import { useState, useEffect, Fragment } from 'react'
import { EQUIPMENT, getEquipmentCost } from '../data/equipment.js'
import { MONSTERS } from '../data/monsters.js'

const MONSTERS_MAP = new Map(MONSTERS.map(m => [m.id, m]))

const MONSTER_DROP_IDS = new Set(
  EQUIPMENT.filter(i => i.source === 'drop' && i.monsterId).map(i => i.monsterId)
)
const MONSTERS_WITH_DROPS = MONSTERS.filter(m => MONSTER_DROP_IDS.has(m.id))

const FILTERS = [
  { id: 'all',  label: 'Tudo' },
  { id: 'drop', label: 'Drops' },
  { id: 'shop', label: 'Loja' },
  { id: 'bis',  label: 'BIS' },
]

const PAGE_SIZE = 15

const CATEGORY_ICON = {
  weapon:    '⚔️',
  armour:    '🛡️',
  accessory: '💍',
  tool:      '⛏️',
  component: '🔩',
}

function ItemRow({ item, obtained, pamCoins, onBuy }) {
  const [imgErr, setImgErr] = useState(false)
  const monster = item.monsterId ? MONSTERS_MAP.get(item.monsterId) : null
  const cost = getEquipmentCost(item)
  const canAfford = pamCoins >= cost

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px',
      borderBottom: '1px solid rgba(148,134,109,0.18)',
      opacity: obtained ? 0.55 : 1,
    }}>
      <div style={{
        width: 38, height: 38, flexShrink: 0,
        background: 'var(--c-mid)', borderRadius: 0,
        border: `1px solid ${item.bis ? 'var(--c-border)' : 'var(--c-accent)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {!imgErr ? (
          <img src={item.img} alt={item.name} onError={() => setImgErr(true)}
            style={{ width: 28, height: 28, objectFit: 'contain', imageRendering: 'pixelated' }} />
        ) : (
          <span style={{ fontSize: 15 }}>{CATEGORY_ICON[item.category] ?? '📦'}</span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 13, fontWeight: 700,
            color: obtained ? 'var(--c-muted)' : 'var(--c-text)',
            textDecoration: obtained ? 'line-through' : 'none',
          }}>{item.name}</span>
          {item.bis && (
            <span style={{
              fontSize: 9, padding: '1px 5px', borderRadius: 0,
              background: 'var(--c-text)', color: '#f0c860',
              fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0,
            }}>BIS</span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'baseline' }}>
          {item.source === 'drop' && monster && (
            <span style={{ fontSize: 10, color: 'var(--c-panel)', fontWeight: 600, background: 'var(--c-accent)', padding: '1px 5px', borderRadius: 0, flexShrink: 0 }}>
              Drop: {monster.name}
            </span>
          )}
          {item.source === 'shop' && (
            <span style={{ fontSize: 10, color: 'var(--c-panel)', fontWeight: 600, background: 'var(--c-border)', padding: '1px 5px', borderRadius: 0, flexShrink: 0 }}>
              Loja: {item.shopName}
            </span>
          )}
          {item.rarity && (
            <span style={{ fontSize: 10, color: 'var(--c-muted)' }}>{item.rarity}</span>
          )}
        </div>
        {item.note && (
          <p style={{ fontSize: 10, color: '#5a3a0e', margin: '2px 0 0', lineHeight: 1.4, fontStyle: 'italic' }}>{item.note}</p>
        )}
        {item.source === 'shop' && item.shopLocation && (
          <p style={{ fontSize: 10, color: 'var(--c-muted)', margin: '1px 0 0' }}>📍 {item.shopLocation}</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', flexShrink: 0 }}>
        <a href={item.wiki} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 9, padding: '2px 5px', borderRadius: 0, border: '1px solid var(--c-accent)', color: '#5a4a38', background: 'transparent', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Wiki ↗
        </a>
        {obtained ? (
          <span style={{ fontSize: 10, padding: '3px 6px', borderRadius: 0, background: 'var(--c-accent)', color: 'var(--c-panel)', fontWeight: 600, whiteSpace: 'nowrap' }}>Obtido</span>
        ) : (
          <button
            onClick={() => canAfford && onBuy(item.id, cost)}
            disabled={!canAfford}
            title={!canAfford ? `Precisa de ${cost} 🪙` : `Comprar por ${cost} 🪙`}
            style={{
              padding: '3px 8px', fontSize: 11, borderRadius: 0,
              border: canAfford ? '2px solid var(--btn-bd)' : '1px solid var(--c-accent)',
              background: canAfford ? 'var(--btn-bg)' : 'transparent',
              color: canAfford ? 'var(--btn-fg)' : 'var(--c-muted)',
              fontFamily: 'inherit', cursor: canAfford ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap', fontWeight: canAfford ? 600 : 400,
            }}
          >{cost} 🪙</button>
        )}
      </div>
    </div>
  )
}

export default function EquipmentSection({ obtained, onBuy, pamCoins }) {
  const [filter, setFilter]             = useState('all')
  const [monsterFilter, setMonsterFilter] = useState('all')
  const [hideObtained, setHideObtained] = useState(false)
  const [search, setSearch]             = useState('')
  const [page, setPage]                 = useState(1)

  useEffect(() => { setPage(1) }, [filter, search, hideObtained, monsterFilter])

  const filtered = EQUIPMENT
    .filter(item => {
      if (filter === 'bis') return item.bis
      if (hideObtained && obtained.has(item.id)) return false
      if (filter === 'drop') return item.source === 'drop'
      if (filter === 'shop') return item.source === 'shop'
      return true
    })
    .filter(item => {
      if (filter === 'shop') return true
      return monsterFilter === 'all' || item.monsterId === monsterFilter
    })
    .filter(item => !search || item.name.toLowerCase().includes(search.toLowerCase()))

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const pageItems  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const obtainedCount = obtained.size
  const pct = Math.round((obtainedCount / EQUIPMENT.length) * 100)

  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>Progresso</span>
          <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>{obtainedCount} / {EQUIPMENT.length} — {pct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--c-mid)', border: '1px solid var(--c-accent)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--c-accent), var(--c-border))', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-accent)', border: '2px solid var(--c-border)' }}>
          {FILTERS.map((f, i) => (
            <Fragment key={f.id}>
              {i > 0 && <span style={{ color: 'var(--c-mid)', fontSize: 14, alignSelf: 'center', userSelect: 'none', flexShrink: 0 }}>|</span>}
              <button onClick={() => setFilter(f.id)} style={{
                padding: '5px 10px', fontSize: 11, border: 'none', borderRadius: 0,
                fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
                background: filter === f.id ? 'var(--c-panel)' : 'transparent',
                color: filter === f.id ? 'var(--c-text)' : 'var(--c-panel)',
                fontWeight: filter === f.id ? 700 : 400,
              }}>{f.label}</button>
            </Fragment>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--c-text)', cursor: 'pointer', flexShrink: 0, marginLeft: 'auto' }}>
          <input type="checkbox" checked={hideObtained} onChange={e => setHideObtained(e.target.checked)}
            style={{ accentColor: 'var(--c-accent)' }} />
          Ocultar obtidos
        </label>
      </div>

      {/* Monster filter */}
      {filter !== 'shop' && (
        <select
          value={monsterFilter}
          onChange={e => setMonsterFilter(e.target.value)}
          style={{
            width: '100%', padding: '7px 10px', fontSize: 12, marginBottom: 8,
            borderRadius: 0, border: '1px solid var(--c-accent)',
            background: 'var(--c-hi)', color: monsterFilter !== 'all' ? 'var(--c-text)' : 'var(--c-muted)',
            fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', cursor: 'pointer',
          }}
        >
          <option value="all">🐉 Todos os monstros</option>
          {MONSTERS_WITH_DROPS.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="🔍  Buscar item..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '7px 12px', fontSize: 12, marginBottom: 10,
          borderRadius: 0, border: '1px solid var(--c-accent)',
          background: 'var(--c-hi)', color: 'var(--c-text)', fontFamily: 'inherit', outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Item list */}
      <div style={{ border: '1px solid var(--c-accent)', overflow: 'hidden', marginBottom: 10 }}>
        {pageItems.length === 0 ? (
          <p style={{ padding: '1.25rem', color: 'var(--c-muted)', fontSize: 13, textAlign: 'center', margin: 0 }}>
            Nenhum item encontrado.
          </p>
        ) : pageItems.map(item => (
          <ItemRow key={item.id} item={item} obtained={obtained.has(item.id)} pamCoins={pamCoins} onBuy={onBuy} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage <= 1}
            style={{ padding: '4px 10px', fontSize: 12, borderRadius: 0, border: '1px solid var(--c-accent)', background: 'transparent', color: safePage <= 1 ? 'var(--c-muted)' : 'var(--c-text)', cursor: safePage <= 1 ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ padding: '4px 10px', fontSize: 12, borderRadius: 0, border: '1px solid var(--c-accent)', fontFamily: 'inherit', cursor: 'pointer', background: safePage === p ? 'var(--c-border)' : 'transparent', color: safePage === p ? 'var(--c-panel)' : 'var(--c-text)', fontWeight: safePage === p ? 700 : 400 }}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
            style={{ padding: '4px 10px', fontSize: 12, borderRadius: 0, border: '1px solid var(--c-accent)', background: 'transparent', color: safePage >= totalPages ? 'var(--c-muted)' : 'var(--c-text)', cursor: safePage >= totalPages ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
            →
          </button>
        </div>
      )}
    </div>
  )
}
