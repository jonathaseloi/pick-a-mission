import { useState, useEffect } from 'react'
import { UNLOCKS } from '../data/unlocks.js'
import { CHAPTER_META } from '../data/missions.js'
import { MONSTERS } from '../data/monsters.js'

export default function RewardReveal({ mission, onAccept }) {
  const rw = mission.reward ? UNLOCKS[mission.reward] : null
  const meta = CHAPTER_META[mission.chapter] ?? CHAPTER_META[1]
  const huntMonster = mission.huntUnlock ? MONSTERS.find(m => m.id === mission.huntUnlock) : null
  const [vis, setVis] = useState(false)
  useEffect(() => { setTimeout(() => setVis(true), 100) }, [])

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.4s' }}>

      <p style={{ fontSize: 11, letterSpacing: '0.1em', color: meta.color, margin: '0 0 4px', fontWeight: 700 }}>
        MISSÃO CONCLUÍDA
      </p>
      <p style={{ fontWeight: 500, fontSize: 18, margin: '0 0 20px', color: '#2c1a00' }}>
        {mission.title}
      </p>

      {/* Coins */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '0 0 16px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#e2dbc8', border: '1px solid #94866d', padding: '6px 14px',
        }}>
          <span style={{ fontSize: 18 }}>🪙</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#2c1a00' }}>+{mission.coins}</span>
          <span style={{ fontSize: 11, color: '#5a3e1b' }}>PAM Coins</span>
        </div>
        {mission.reroll > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: `${meta.bg}`, border: `1px solid ${meta.border}`, padding: '6px 14px',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>+{mission.reroll}</span>
            <span style={{ fontSize: 11, color: meta.color }}>Re-roll{mission.reroll !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Unlock reward */}
      {rw && (
        <div style={{ background: '#e2dbc8', border: '1px solid #94866d',
          padding: '1.25rem', margin: '0 auto 12px', maxWidth: 280 }}>
          <p style={{ fontSize: 10, color: '#8B6914', margin: '0 0 4px', letterSpacing: '0.08em' }}>
            DESBLOQUEIO
          </p>
          <p style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#2c1a00' }}>
            {rw.label}
          </p>
        </div>
      )}

      {/* Hunt unlock */}
      {huntMonster && (
        <div style={{ background: '#e8f0e0', border: '1px solid #97C459',
          padding: '0.75rem 1.25rem', margin: '0 auto 12px', maxWidth: 280 }}>
          <p style={{ fontSize: 10, color: '#3B6D11', margin: '0 0 4px', letterSpacing: '0.08em' }}>
            MONSTRO DESBLOQUEADO
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#2c1a00' }}>
            {huntMonster.name}
          </p>
        </div>
      )}

      {!rw && !huntMonster && (
        <p style={{ fontSize: 12, color: '#5a3e1b', margin: '0 0 16px', fontStyle: 'italic' }}>
          Missão de progressão — continue avançando no jogo.
        </p>
      )}

      <button onClick={onAccept}
        style={{ padding: '10px 28px', fontSize: 13, borderRadius: 0, fontWeight: 600,
          background: meta.color, color: meta.bg,
          border: `2px solid ${meta.border}`, fontFamily: 'inherit', letterSpacing: '0.04em',
          cursor: 'pointer' }}>
        Confirmar e sortear novas missões
      </button>
    </div>
  )
}
