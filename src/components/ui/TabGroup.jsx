import { Fragment } from 'react'

export default function TabGroup({ tabs, active, onChange, size = 'md', style }) {
  const padding = size === 'sm' ? '5px 10px' : '8px 12px'
  const fontSize = size === 'sm' ? 11 : 12
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: 'var(--c-accent)', border: '2px solid var(--c-border)',
      ...style,
    }}>
      {tabs.map((tab, i) => (
        <Fragment key={tab.id}>
          {i > 0 && (
            <span style={{
              color: 'var(--c-mid)', fontSize: 14,
              alignSelf: 'center', userSelect: 'none',
              flexShrink: 0, pointerEvents: 'none',
            }}>|</span>
          )}
          <button
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1, padding, fontSize,
              border: 'none', borderRadius: 0,
              fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              background: active === tab.id ? 'var(--c-panel)' : 'transparent',
              color: active === tab.id ? 'var(--c-text)' : 'var(--c-panel)',
              fontWeight: active === tab.id ? 700 : 400,
            }}
          >
            {tab.label}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
