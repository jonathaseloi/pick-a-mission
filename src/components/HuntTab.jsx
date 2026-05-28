import { useState } from 'react'
import { MONSTERS, TIERS, TIER_META } from '../data/monsters.js'
import { parchment } from '../constants.js'
import { Button, Modal, Card, TabGroup } from './ui/index.js'

const parch = parchment

// Monster ID → RuneProfile CL page name (Bosses tab)
const MONSTER_TO_CL = {
  obor:                  'Obor',
  bryophyta:             'Bryophyta',
  mimic:                 'The Mimic',
  skotizo:               'Skotizo',
  giant_mole:            'Giant Mole',
  barrows:               'Barrows Chests',
  kbd:                   'King Black Dragon',
  sarachnis:             'Sarachnis',
  deranged_archaeologist:'Deranged Archaeologist',
  dagannoth_rex:         'Dagannoth Kings',
  dagannoth_prime:       'Dagannoth Kings',
  dagannoth_supreme:     'Dagannoth Kings',
  kalphite_queen:        'Kalphite Queen',
  zulrah:                'Zulrah',
  vorkath:               'Vorkath',
  alchemical_hydra:      'Alchemical Hydra',
  grotesque_guardians:   'Grotesque Guardians',
  abyssal_sire:          'Abyssal Sire',
  k_ril_tsutsaroth:      "K'ril Tsutsaroth",
  general_graardor:      'General Graardor',
  commander_zilyana:     'Commander Zilyana',
  kreearra:              "Kree'arra",
  cerberus:              'Cerberus',
  cave_kraken:           'Kraken',
  thermonuclear:         'Thermonuclear Smoke Devil',
  phantom_muspah:        'Phantom Muspah',
  zalcano:               'Zalcano',
  tztok_jad:             'Fight Caves',
  tzkalmzuk:             'The Inferno',
  duke_sucellus:         'Duke Sucellus',
  vardorvis:             'Vardorvis',
  the_leviathan:         'The Leviathan',
  the_whisperer:         'The Whisperer',
}

function getCLProgress(monsterId, collectionLog) {
  if (!collectionLog) return null
  const pageName = MONSTER_TO_CL[monsterId]
  if (!pageName) return null
  // RuneProfile returns { pages: { "Boss Name": { obtained, total } } } or flat
  const page = collectionLog.pages?.[pageName] ?? collectionLog[pageName]
  if (!page) return null
  const obtained = page.obtained ?? 0
  const total    = page.total ?? 0
  if (!total) return null
  return { obtained, total }
}

function CLBar({ monsterId, collectionLog }) {
  const cl = getCLProgress(monsterId, collectionLog)
  if (!cl) return null
  const pct = Math.min(cl.obtained / cl.total, 1)
  const done = cl.obtained >= cl.total
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: done ? '#3B6D11' : 'var(--c-muted)' }}>
          📦 CLog {done ? '✓' : ''}
        </span>
        <span style={{ fontSize: 10, color: done ? '#3B6D11' : 'var(--c-muted)', fontWeight: 600 }}>
          {cl.obtained}/{cl.total}
        </span>
      </div>
      <div style={{ height: 4, background: '#c8bda4', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct * 100}%`,
          background: done ? '#3B6D11' : '#c8a96e',
          borderRadius: 2, transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

function Tag({ color, bg, border, children }) {
  return (
    <span style={{
      fontSize: 11, padding: '1px 6px', borderRadius: 10,
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
function MonsterCard({ monster, onSelect, collectionLog }) {
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
      <div style={{ width: 48, height: 48, background: 'var(--c-mid)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        <MonsterImg src={monster.img} name={monster.name} size={36} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>{monster.name}</span>
          <Tag {...meta}>{meta.label}</Tag>
          {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--c-muted)' }}>
          <span>🪙 {monster.coinsPerKill}/kill</span>
          <span>+{monster.bonusAmount} a cada {monster.bonusEvery}kc</span>
        </div>
        <CLBar monsterId={monster.id} collectionLog={collectionLog} />
      </div>
      <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          fontSize: 12, padding: '3px 8px', borderRadius: 6,
          border: '1px solid var(--c-accent)', color: '#5a4a38',
          background: 'transparent', textDecoration: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
        Wiki ↗
      </a>
    </div>
  )
}

// ─── Active hunt ──────────────────────────────────────────────────────────────
function ActiveHunt({ hunt, onAddKills, onFinish, collectionLog }) {
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
        ...parch, padding: '14px 16px', marginBottom: 12,
        display: 'flex', alignItems: 'center', gap: 14,
        borderLeft: `4px solid ${meta.border}`,
      }}>
        <div style={{ width: 72, height: 72, background: 'var(--c-mid)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
          <MonsterImg src={monster.img} name={monster.name} size={58} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)' }}>{monster.name}</span>
            <Tag {...meta}>{meta.label}</Tag>
            {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
          </div>
          <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: 'var(--c-muted)', textDecoration: 'underline' }}>
            Ver na Wiki ↗
          </a>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-text)', lineHeight: 1 }}>
            {kills.toLocaleString()}
          </div>
          <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>kills</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: '🪙 Total ganho', value: `${(hunt.totalCoinsEarned || 0).toLocaleString()} PAM` },
          { label: 'Marcos',      value: `${totalMilestones}x` },
          { label: 'Próx. bônus', value: `${toNext} kills` },
        ].map(({ label, value }) => (
          <div key={label} style={{ ...parch, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Collection Log progress (if available) */}
      {getCLProgress(monster.id, collectionLog) && (
        <div style={{ ...parch, padding: '8px 12px', marginBottom: 12 }}>
          <CLBar monsterId={monster.id} collectionLog={collectionLog} />
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>Progresso para +{monster.bonusAmount} 🪙</span>
          <span style={{ fontSize: 11, color: '#5a3a0e', fontWeight: 600 }}>{intoMilestone} / {monster.bonusEvery}</span>
        </div>
        <div style={{ height: 8, background: '#c8bda4', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--c-accent)' }}>
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
            borderRadius: 0, border: '1px solid var(--c-accent)',
            background: 'var(--c-panel)', color: 'var(--c-text)', fontFamily: 'inherit', outline: 'none',
          }} />
        <Button onClick={handleAdd} style={{ padding: '10px 20px' }}>+ Registrar</Button>
      </div>

      {/* Quick add */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {[1, 5, 10, 25, 50, 100].map(n => (
          <Button key={n} variant="secondary" onClick={() => onAddKills(n)}
            style={{ padding: '5px 12px', fontSize: 12, color: 'var(--btn-bg)' }}>
            +{n}
          </Button>
        ))}
      </div>

      {/* Actions */}
      <Button onClick={onFinish} style={{ width: '100%', padding: '10px' }}>Finalizar Hunt</Button>
    </div>
  )
}

// ─── Confirm modal ────────────────────────────────────────────────────────────
function ConfirmModal({ monster, onConfirm, onCancel }) {
  const meta = TIER_META[monster.tier]
  return (
    <Modal onClose={onCancel}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <div style={{ width: 110, height: 110, background: 'var(--c-mid)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <MonsterImg src={monster.img} name={monster.name} size={90} />
        </div>
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 4px', textAlign: 'center' }}>
        {monster.name}
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
        <Tag {...meta}>{meta.label}</Tag>
        {monster.slayerReq && <Tag color="#5a2db0" bg="#f0e8ff" border="#b39ddb">Slayer Task</Tag>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[
          { label: '🪙 Coins/kill', value: monster.coinsPerKill },
          { label: 'Bônus', value: `+${monster.bonusAmount} / ${monster.bonusEvery}kc` },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--c-panel)', borderRadius: 0, padding: '6px 10px', border: '1px solid var(--c-accent)' }}>
            <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{value}</div>
          </div>
        ))}
      </div>
      <a href={monster.wiki} target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', textAlign: 'center', fontSize: 12, color: 'var(--c-muted)', marginBottom: 12 }}>
        Ver loot e locais na Wiki ↗
      </a>
      {monster.slayerReq && (
        <p style={{ fontSize: 11, color: '#5a2db0', textAlign: 'center', background: '#f0e8ff', border: '1px solid #b39ddb', borderRadius: 6, padding: '5px 10px', marginBottom: 10 }}>
          ⚠️ Requer Slayer Task ativa no jogo
        </p>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" onClick={onCancel} style={{ flex: 1, padding: '10px' }}>Cancelar</Button>
        <Button onClick={() => onConfirm(monster)} style={{ flex: 1, padding: '10px' }}>Iniciar Hunt!</Button>
      </div>
    </Modal>
  )
}

// ─── Tier unlock banner ───────────────────────────────────────────────────────
function TierUnlockBanner({ tier, newMonsters, onDismiss }) {
  const meta = TIER_META[tier.id]
  return (
    <div style={{ ...parch, padding: '14px 16px', marginBottom: 14, borderLeft: `4px solid ${meta.border}`, background: meta.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>🎉</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>Tier {meta.label} desbloqueado!</span>
      </div>
      <p style={{ fontSize: 12, color: '#5a3a0e', margin: '0 0 10px' }}>2 monstros adicionados à sua lista:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        {newMonsters.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MonsterImg src={m.img} name={m.name} size={36} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>{m.name}</span>
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
          background: ev.type === 'bonus' ? 'var(--c-text)' : '#1a3a10',
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
export default function HuntTab({ combatLevel, hunt, onHuntUpdate, onCoinsChange, huntUnlocked, onHuntUnlockedChange, huntPrefs, onHuntPrefsChange, collectionLog }) {
  const [pendingMonster, setPendingMonster] = useState(null)
  const [feedEvents, setFeedEvents]         = useState([])
  const [search, setSearch]                 = useState('')

  const hideSlayer = huntPrefs?.hideSlayer ?? false
  const sortOrder  = huntPrefs?.sort ?? 'tier'

  function setHideSlayer(val) {
    onHuntPrefsChange({ ...huntPrefs, hideSlayer: val })
  }
  function setSortOrder(val) {
    onHuntPrefsChange({ ...huntPrefs, sort: val })
  }

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
    if (!hunt) return
    const monster = MONSTERS.find(m => m.id === hunt.monsterId)
    const entry = {
      type: 'hunt',
      monsterId: hunt.monsterId,
      monsterName: monster?.name ?? hunt.monsterId,
      monsterImg: monster?.img ?? '',
      monsterTier: monster?.tier ?? 'cb1',
      kills: hunt.kills,
      coinsEarned: hunt.totalCoinsEarned || 0,
      date: new Date().toLocaleDateString('pt-BR'),
      startedAt: hunt.startedAt,
    }
    onHuntUpdate(null, entry)
    addFeed('bonus', '✅ Hunt finalizado!', `${hunt.kills} kills · ${(hunt.totalCoinsEarned || 0).toLocaleString()} 🪙`)
  }

  // Build filtered + sorted list
  const SORT_FNS = {
    tier:      (a, b) => TIERS.findIndex(t => t.id === a.tier) - TIERS.findIndex(t => t.id === b.tier),
    coins:     (a, b) => b.coinsPerKill - a.coinsPerKill,
    name:      (a, b) => a.name.localeCompare(b.name),
  }

  const unlockedMonsters = MONSTERS
    .filter(m => huntUnlocked.has(m.id))
    .filter(m => !hideSlayer || !m.slayerReq)
    .filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()))
    .sort(SORT_FNS[sortOrder] ?? SORT_FNS.tier)

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>Hunt</h2>
        <span style={{ fontSize: 11, color: 'var(--c-muted)' }}>CB {combatLevel} · {MONSTERS.filter(m => huntUnlocked.has(m.id)).length} monstros</span>
      </div>

      {/* Active hunt */}
      {hunt && (
        <div style={{ marginBottom: 16 }}>
          <ActiveHunt hunt={hunt} onAddKills={handleAddKills} onFinish={handleFinish} collectionLog={collectionLog} />
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
              width: '100%', padding: '8px 12px', fontSize: 12, marginBottom: 8,
              borderRadius: 0, border: '1px solid var(--c-accent)',
              background: 'var(--c-panel)', color: 'var(--c-text)', fontFamily: 'inherit', outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          {/* Controls row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {/* Sort */}
            <TabGroup size="sm" style={{ border: '2px solid #3a2e20' }}
              tabs={[{ id: 'tier', label: 'Tier' }, { id: 'coins', label: 'Coins' }, { id: 'name', label: 'Nome' }]}
              active={sortOrder} onChange={setSortOrder} />

            {/* Slayer toggle */}
            <label style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, color: 'var(--c-text)', cursor: 'pointer', marginLeft: 'auto',
            }}>
              <input
                type="checkbox"
                checked={hideSlayer}
                onChange={e => setHideSlayer(e.target.checked)}
                style={{ accentColor: 'var(--c-accent)' }}
              />
              Ocultar Slayer Task
            </label>
          </div>

          {unlockedMonsters.length === 0 ? (
            <p style={{ color: 'var(--c-muted)', fontSize: 13, textAlign: 'center', padding: '1rem' }}>
              {search ? 'Nenhum monstro encontrado.' : 'Nenhum monstro desbloqueado ainda.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ fontSize: 12, color: '#5a3a0e', margin: '0 0 4px', letterSpacing: '0.05em' }}>
                {unlockedMonsters.length} MONSTRO{unlockedMonsters.length !== 1 ? 'S' : ''} — clique para iniciar
              </p>
              {unlockedMonsters.map(m => (
                <MonsterCard key={m.id} monster={m} onSelect={setPendingMonster} collectionLog={collectionLog} />
              ))}
            </div>
          )}
        </>
      )}

      {pendingMonster && (
        <ConfirmModal monster={pendingMonster} onConfirm={handleConfirmHunt} onCancel={() => setPendingMonster(null)} />
      )}

      <KillFeed events={feedEvents} onDismiss={id => setFeedEvents(prev => prev.filter(e => e.id !== id))} />
    </Card>
  )
}