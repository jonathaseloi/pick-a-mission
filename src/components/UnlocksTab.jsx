import { useState } from 'react'
import { UNLOCKS } from '../data/unlocks.js'
import { getBIS, getIdealBIS } from '../data/bis.js'
import { EQUIPMENT, getEquipmentCost } from '../data/equipment.js'
import { MONSTERS } from '../data/monsters.js'
import { Button, Card, TabGroup } from './ui/index.js'

const EQUIPMENT_MAP = new Map(EQUIPMENT.map(e => [e.id, e]))
const MONSTERS_MAP_BIS = new Map(MONSTERS.map(m => [m.id, m]))

const ALL_SKILLS = [
  { name: 'Attack',       img: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
  { name: 'Hitpoints',    img: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png' },
  { name: 'Mining',       img: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
  { name: 'Strength',     img: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
  { name: 'Agility',      img: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
  { name: 'Smithing',     img: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
  { name: 'Defence',      img: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
  { name: 'Herblore',     img: 'https://oldschool.runescape.wiki/images/Herblore_icon.png' },
  { name: 'Fishing',      img: 'https://oldschool.runescape.wiki/images/Fishing_icon.png' },
  { name: 'Ranged',       img: 'https://oldschool.runescape.wiki/images/Ranged_icon.png' },
  { name: 'Thieving',     img: 'https://oldschool.runescape.wiki/images/Thieving_icon.png' },
  { name: 'Cooking',      img: 'https://oldschool.runescape.wiki/images/Cooking_icon.png' },
  { name: 'Prayer',       img: 'https://oldschool.runescape.wiki/images/Prayer_icon.png' },
  { name: 'Crafting',     img: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
  { name: 'Firemaking',   img: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png' },
  { name: 'Magic',        img: 'https://oldschool.runescape.wiki/images/Magic_icon.png' },
  { name: 'Fletching',    img: 'https://oldschool.runescape.wiki/images/Fletching_icon.png' },
  { name: 'Woodcutting',  img: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png' },
  { name: 'Runecraft',    img: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png' },
  { name: 'Slayer',       img: 'https://oldschool.runescape.wiki/images/Slayer_icon.png' },
  { name: 'Farming',      img: 'https://oldschool.runescape.wiki/images/Farming_icon.png' },
  { name: 'Construction', img: 'https://oldschool.runescape.wiki/images/Construction_icon.png' },
  { name: 'Hunter',       img: 'https://oldschool.runescape.wiki/images/Hunter_icon.png' },
  { name: 'Sailing',      img: 'https://oldschool.runescape.wiki/images/Sailing_icon.png' },
]

const EQ_SLOTS = ['head','cape','neck','ammo','weapon','body','shield','legs','hands','feet','ring']
const SLOT_LABELS = {
  head:'Capacete', cape:'Capa', neck:'Amuleto', ammo:'Munição',
  weapon:'Arma', body:'Peitoral', shield:'Escudo', legs:'Calças',
  hands:'Luvas', feet:'Botas', ring:'Anel',
}
const SLOT_POS = {
  head:   { col: 2, row: 1 },
  cape:   { col: 1, row: 2 },
  neck:   { col: 2, row: 2 },
  ammo:   { col: 3, row: 2 },
  weapon: { col: 1, row: 3 },
  body:   { col: 2, row: 3 },
  shield: { col: 3, row: 3 },
  legs:   { col: 2, row: 4 },
  hands:  { col: 1, row: 5 },
  feet:   { col: 2, row: 5 },
  ring:   { col: 3, row: 5 },
}

// ── Skills sub-tab ─────────────────────────────────────────────────────────
function SkillsTab({ realLevels, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false)
  const [refreshOk,  setRefreshOk]  = useState(null)

  async function handleRefresh() {
    setRefreshing(true)
    setRefreshOk(null)
    const ok = await onRefresh()
    setRefreshOk(ok)
    setRefreshing(false)
    if (ok) setTimeout(() => setRefreshOk(null), 2000)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: '#5a3e1b', margin: 0, letterSpacing: '0.06em' }}>SKILLS</p>
        <Button onClick={handleRefresh} disabled={refreshing}
          style={{ padding: '4px 10px', fontSize: 11,
            background: refreshOk === false ? '#2a0a00' : undefined,
            color: refreshOk === false ? '#ff6040' : undefined }}>
          {refreshing ? 'Atualizando...' : refreshOk === true ? 'Atualizado!' : refreshOk === false ? 'Erro' : 'Atualizar níveis'}
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {ALL_SKILLS.map(sk => {
          const real    = realLevels?.[sk.name]
          const hasReal = real != null && real > 0
          return (
            <div key={sk.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 8,
              border: '1px solid var(--c-accent)',
              background: 'var(--c-mid)',
              opacity: hasReal ? 1 : 0.4,
            }}>
              <img src={sk.img} alt={sk.name}
                style={{ width: 20, height: 20, objectFit: 'contain', imageRendering: 'pixelated',
                  filter: hasReal ? 'none' : 'grayscale(1)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, color: '#5a3e1b', margin: 0, lineHeight: 1 }}>{sk.name}</p>
                <p style={{
                  fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3,
                  fontFamily: 'system-ui, sans-serif',
                  color: hasReal ? 'var(--c-text)' : '#5a3a0e',
                }}>
                  {hasReal ? real : '—'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── Equipment sub-tab ──────────────────────────────────────────────────────
function EquipmentTab({ unlocked, obtainedEquipment, realLevels }) {
  const [style, setStyle] = useState('melee')
  const [ammoFilter, setAmmoFilter] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [checkBIS, setCheckBIS] = useState(false)

  const currentBIS = getBIS(style, unlocked, obtainedEquipment, realLevels, ammoFilter)
  const idealBIS   = getIdealBIS(style, realLevels, ammoFilter)
  const displayBIS = checkBIS ? idealBIS : currentBIS

  const hasLevels = Object.keys(realLevels ?? {}).length > 0

  function isOwned(item) {
    if (!item) return false
    const equipId   = item._equipmentId
    const unlockRef = item._unlockRef ?? item.unlockKey
    if (equipId   && obtainedEquipment.has(equipId))  return true
    if (unlockRef && unlocked.has(unlockRef))          return true
    return false
  }

  const styleColors = {
    melee:  'var(--c-accent)',
    ranged: '#7acc6e',
    mage:   '#6ea8cc',
  }

  return (
    <>
      {/* Style selector + Check BIS toggle on the same row */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, marginBottom: style === 'ranged' ? 8 : '1.25rem' }}>
        <TabGroup style={{ flex: 1 }}
          tabs={[{ id: 'melee', label: 'Melee' }, { id: 'ranged', label: 'Ranged' }, { id: 'mage', label: 'Mage' }]}
          active={style}
          onChange={s => { setStyle(s); setAmmoFilter(null) }}
        />
        <Button onClick={() => setCheckBIS(b => !b)}
          style={{ padding: '6px 10px', fontSize: 10, whiteSpace: 'nowrap',
            background: checkBIS ? '#1a3a10' : undefined,
            color: checkBIS ? '#90d060' : undefined,
            fontWeight: checkBIS ? 700 : 400 }}>
          {checkBIS ? '✓ BIS Check' : 'Check BIS'}
        </Button>
      </div>

      {/* Ammo type filter — only for ranged */}
      {style === 'ranged' && (
        <TabGroup size="sm"
          tabs={[
            { id: null,    label: 'Todos' },
            { id: 'arrow', label: 'Arrows' },
            { id: 'bolt',  label: 'Bolts' },
            { id: 'dart',  label: 'Darts' },
          ]}
          active={ammoFilter}
          onChange={setAmmoFilter}
          style={{ borderTop: 'none', marginBottom: '1.25rem' }}
        />
      )}

      {/* Warning when no level data in check BIS mode */}
      {checkBIS && !hasLevels && (
        <p style={{ fontSize: 11, color: '#7a5000', fontFamily: 'system-ui', fontStyle: 'italic',
          marginBottom: 12, textAlign: 'center' }}>
          Sincronize seus níveis para uma análise completa.
        </p>
      )}

      {/* Legend for check BIS mode */}
      {checkBIS && (
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, color: '#7ddc4f', fontFamily: 'system-ui' }}>✓ Já possui</span>
          <span style={{ fontSize: 10, color: 'var(--c-muted)', fontFamily: 'system-ui' }}>🔒 Ainda não possui</span>
        </div>
      )}

      {/* Equipment grid */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 56px)',
          gridTemplateRows: 'repeat(5, 56px)',
          gap: 6,
          position: 'relative',
        }}>
          {EQ_SLOTS.map(slot => {
            const pos  = SLOT_POS[slot]
            const item = displayBIS[slot]
            const owned = !checkBIS || isOwned(item)
            const isTooltipVisible = tooltip === slot

            const borderColor = item
              ? (checkBIS
                  ? (owned ? styleColors[style] : '#5a3a10')
                  : styleColors[style])
              : '#3a2a0a'

            return (
              <div key={slot}
                onMouseEnter={() => item && setTooltip(slot)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  gridColumn: pos.col,
                  gridRow: pos.row,
                  width: 56, height: 56,
                  border: `2px solid ${borderColor}`,
                  borderRadius: 8,
                  background: 'var(--c-mid)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: item ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'border-color 0.15s',
                }}>

                {item ? (
                  <img src={item.image} alt={item.name}
                    style={{
                      width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated',
                      filter: checkBIS && !owned ? 'grayscale(0.6) brightness(0.8)' : 'none',
                    }} />
                ) : (
                  <span style={{ fontSize: 9, color: 'var(--c-text)', textAlign: 'center', lineHeight: 1.3,
                    fontFamily: 'system-ui, sans-serif' }}>
                    {SLOT_LABELS[slot]}
                  </span>
                )}

                {/* Lock overlay — item ideal mas não obtido */}
                {checkBIS && item && !owned && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 8,
                    background: 'rgba(15,5,0,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, pointerEvents: 'none',
                  }}>🔒</div>
                )}

                {/* Checkmark badge — item ideal já possuído */}
                {checkBIS && item && owned && (
                  <div style={{
                    position: 'absolute', top: 2, right: 2,
                    fontSize: 8, background: '#1a4a0a', color: '#7ddc4f',
                    borderRadius: '50%', width: 13, height: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'system-ui', fontWeight: 700, pointerEvents: 'none',
                  }}>✓</div>
                )}

                {isTooltipVisible && item && (() => {
                  const equipData = item._equipmentId
                    ? EQUIPMENT_MAP.get(item._equipmentId)
                    : EQUIPMENT_MAP.get(item.unlockKey) ?? EQUIPMENT_MAP.get(item._unlockRef)
                  const tooltipMonster = equipData?.monsterId ? MONSTERS_MAP_BIS.get(equipData.monsterId) : null
                  const tooltipSource = tooltipMonster
                    ? `Drop: ${tooltipMonster.name}`
                    : equipData?.source === 'shop' ? 'Loja PAM' : null
                  const tooltipCost = equipData ? getEquipmentCost(equipData) : null
                  const tooltipRarity = equipData?.rarity ?? null
                  return (
                    <div style={{
                      position: 'absolute',
                      bottom: 62, left: '50%', transform: 'translateX(-50%)',
                      background: '#2a1a0a', border: '1px solid var(--c-accent)',
                      color: '#f5d78e', fontSize: 10, minWidth: 140,
                      padding: '6px 8px', borderRadius: 4, zIndex: 20,
                      fontFamily: 'system-ui, sans-serif', pointerEvents: 'none',
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
                      {checkBIS && (
                        <div style={{ marginBottom: 4, color: owned ? '#7ddc4f' : '#e08040' }}>
                          {owned ? '✓ Já possui' : '🔒 Não possui ainda'}
                        </div>
                      )}
                      {tooltipSource && <div style={{ color: 'var(--c-muted)', marginBottom: 2 }}>{tooltipSource}</div>}
                      {tooltipRarity && <div style={{ color: 'var(--c-muted)', marginBottom: 2 }}>{tooltipRarity}</div>}
                      {tooltipCost && <div>{tooltipCost} 🪙</div>}
                      <div style={{
                        position: 'absolute', top: '100%', left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid var(--c-accent)',
                      }} />
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>

      {Object.values(displayBIS).every(v => v === null) && (
        <p style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: 12,
          marginTop: '1rem', fontStyle: 'italic' }}>
          {checkBIS
            ? 'Nenhum item encontrado para este estilo com seus níveis atuais.'
            : 'Nenhum equipamento desbloqueado para este estilo ainda.'}
        </p>
      )}
    </>
  )
}

// ── Others sub-tab ─────────────────────────────────────────────────────────
function OthersTab({ unlocked }) {
  const cats = ['activity', 'boss', 'food', 'potion', 'other']
  const catLabels = {
    activity: 'Atividades', boss: 'Bosses', food: 'Comida',
    potion: 'Poções', other: 'Outros',
  }

  const grouped = {}
  for (const cat of cats) {
    grouped[cat] = Object.entries(UNLOCKS)
      .filter(([id, u]) => u.category === cat && unlocked.has(id))
  }

  const hasAny = cats.some(c => grouped[c].length > 0)

  if (!hasAny)
    return <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Nenhum desbloqueio nessa categoria ainda.</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {cats.map(cat => {
        if (!grouped[cat].length) return null
        return (
          <div key={cat}>
            <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 8px', letterSpacing: '0.06em' }}>
              {catLabels[cat].toUpperCase()} ({grouped[cat].length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {grouped[cat].map(([id, u]) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 10px', borderRadius: 8,
                  border: '1px solid var(--c-accent)', background: 'var(--c-mid)' }}>
                  <span style={{ fontSize: 14 }}>{u.icon}</span>
                  <span style={{ fontSize: 12, color: '#f5d78e', fontFamily: 'system-ui, sans-serif' }}>
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── General sub-tab ────────────────────────────────────────────────────────
function GeneralTab({ unlocked }) {
  const items = [...unlocked].map(id => ({ id, ...UNLOCKS[id] })).filter(u => u.label)

  if (!items.length)
    return <p style={{ color: 'var(--c-muted)', fontSize: 13 }}>Nenhum desbloqueio ainda.</p>

  return (
    <>
      <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 10px', letterSpacing: '0.06em' }}>
        TODOS OS DESBLOQUEIOS ({items.length})
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map(u => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 10px', borderRadius: 8,
            border: '1px solid var(--c-accent)', background: 'var(--c-mid)' }}>
            <span style={{ fontSize: 13 }}>{u.icon}</span>
            <span style={{ fontSize: 12, color: '#5a3e1b', fontFamily: 'system-ui, sans-serif' }}>
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function UnlocksTab({ unlocked, realLevels, onRefresh, obtainedEquipment }) {
  const [sub, setSub] = useState('skills')

  const SUB_TABS = [
    { id: 'skills',    label: 'Skills' },
    { id: 'equipment', label: 'Equipamentos' },
    { id: 'others',    label: 'Outros' },
    { id: 'general',   label: 'Geral' },
  ]

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <TabGroup tabs={SUB_TABS} active={sub} onChange={setSub} size="sm"
        style={{ border: 'none', borderBottom: '2px solid var(--c-border)' }} />

      {/* Content area */}
      <div style={{ padding: '1.25rem' }}>
        {sub === 'skills'    && <SkillsTab    realLevels={realLevels} onRefresh={onRefresh} />}
        {sub === 'equipment' && <EquipmentTab unlocked={unlocked} obtainedEquipment={obtainedEquipment} realLevels={realLevels} />}
        {sub === 'others'    && <OthersTab    unlocked={unlocked} />}
        {sub === 'general'   && <GeneralTab   unlocked={unlocked} />}
      </div>
    </Card>
  )
}
