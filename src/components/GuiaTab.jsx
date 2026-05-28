import { useState } from 'react'
import { Card, TabGroup } from './ui/index.js'
import {
  GUIDE_SKILLS, GUIDE_GP, GUIDE_ITEMS,
  GUIDE_RUNES, GUIDE_AMMO, GUIDE_FOOD, GUIDE_VARLAMORE, GUIDE_SAILING,
  GUIDE_SUPPLIES_MODERN,
} from '../data/guide.js'

const PRIORITY_COLOR = {
  'Muito Alta': '#3a6a10',
  'Alta':       '#7a5000',
  'Média':      'var(--c-muted)',
  'Baixa':      '#6a5a40',
}

// ── Sub-tabs ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'skills',      label: 'Skills' },
  { id: 'gp',         label: 'GP' },
  { id: 'itens',      label: 'Itens' },
  { id: 'suprimentos', label: 'Suprimentos' },
  { id: 'varlamore',  label: 'Varlamore' },
  { id: 'sailing',    label: 'Sailing' },
]

// ── Shared accordion ──────────────────────────────────────────────────────────
function Accordion({ id, title, right, open, onToggle, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--c-accent)' }}>
      <button onClick={() => onToggle(id)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 0', background: 'transparent', border: 'none',
        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {right && <span style={{ fontSize: 11, color: 'var(--c-muted)', fontFamily: 'system-ui' }}>{right}</span>}
          <span style={{ fontSize: 14, color: 'var(--c-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>v</span>
        </div>
      </button>
      {open && <div style={{ paddingBottom: 12 }}>{children}</div>}
    </div>
  )
}

// ── Level row ─────────────────────────────────────────────────────────────────
function LevelRow({ range, method, loc, notes }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '4px 10px', marginBottom: 6 }}>
      <span style={{
        fontSize: 11, fontWeight: 700, color: 'var(--c-hi)', fontFamily: 'system-ui',
        padding: '2px 6px', background: 'var(--c-mid)', textAlign: 'center', alignSelf: 'start',
      }}>{range}</span>
      <div>
        <p style={{ fontSize: 12, color: 'var(--c-text)', margin: '0 0 1px', fontWeight: 600 }}>{method}</p>
        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 1px', fontFamily: 'system-ui' }}>{loc}</p>
        <p style={{ fontSize: 11, color: '#9aaa88', margin: 0, fontFamily: 'system-ui', fontStyle: 'italic' }}>{notes}</p>
      </div>
    </div>
  )
}

// ── GP card ───────────────────────────────────────────────────────────────────
function GPCard({ item }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--c-accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>{item.name}</p>
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#3a6a10', fontFamily: 'system-ui',
          background: 'var(--c-mid)', padding: '1px 7px', whiteSpace: 'nowrap', marginLeft: 8,
        }}>{item.gph}</span>
      </div>
      <p style={{ fontSize: 11, color: '#7a5000', margin: '0 0 4px', fontFamily: 'system-ui' }}>
        Req: {item.reqs}
      </p>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 4px', fontFamily: 'system-ui' }}>{item.method}</p>
      <p style={{ fontSize: 11, color: '#5a6040', margin: 0, fontFamily: 'system-ui', fontStyle: 'italic' }}>{item.tip}</p>
    </div>
  )
}

// ── Item card ─────────────────────────────────────────────────────────────────
function ItemCard({ item }) {
  const col = PRIORITY_COLOR[item.priority] ?? 'var(--c-muted)'
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--c-accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>{item.name}</p>
        <span style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: 'system-ui', whiteSpace: 'nowrap', marginLeft: 8 }}>
          {item.priority}
        </span>
      </div>
      <p style={{ fontSize: 11, color: '#c8a96e', margin: '0 0 4px', fontFamily: 'system-ui' }}>Como obter: {item.how}</p>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0, fontFamily: 'system-ui' }}>{item.notes}</p>
    </div>
  )
}

// ── Shop calculator ───────────────────────────────────────────────────────────
function ShopCalc({ optimalPerWorld, stock, label }) {
  const [qty, setQty] = useState('')
  const n = parseInt(qty, 10)
  const worlds = qty && !isNaN(n) && n > 0 ? Math.ceil(n / optimalPerWorld) : null
  return (
    <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-hi)', fontFamily: 'system-ui' }}>{label}</span>
        <span style={{ fontSize: 10, color: 'var(--c-hi)', fontFamily: 'system-ui', opacity: 0.85 }}>
          stock: {stock.toLocaleString()} · ótimo: {optimalPerWorld.toLocaleString()}/world
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="number" value={qty} onChange={e => setQty(e.target.value)}
          placeholder="Quantidade desejada"
          style={{ flex: 1, minWidth: 0, fontSize: 11, padding: '4px 8px',
            background: 'var(--c-panel)', border: '1px solid var(--c-border)',
            color: 'var(--c-text)', fontFamily: 'inherit', borderRadius: 0, outline: 'none' }}
        />
        {worlds !== null && (
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-hi)', flexShrink: 0 }}>
            {worlds} world{worlds !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Bullet list section ───────────────────────────────────────────────────────
function BulletSection({ title, groups }) {
  const [open, setOpen] = useState({})
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 6px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
        {title}
      </p>
      {groups.map(g => (
        <Accordion key={g.id} id={g.id} title={g.name} open={!!open[g.id]} onToggle={id => setOpen(p => ({ ...p, [id]: !p[id] }))}>
          <ul style={{ margin: '4px 0 0', paddingLeft: 16 }}>
            {g.items.map((item, i) => (
              <li key={i} style={{ fontSize: 12, color: 'var(--c-muted)', fontFamily: 'system-ui', marginBottom: 4 }}>{item}</li>
            ))}
          </ul>
          {g.calc && <ShopCalc optimalPerWorld={g.calc.optimalPerWorld} stock={g.calc.stock} label={g.calc.label} />}
        </Accordion>
      ))}
    </div>
  )
}

// ── Food accordion section ────────────────────────────────────────────────────
function FoodSection() {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  return (
    <div>
      <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 6px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
        COMIDA
      </p>
      {GUIDE_FOOD.map(f => {
        const col = PRIORITY_COLOR[f.priority] ?? 'var(--c-muted)'
        return (
          <Accordion
            key={f.id} id={f.id}
            title={f.name}
            right={`+${f.heal} HP · ${f.priority}`}
            open={!!open[f.id]} onToggle={toggle}
          >
            <div style={{ paddingLeft: 4 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#7a5000', fontFamily: 'system-ui' }}>{f.fish}</span>
                <span style={{ fontSize: 11, color: '#7a5000', fontFamily: 'system-ui' }}>{f.cook}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: 'system-ui' }}>{f.priority}</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 4px', fontFamily: 'system-ui' }}>{f.loc}</p>
              <p style={{ fontSize: 11, color: '#5a6040', margin: 0, fontFamily: 'system-ui', fontStyle: 'italic' }}>{f.notes}</p>
            </div>
          </Accordion>
        )
      })}
    </div>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────
function EssentialsContent({ activities }) {
  return (
    <div style={{ paddingBottom: 4 }}>
      {activities.map(act => (
        <div key={act.name} style={{ padding: '8px 0', borderBottom: '1px solid var(--c-accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>{act.name}</p>
            <span style={{ fontSize: 10, color: '#7a5000', fontFamily: 'system-ui', marginLeft: 8, whiteSpace: 'nowrap', flexShrink: 0 }}>Req: {act.req}</span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 3px', fontFamily: 'system-ui' }}>{act.desc}</p>
          <p style={{ fontSize: 11, color: '#5a6040', margin: 0, fontFamily: 'system-ui', fontStyle: 'italic' }}>{act.tip}</p>
        </div>
      ))}
    </div>
  )
}

function SkillsContent() {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  return (
    <>
      {GUIDE_SKILLS.map(skill => (
        <Accordion key={skill.id} id={skill.id} title={skill.name}
          right={skill.isEssentials ? '7 atividades' : `${skill.levels[0].range.split('–')[0]}–99`}
          open={!!open[skill.id]} onToggle={toggle}>
          {skill.isEssentials ? (
            <EssentialsContent activities={skill.activities} />
          ) : (
            <>
              {skill.levels.map(lv => (
                <LevelRow key={lv.range} {...lv} />
              ))}
              {skill.priorities?.length > 0 && (
                <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--c-accent)' }}>
                  <p style={{ fontSize: 10, color: 'var(--c-muted)', margin: '0 0 6px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>PRIORIDADES</p>
                  {skill.priorities.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: 'var(--c-hi)', fontFamily: 'system-ui', flexShrink: 0, marginTop: 1 }}>›</span>
                      <p style={{ fontSize: 11, color: '#9aaa88', margin: 0, fontFamily: 'system-ui' }}>{p}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Accordion>
      ))}
    </>
  )
}

function GPContent() {
  return (
    <>
      {GUIDE_GP.map(item => <GPCard key={item.id} item={item} />)}
    </>
  )
}

function ItensContent() {
  return (
    <>
      {GUIDE_ITEMS.map(item => <ItemCard key={item.id} item={item} />)}
    </>
  )
}

// ── Varlamore entry card ──────────────────────────────────────────────────────
function VarlaEntry({ entry }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--c-accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>{entry.name}</p>
        <span style={{ fontSize: 10, color: '#7a5000', fontFamily: 'system-ui', marginLeft: 8, whiteSpace: 'nowrap', flexShrink: 0 }}>{entry.type}</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 3px', fontFamily: 'system-ui' }}>{entry.desc}</p>
      {entry.tip && (
        <p style={{ fontSize: 11, color: '#5a6040', margin: 0, fontFamily: 'system-ui', fontStyle: 'italic' }}>{entry.tip}</p>
      )}
    </div>
  )
}

function VarlamoreContent() {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  return (
    <>
      <div style={{ padding: '8px 10px', background: 'var(--c-mid)', marginBottom: 14,
        border: '1px solid var(--c-accent)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 2px' }}>Varlamore</p>
        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: 0, fontFamily: 'system-ui' }}>
          Requer Children of the Sun quest para acessar. Game-changer para ironman mid-game.
        </p>
      </div>
      {GUIDE_VARLAMORE.map(section => (
        <Accordion key={section.id} id={section.id} title={section.name}
          right={`${section.entries.length} tópicos`}
          open={!!open[section.id]} onToggle={toggle}>
          {section.entries.map(e => <VarlaEntry key={e.id} entry={e} />)}
        </Accordion>
      ))}
    </>
  )
}

function SuprimentosContent() {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  return (
    <>
      <BulletSection title="RUNAS" groups={GUIDE_RUNES} />
      <BulletSection title="FLECHAS E BOLTS" groups={GUIDE_AMMO} />
      <FoodSection />
      <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '18px 0 6px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
        VARLAMORE & SAILING (MODERNOS)
      </p>
      {GUIDE_SUPPLIES_MODERN.map(section => (
        <Accordion key={section.id} id={section.id} title={section.name}
          right={`${section.entries.length} recursos`}
          open={!!open[section.id]} onToggle={toggle}>
          {section.entries.map(e => <VarlaEntry key={e.id} entry={e} />)}
        </Accordion>
      ))}
    </>
  )
}

// ── Sailing content ───────────────────────────────────────────────────────────
function SailingContent() {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(p => ({ ...p, [id]: !p[id] }))
  return (
    <>
      <div style={{ padding: '8px 10px', background: 'var(--c-mid)', marginBottom: 14,
        border: '1px solid var(--c-accent)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 2px' }}>Sailing</p>
        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: 0, fontFamily: 'system-ui' }}>
          Nova skill que abre rotas de recursos, locais de Slayer exclusivos e atalhos significativos para Ironman.
        </p>
      </div>
      {GUIDE_SAILING.map(section => (
        <Accordion key={section.id} id={section.id} title={section.name}
          right={`${section.entries.length} tópicos`}
          open={!!open[section.id]} onToggle={toggle}>
          {section.entries.map(e => <VarlaEntry key={e.id} entry={e} />)}
        </Accordion>
      ))}
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function GuiaTab() {
  const [section, setSection] = useState('skills')

  const content = {
    skills:      <SkillsContent />,
    gp:          <GPContent />,
    itens:       <ItensContent />,
    suprimentos: <SuprimentosContent />,
    varlamore:   <VarlamoreContent />,
    sailing:     <SailingContent />,
  }

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <TabGroup tabs={SECTIONS} active={section} onChange={setSection} size="sm"
        style={{ border: 'none', borderBottom: '2px solid var(--c-border)' }} />

      <div style={{ padding: '1.25rem' }}>
        {content[section]}
      </div>
    </Card>
  )
}
