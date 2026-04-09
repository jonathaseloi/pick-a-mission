import { DIFF } from '../App.jsx'

export const TYPE_ICON = {
  Skilling: '⛏', Boss: '💀', Quest: '📜', Dungeon: '🏰',
  Diary: '📋', 'Quest/Boss': '⚔', 'Combat Achievement': '🏆',
  Grind: '🔄', Slayer: '💀',
}

const ART_ICON = {
  Skilling: '⛏️', Boss: '💀', Quest: '📜', Dungeon: '🏰',
  Diary: '📋', 'Quest/Boss': '⚔️', 'Combat Achievement': '🏆',
  Grind: '🔁', Slayer: '🗡️',
}

const DIFF_STARS = { easy: 1, normal: 2, hard: 3 }

export function DiffBadge({ diff }) {
  const d = DIFF[diff]
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
      letterSpacing: '0.05em', background: d.bg, color: d.text, border: `1px solid ${d.border}`
    }}>
      {d.label.toUpperCase()}
    </span>
  )
}

function StarRow({ diff }) {
  const d = DIFF[diff]
  const count = DIFF_STARS[diff]
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1, 2, 3].map(i => (
        <span key={i} style={{ fontSize: 11, color: i <= count ? d.border : '#3a2a0a' }}>★</span>
      ))}
    </div>
  )
}

export default function MissionCard({ mission, state, onClick, recommended }) {
  const d = DIFF[mission.diff]
  const isSelected = state === 'selected'
  const isFaded    = state === 'faded'

  return (
    <div onClick={onClick}
      style={{
        flex: '1 1 0', minWidth: 0,
        cursor: isFaded ? 'default' : 'pointer',
        opacity: isFaded ? 0.25 : 1,
        borderRadius: 12,
        border: `3px solid ${isSelected ? d.border : recommended ? '#f5d78e' : '#7a5a1e'}`,
        boxShadow: isSelected
          ? `0 0 0 1px ${d.bg}, 0 6px 20px ${d.border}44`
          : recommended
          ? '0 0 0 1px #c8a96e, 0 4px 14px #f5d78e33'
          : '0 0 0 1px #3a2a0a',
        background: '#1a0f00',
        display: 'flex', flexDirection: 'column',
        transform: isSelected ? 'translateY(-4px) scale(1.02)' : recommended ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s',
        overflow: 'hidden',
        fontFamily: "'IM Fell English', Georgia, serif",
        position: 'relative',
      }}>

      {/* Recommended badge */}
      {recommended && !isSelected && (
        <div style={{
          position: 'absolute', top: 8, right: 8, zIndex: 2,
          background: '#c8a96e', color: '#1a0f00',
          fontSize: 8, fontWeight: 700, padding: '2px 6px',
          borderRadius: 4, letterSpacing: '0.08em',
          fontFamily: 'system-ui, sans-serif',
        }}>
          RECOMENDADO
        </div>
      )}

      {/* Art area */}
      <div style={{
        height: 80, background: '#120a00',
        borderBottom: `2px solid #7a5a1e`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{ fontSize: 36 }}>{ART_ICON[mission.type] || '⚔️'}</span>
        <div style={{ position: 'absolute', bottom: 6, left: 8 }}>
          <StarRow diff={mission.diff} />
        </div>
        <div style={{ position: 'absolute', bottom: 5, right: 8 }}>
          <span style={{ fontSize: 10, color: '#c8a96e' }}>
            {TYPE_ICON[mission.type]} {mission.type}
          </span>
        </div>
      </div>

      {/* Title */}
      <div style={{
        padding: '8px 10px 6px',
        borderBottom: '1px solid #7a5a1e44',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: '#f5d78e', lineHeight: 1.2 }}>
          {mission.title}
        </p>
        <DiffBadge diff={mission.diff} />
      </div>

      {/* Description */}
      <div style={{ padding: '8px 10px 12px', flex: 1 }}>
        <p style={{ fontSize: 11, color: '#c8a96e', margin: 0, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif', fontStyle: 'normal' }}>
          {mission.desc}
        </p>
      </div>

      {/* Active footer */}
      {isSelected && (
        <div style={{
          padding: '5px 10px',
          background: `${d.bg}33`,
          borderTop: `1px solid ${d.border}44`,
        }}>
          <p style={{ fontSize: 10, color: d.border, margin: 0, fontWeight: 600, letterSpacing: '0.06em' }}>
            EM ANDAMENTO
          </p>
        </div>
      )}
    </div>
  )
}