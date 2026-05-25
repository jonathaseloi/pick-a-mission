import { Fragment } from 'react'

export default function TabNav({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: 'var(--c-accent)',
      border: '2px solid var(--c-border)',
      marginBottom: '1.25rem',
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {tabs.map((t, i) => {
        const isActive = active === t.id
        return (
          <Fragment key={t.id}>
            {i > 0 && (
              <span style={{
                color: 'var(--c-mid)', fontSize: 16, lineHeight: 1,
                alignSelf: 'center', userSelect: 'none',
                flexShrink: 0, pointerEvents: 'none',
              }}>|</span>
            )}
            <button onClick={() => onChange(t.id)}
              style={{
                padding: '8px 12px', fontSize: 12,
                fontFamily: 'inherit', cursor: 'pointer',
                border: 'none', borderRadius: 0,
                background: isActive ? 'var(--c-panel)' : 'transparent',
                color: isActive ? 'var(--c-text)' : 'var(--c-panel)',
                fontWeight: isActive ? 700 : 400,
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background 0.1s, color 0.1s',
              }}>
              {t.label}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
