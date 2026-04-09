import { parchment } from '../App.jsx'

export default function ConfigTab({ mode, modes, onChange }) {
  return (
    <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
      <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 12px', letterSpacing: '0.06em' }}>
        MODO DE SORTEIO
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {modes.map(m => (
          <div key={m.id} onClick={() => onChange(m.id)}
            style={{ cursor: 'pointer', padding: '12px 14px', borderRadius: 10,
              border: mode === m.id ? '2px solid #3B6D11' : '1px solid #c8a96e66',
              background: mode === m.id ? '#EAF3DE' : '#fffdf4' }}>
            <p style={{ fontWeight: 500, fontSize: 13, margin: '0 0 2px',
              color: mode === m.id ? '#3B6D11' : '#2c1a00' }}>{m.label}</p>
            <p style={{ fontSize: 11, color: '#8B6914', margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: '#8B6914', marginTop: '1.25rem' }}>
        Mudanças valem a partir do próximo sorteio.
      </p>
    </div>
  )
}