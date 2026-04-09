import { UNLOCKS } from '../data/unlocks.js'
import { DiffBadge } from './MissionCard.jsx'
import { parchment } from '../App.jsx'

export default function UnlocksTab({ unlocked }) {
  const allKeys = Object.keys(UNLOCKS)
  const locked  = allKeys.filter(k => !unlocked.has(k))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {unlocked.size > 0 && (
        <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 10px', letterSpacing: '0.06em' }}>
            DESBLOQUEADOS ({unlocked.size})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[...unlocked].map(k => {
              const u = UNLOCKS[k]
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', borderRadius: 8, border: '1px solid #c8a96e66', background: '#fffdf4' }}>
                  <span style={{ fontSize: 15 }}>{u.icon}</span>
                  <span style={{ fontSize: 13, color: '#2c1a00' }}>{u.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 10px', letterSpacing: '0.06em' }}>
          BLOQUEADOS ({locked.length})
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {locked.map(k => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 8, border: '1px solid #c8a96e33',
              background: '#f5ead055', opacity: 0.5 }}>
              <span style={{ fontSize: 14 }}>🔒</span>
              <span style={{ fontSize: 12, color: '#5a3e1b' }}>{UNLOCKS[k].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}