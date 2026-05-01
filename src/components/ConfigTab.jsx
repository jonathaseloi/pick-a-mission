import { useState } from 'react'
import { parchment } from '../App.jsx'

export default function ConfigTab({ mode, modes, onChange, username, onRefresh, onChangeUser }) {
  const [refreshing, setRefreshing] = useState(false)
  const [msg, setMsg]               = useState(null)

  async function handleRefresh() {
    setRefreshing(true)
    setMsg(null)
    const ok = await onRefresh()
    setMsg(ok ? '✓ Níveis atualizados!' : '✗ Erro ao buscar. Tente novamente.')
    setRefreshing(false)
    setTimeout(() => setMsg(null), 3000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Player */}
      <div style={{ ...parchment, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 12px', letterSpacing: '0.06em' }}>
          PERSONAGEM
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#2c1a00', margin: '0 0 2px' }}>{username}</p>
            <p style={{ fontSize: 11, color: '#8B6914', margin: 0 }}>Ironman</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing}
            style={{ padding: '7px 14px', fontSize: 12, borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', border: '1px solid #c8a96e',
              background: '#2c1a00', color: '#f5ead0', fontWeight: 500 }}>
            {refreshing ? 'Atualizando...' : '↻ Atualizar níveis'}
          </button>
        </div>
        {msg && (
          <p style={{ fontSize: 12, margin: '0 0 8px', padding: '6px 10px', borderRadius: 6,
            background: msg.startsWith('✓') ? '#EAF3DE' : '#FAECE7',
            color: msg.startsWith('✓') ? '#3B6D11' : '#993C1D' }}>
            {msg}
          </p>
        )}
        <button onClick={onChangeUser}
          style={{ fontSize: 11, color: '#993C1D', background: 'transparent',
            border: '1px solid #D85A3066', padding: '5px 12px', borderRadius: 6,
            cursor: 'pointer', fontFamily: 'inherit' }}>
          Trocar de usuário (reseta progresso)
        </button>
      </div>

      {/* Draw mode */}
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
        <p style={{ fontSize: 11, color: '#8B6914', marginTop: '1rem' }}>
          Mudanças valem a partir do próximo sorteio.
        </p>
      </div>

    </div>
  )
}