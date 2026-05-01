import { useState } from 'react'
import { UNLOCKS } from '../data/unlocks.js'
import { getBIS } from '../data/bis.js'

// ── Skill metadata ─────────────────────────────────────────────────────────
const ALL_SKILLS = [
  { name: 'Attack',       img: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
  { name: 'Strength',     img: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
  { name: 'Defence',      img: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
  { name: 'Ranged',       img: 'https://oldschool.runescape.wiki/images/Ranged_icon.png' },
  { name: 'Prayer',       img: 'https://oldschool.runescape.wiki/images/Prayer_icon.png' },
  { name: 'Magic',        img: 'https://oldschool.runescape.wiki/images/Magic_icon.png' },
  { name: 'Hitpoints',    img: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png' },
  { name: 'Slayer',       img: 'https://oldschool.runescape.wiki/images/Slayer_icon.png' },
  { name: 'Agility',      img: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
  { name: 'Herblore',     img: 'https://oldschool.runescape.wiki/images/Herblore_icon.png' },
  { name: 'Thieving',     img: 'https://oldschool.runescape.wiki/images/Thieving_icon.png' },
  { name: 'Crafting',     img: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
  { name: 'Fletching',    img: 'https://oldschool.runescape.wiki/images/Fletching_icon.png' },
  { name: 'Mining',       img: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
  { name: 'Smithing',     img: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
  { name: 'Fishing',      img: 'https://oldschool.runescape.wiki/images/Fishing_icon.png' },
  { name: 'Cooking',      img: 'https://oldschool.runescape.wiki/images/Cooking_icon.png' },
  { name: 'Firemaking',   img: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png' },
  { name: 'Woodcutting',  img: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png' },
  { name: 'Farming',      img: 'https://oldschool.runescape.wiki/images/Farming_icon.png' },
  { name: 'Runecraft',    img: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png' },
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

// Grid positions mirroring OSRS equipment screen
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

const parch = {
  background: 'linear-gradient(160deg,#fffdf4 0%,#f5ead0 100%)',
  border: '1px solid #c8a96e',
}

const subTabBtn = (id, active, label, onChange) => (
  <button key={id} onClick={() => onChange(id)}
    style={{
      padding: '5px 14px', fontSize: 11, borderRadius: 20, cursor: 'pointer',
      fontFamily: 'inherit', border: '1px solid',
      borderColor: active === id ? '#c8a96e' : '#5a3a0e',
      background:  active === id ? '#c8a96e' : '#2a1a0a',
      color:       active === id ? '#1a0f00' : '#c8a96e',
      fontWeight:  active === id ? 600 : 400,
    }}>{label}</button>
)

// ── Skills sub-tab ─────────────────────────────────────────────────────────
function SkillsTab({ unlocked, realLevels }) {
  const unlockedCaps = {}
  for (const [id, u] of Object.entries(UNLOCKS)) {
    if (u.category === 'skill' && unlocked.has(id)) {
      const cur = unlockedCaps[u.skill] ?? 0
      if (u.level > cur) unlockedCaps[u.skill] = u.level
    }
  }

  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      <p style={{ fontSize: 11, color: '#5a3e1b', margin: '0 0 4px', letterSpacing: '0.06em' }}>
        SKILLS DESBLOQUEADAS
      </p>
      <p style={{ fontSize: 10, color: '#8B6914', margin: '0 0 14px', fontStyle: 'italic' }}>
        Vermelho = você passou do nível liberado
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {ALL_SKILLS.map(sk => {
          const cap     = unlockedCaps[sk.name] ?? 1
          const real    = realLevels?.[sk.name]
          const hasReal = real != null && real > 0
          const hasCap  = true
          const overCap = hasCap && hasReal && real > cap

          return (
            <div key={sk.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 8,
              border: `1px solid ${overCap ? '#D85A30' : hasReal ? '#c8a96e' : '#c8a96e66'}`,
              background: overCap ? '#FAECE7' : hasReal ? '#fffdf4' : '#f5ead0',
              opacity: hasReal ? 1 : 0.4,
            }}>
              <img src={sk.img} alt={sk.name}
                style={{ width: 20, height: 20, objectFit: 'contain', imageRendering: 'pixelated',
                  filter: hasReal ? 'none' : 'grayscale(1)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 9, color: '#5a3e1b', margin: 0, lineHeight: 1 }}>{sk.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3,
                    fontFamily: 'system-ui, sans-serif',
                    color: overCap ? '#D85A30' : hasReal ? '#2c1a00' : '#5a3a0e',
                  }}>
                    {hasReal ? real : '—'}
                  </p>
                  {hasCap && (
                    <p style={{ fontSize: 9, color: '#8B6914', margin: 0,
                      fontFamily: 'system-ui, sans-serif' }}>
                      /{cap}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Equipment sub-tab ──────────────────────────────────────────────────────
function EquipmentTab({ unlocked }) {
  const [style, setStyle] = useState('melee')
  const [tooltip, setTooltip] = useState(null)
  const bis = getBIS(style, unlocked)

  const styleColors = {
    melee:  '#c8a96e',
    ranged: '#7acc6e',
    mage:   '#6ea8cc',
  }

  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      {/* Style selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', justifyContent: 'center' }}>
        {['melee','ranged','mage'].map(s => (
          <button key={s} onClick={() => setStyle(s)}
            style={{
              padding: '5px 18px', fontSize: 12, borderRadius: 20, cursor: 'pointer',
              fontFamily: 'inherit', border: '1px solid',
              borderColor: style === s ? styleColors[s] : '#5a3a0e',
              background:  style === s ? styleColors[s] + '33' : '#2a1a0a',
              color:       style === s ? styleColors[s] : '#c8a96e',
              fontWeight:  style === s ? 600 : 400,
              textTransform: 'capitalize',
            }}>{s}</button>
        ))}
      </div>

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
            const pos = SLOT_POS[slot]
            const item = bis[slot]
            const isTooltipVisible = tooltip === slot

            return (
              <div key={slot}
                onMouseEnter={() => item && setTooltip(slot)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  gridColumn: pos.col,
                  gridRow: pos.row,
                  width: 56, height: 56,
                  border: `2px solid ${item ? styleColors[style] : '#3a2a0a'}`,
                  borderRadius: 8,
                  background: item ? '#1e1005' : '#e8d5a3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: item ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'border-color 0.15s',
                }}>

                {item ? (
                  <img src={item.image} alt={item.name}
                    style={{ width: 40, height: 40, objectFit: 'contain', imageRendering: 'pixelated' }} />
                ) : (
                  <span style={{ fontSize: 9, color: '#2c1a00', textAlign: 'center', lineHeight: 1.3,
                    fontFamily: 'system-ui, sans-serif' }}>
                    {SLOT_LABELS[slot]}
                  </span>
                )}

                {isTooltipVisible && item && (
                  <div style={{
                    position: 'absolute',
                    bottom: 62, left: '50%', transform: 'translateX(-50%)',
                    background: '#2a1a0a', border: '1px solid #c8a96e',
                    color: '#f5d78e', fontSize: 10, whiteSpace: 'nowrap',
                    padding: '4px 8px', borderRadius: 4, zIndex: 20,
                    fontFamily: 'system-ui, sans-serif', pointerEvents: 'none',
                  }}>
                    {item.name}
                    <div style={{
                      position: 'absolute', top: '100%', left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid #c8a96e',
                    }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {Object.values(bis).every(v => v === null) && (
        <p style={{ textAlign: 'center', color: '#8B6914', fontSize: 12,
          marginTop: '1rem', fontStyle: 'italic' }}>
          Nenhum equipamento desbloqueado para este estilo ainda.
        </p>
      )}
    </div>
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
    return (
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhum desbloqueio nessa categoria ainda.</p>
      </div>
    )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {cats.map(cat => {
        if (!grouped[cat].length) return null
        return (
          <div key={cat} style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
            <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 10px', letterSpacing: '0.06em' }}>
              {catLabels[cat].toUpperCase()} ({grouped[cat].length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {grouped[cat].map(([id, u]) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 10px', borderRadius: 8,
                  border: '1px solid #c8a96e55', background: '#1e1005' }}>
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
    return (
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhum desbloqueio ainda.</p>
      </div>
    )

  return (
    <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
      <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 10px', letterSpacing: '0.06em' }}>
        TODOS OS DESBLOQUEIOS ({items.length})
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {items.map(u => (
          <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 10px', borderRadius: 8,
            border: '1px solid #c8a96e33', background: '#1e100588' }}>
            <span style={{ fontSize: 13 }}>{u.icon}</span>
            <span style={{ fontSize: 12, color: '#5a3e1b', fontFamily: 'system-ui, sans-serif' }}>
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function UnlocksTab({ unlocked, realLevels }) {
  const [sub, setSub] = useState('skills')

  const SUB_TABS = [
    { id: 'skills',    label: 'Skills' },
    { id: 'equipment', label: 'Equipamentos' },
    { id: 'others',    label: 'Outros' },
    { id: 'general',   label: 'Geral' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {SUB_TABS.map(t => subTabBtn(t.id, sub, t.label, setSub))}
      </div>
      {sub === 'skills'    && <SkillsTab    unlocked={unlocked} realLevels={realLevels} />}
      {sub === 'equipment' && <EquipmentTab unlocked={unlocked} />}
      {sub === 'others'    && <OthersTab    unlocked={unlocked} />}
      {sub === 'general'   && <GeneralTab   unlocked={unlocked} />}
    </div>
  )
}