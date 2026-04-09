export default function TabNav({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              padding: '6px 14px', fontSize: 12, borderRadius: 20,
              fontFamily: 'inherit', cursor: 'pointer',
              border: '1px solid',
              borderColor: isActive ? '#c8a96e' : '#5a3a0e',
              background:  isActive ? '#c8a96e' : '#2a1a0a',
              color:       isActive ? '#1a0f00' : '#c8a96e',
              fontWeight:  isActive ? 600 : 400,
              transition: 'all 0.15s',
            }}>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}