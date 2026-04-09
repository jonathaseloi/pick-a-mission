import { DiffBadge } from './MissionCard.jsx'

const parch = {
  background: 'linear-gradient(160deg,#fffdf4 0%,#f5ead0 100%)',
  border: '1px solid #c8a96e',
}

export default function HistoryTab({ history }) {
  if (history.length === 0)
    return (
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ color: '#8B6914', fontSize: 13 }}>Nenhuma missão concluída ainda.</p>
      </div>
    )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {history.map((h, i) => (
        <div key={i} style={{ ...parch, borderRadius: 12, padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <DiffBadge diff={h.diff} />
              <span style={{ fontSize: 11, color: '#8B6914' }}>{h.date}</span>
            </div>
            <span style={{ fontSize: 16 }}>{h.rewardIcon}</span>
          </div>
          <p style={{ fontWeight: 500, fontSize: 14, margin: '0 0 4px', color: '#2c1a00' }}>{h.title}</p>
          <p style={{ fontSize: 12, color: '#5a3e1b', margin: '0 0 8px', lineHeight: 1.5 }}>{h.desc}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
            background: '#2c1a0011', borderRadius: 6, border: '1px solid #c8a96e44' }}>
            <span style={{ fontSize: 11, color: '#8B6914' }}>Recompensa:</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#2c1a00' }}>{h.reward}</span>
          </div>
        </div>
      ))}
    </div>
  )
}