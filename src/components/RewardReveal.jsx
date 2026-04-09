import { useState, useEffect } from 'react'
import { UNLOCKS } from '../data/unlocks.js'

export default function RewardReveal({ mission, onAccept }) {
  const rw = UNLOCKS[mission.reward]
  const [vis, setVis] = useState(false)
  useEffect(() => { setTimeout(() => setVis(true), 100) }, [])

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s' }}>

      <p style={{ fontSize: 11, letterSpacing: '0.1em', color: '#8B6914', margin: '0 0 4px' }}>
        MISSÃO CONCLUÍDA
      </p>
      <p style={{ fontWeight: 500, fontSize: 18, margin: '0 0 20px', color: '#2c1a00' }}>
        {mission.title}
      </p>
      <div style={{ fontSize: 52, margin: '0 0 8px' }}>{rw.icon}</div>
      <p style={{ fontSize: 13, color: '#5a3e1b', fontStyle: 'italic', margin: '0 0 20px', lineHeight: 1.6 }}>
        "{mission.flavor}"
      </p>

      <div style={{ background: 'linear-gradient(135deg,#fffdf4,#f5ead0)', border: '1px solid #c8a96e',
        borderRadius: 12, padding: '1.25rem', margin: '0 auto 1.5rem', maxWidth: 280 }}>
        <p style={{ fontSize: 10, color: '#8B6914', margin: '0 0 6px', letterSpacing: '0.08em' }}>
          RECOMPENSA DESBLOQUEADA
        </p>
        <p style={{ fontSize: 16, fontWeight: 500, margin: 0, color: '#2c1a00' }}>
          {rw.label}
        </p>
      </div>

      <button onClick={onAccept}
        style={{ padding: '10px 28px', fontSize: 13, borderRadius: 8, fontWeight: 500,
          background: '#3B6D11', color: '#EAF3DE', border: 'none', letterSpacing: '0.04em' }}>
        Confirmar e sortear novas missões
      </button>
    </div>
  )
}