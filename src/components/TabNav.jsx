export default function TabNav({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          style={{ padding: '6px 14px', fontSize: 12, borderRadius: 20,
            border: '1px solid #c8a96e',
            background: active === t.id ? '#2c1a00' : 'transparent',
            color:      active === t.id ? '#f5ead0' : '#5a3e1b',
            fontWeight: active === t.id ? 500 : 400 }}>
          {t.label}
        </button>
      ))}
    </div>
  )
}