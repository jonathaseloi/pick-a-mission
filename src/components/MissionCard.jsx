import { CHAPTER_META } from '../data/missions.js'
import { DIFF } from '../constants.js'

// kept for backwards compat with HistoryTab entries created before Phase 4
export function DiffBadge({ diff }) {
  const d = DIFF[diff]
  if (!d) return null
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 0,
      letterSpacing: '0.05em', background: d.bg, color: d.text, border: `1px solid ${d.border}`
    }}>
      {d.label.toUpperCase()}
    </span>
  )
}

export function ChapterBadge({ chapter }) {
  const meta = CHAPTER_META[chapter]
  if (!meta) return null
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 7px',
      background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
      letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>
      Cap. {chapter}
    </span>
  )
}

const PATH_LABEL = { main: 'Principal', side: 'Paralela' }

const CATEGORY_ICON = {
  Quest: '📜', Skilling: '⛏', Boss: '💀', Slayer: '🗡', Minigame: '🏰',
  Farming: '🌿', Dungeon: '🏰', 'Combat Achievement': '🏆', Diary: '📋', Grind: '🔄',
}

export default function MissionCard({ mission, state, onClick, recommended, isDaily }) {
  const meta = CHAPTER_META[mission.chapter] ?? CHAPTER_META[1]
  const isSelected    = state === 'selected'
  const isFaded       = state === 'faded'
  const isChapterFinal = mission.chapterFinal === true

  const stripLabel = isDaily && !isSelected ? 'MISSÃO DIÁRIA'
    : recommended && !isSelected ? 'RECOMENDADO'
    : null
  const stripBg = isDaily && !isSelected ? '#B8860B' : meta.border
  const stripColor = isDaily && !isSelected ? '#FFF8DC' : meta.bg

  return (
    <div onClick={onClick}
      style={{
        flex: '1 1 0', minWidth: 0,
        cursor: isFaded ? 'default' : 'pointer',
        opacity: isFaded ? 0.25 : 1,
        border: `3px solid ${meta.border}`,
        boxShadow: isSelected
          ? `0 0 0 1px ${meta.bg}, 0 6px 20px ${meta.border}55`
          : `0 0 0 1px ${meta.border}44`,
        background: 'var(--c-panel)',
        display: 'flex', flexDirection: 'column',
        transform: isSelected ? 'translateY(-4px) scale(1.02)' : recommended ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s',
        overflow: 'hidden',
        fontFamily: "'IM Fell English', Georgia, serif",
      }}>

      {/* Chapter color strip — doubles as recommended / daily banner */}
      <div style={{
        background: stripBg,
        padding: stripLabel ? '2px 10px' : '3px 0',
        textAlign: 'center',
        lineHeight: 1,
      }}>
        {stripLabel && (
          <span style={{
            fontSize: 9, fontWeight: 700, color: stripColor,
            letterSpacing: '0.12em', fontFamily: 'system-ui, sans-serif',
          }}>
            {stripLabel}
          </span>
        )}
      </div>

      {/* Header: chapter bg with badges */}
      <div style={{
        padding: '7px 10px 6px',
        background: meta.bg,
        borderBottom: `1px solid ${meta.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4,
      }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontWeight: 600, color: meta.color,
            padding: '1px 6px', border: `1px solid ${meta.border}`,
            background: 'transparent', fontFamily: 'system-ui, sans-serif',
            letterSpacing: '0.04em',
          }}>
            Cap. {mission.chapter}
          </span>
          <span style={{
            fontSize: 10, color: meta.color, fontFamily: 'system-ui, sans-serif',
            padding: '1px 6px', border: `1px solid ${meta.border}44`,
            opacity: 0.75,
          }}>
            {PATH_LABEL[mission.path] ?? mission.path}
          </span>
          {isChapterFinal && (
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#B8860B',
              padding: '1px 6px', border: '1px solid #B8860B',
              background: '#FFF8DC', fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.04em',
            }}>
              FINAL
            </span>
          )}
        </div>
        <span style={{ fontSize: 10, color: meta.color, opacity: 0.6, flexShrink: 0, fontFamily: 'system-ui, sans-serif' }}>
          {CATEGORY_ICON[mission.category] ?? ''} {mission.category}
        </span>
      </div>

      {/* Title */}
      <div style={{
        padding: '8px 10px 6px',
        borderBottom: '1px solid var(--c-accent)',
      }}>
        <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'var(--c-text)', lineHeight: 1.2 }}>
          {mission.title}
        </p>
      </div>

      {/* Description */}
      <div style={{ padding: '8px 10px', flex: 1 }}>
        <p style={{ fontSize: 11, color: 'var(--c-text)', margin: 0, lineHeight: 1.5,
          fontFamily: 'system-ui, sans-serif', fontStyle: 'normal' }}>
          {mission.desc.split(' — ')[0]}
        </p>
      </div>

      {/* Footer: coins */}
      <div style={{
        padding: '5px 10px',
        borderTop: `1px solid ${meta.border}44`,
        background: 'var(--c-mid)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: 'var(--c-muted)', fontFamily: 'system-ui, sans-serif' }}>
          Recompensa oculta
        </span>
        <span style={{ fontSize: 11, color: 'var(--c-text)', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>
          +{mission.coins} 🪙
        </span>
      </div>

      {/* Active footer */}
      {isSelected && (
        <div style={{
          padding: '5px 10px',
          background: meta.bg,
          borderTop: `2px solid ${meta.border}`,
        }}>
          <p style={{ fontSize: 10, color: meta.color, margin: 0, fontWeight: 700, letterSpacing: '0.06em' }}>
            EM ANDAMENTO
          </p>
        </div>
      )}
    </div>
  )
}
