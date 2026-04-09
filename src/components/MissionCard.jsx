import { DIFF } from '../App.jsx'

export const TYPE_ICON = {
  Skilling: '⛏', Boss: '💀', Quest: '📜', Dungeon: '🏰',
  Diary: '📋', 'Quest/Boss': '⚔', 'Combat Achievement': '🏆',
  Grind: '🔄', Slayer: '💀',
}

export function DiffBadge({ diff }) {
  const d = DIFF[diff]
  return (
    <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
      letterSpacing: '0.05em', background: d.bg, color: d.text, border: `1px solid ${d.border}` }}>
      {d.label.toUpperCase()}
    </span>
  )
}

export default function MissionCard({ mission, state, onClick }) {
  const d = DIFF[mission.diff]
  const isSelected = state === 'selected'
  const isFaded    = state === 'faded'

  return (
    <div onClick={onClick}
      style={{
        flex: '1 1 0', minWidth: 0,
        cursor: isFaded ? 'default' : 'pointer',
        opacity: isFaded ? 0.25 : 1,
        border: isSelected ? `2px solid ${d.border}` : '1px solid #c8a96e55',
        borderRadius: 10,
        background: isSelected
          ? `linear-gradient(160deg, ${d.light} 0%, #fffdf4 100%)`
          : 'linear-gradient(160deg, #fffdf4 0%, #f5ead0 100%)',
        display: 'flex', flexDirection: 'column',
        transform: isSelected ? 'translateY(-4px) scale(1.02)' : 'none',
        transition: 'all 0.2s',
        boxShadow: isSelected ? `0 6px 18px ${d.border}44` : '0 2px 6px #0001',
        position: 'relative', overflow: 'hidden',
      }}>

      {isSelected && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${d.border}, ${d.bg})` }} />
      )}

      <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid #c8a96e33' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <DiffBadge diff={mission.diff} />
          <span style={{ fontSize: 11, color: '#8B6914' }}>
            {TYPE_ICON[mission.type]} {mission.type}
          </span>
        </div>
        <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: '#2c1a00', lineHeight: 1.3 }}>
          {mission.title}
        </p>
      </div>

      <div style={{ padding: '8px 12px 12px', flex: 1 }}>
        <p style={{ fontSize: 12, color: '#5a3e1b', margin: 0, lineHeight: 1.5 }}>
          {mission.desc}
        </p>
      </div>

      {isSelected && (
        <div style={{ padding: '6px 12px', background: `${d.bg}22`, borderTop: `1px solid ${d.border}44` }}>
          <p style={{ fontSize: 10, color: d.bg, margin: 0, fontWeight: 500, letterSpacing: '0.05em' }}>
            EM ANDAMENTO
          </p>
        </div>
      )}
    </div>
  )
}