import { useState } from 'react'
import { fetchPlayerLevels } from '../hooks/useOSRSApi.js'

export default function SetupScreen({ onComplete }) {
  const [username, setUsername] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  async function handleSubmit() {
    const name = username.trim()
    if (!name) return
    setLoading(true)
    setError(null)
    try {
      const levels = await fetchPlayerLevels(name)
      onComplete(name, levels)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        background: 'linear-gradient(160deg,#fffdf4 0%,#f5ead0 100%)',
        border: '1px solid #c8a96e',
        borderRadius: 16, padding: '2rem 2rem', maxWidth: 360, width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚔️</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#2c1a00', margin: '0 0 6px' }}>
          Pick a Mission
        </h1>
        <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 24px', lineHeight: 1.6 }}>
          Modo Ironman · Progressão bloqueada por missões
        </p>

        <p style={{ fontSize: 13, color: '#5a3e1b', margin: '0 0 10px', textAlign: 'left' }}>
          Username do OSRS (Ironman)
        </p>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="ex: Zezima"
          style={{
            width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8,
            border: '1px solid #c8a96e', background: '#fffdf4', color: '#2c1a00',
            fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
            marginBottom: 12,
          }}
        />

        {error && (
          <p style={{ fontSize: 12, color: '#993C1D', margin: '0 0 12px',
            background: '#FAECE7', borderRadius: 6, padding: '6px 10px' }}>
            {error}
          </p>
        )}

        <button onClick={handleSubmit} disabled={loading || !username.trim()}
          style={{
            width: '100%', padding: '11px', fontSize: 14, borderRadius: 8,
            border: 'none', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            background: loading || !username.trim() ? '#5a3a0e' : '#2c1a00',
            color: '#f5ead0', transition: 'background 0.15s',
          }}>
          {loading ? 'Buscando personagem...' : 'Começar aventura'}
        </button>

        <p style={{ fontSize: 11, color: '#8B6914', marginTop: 16, lineHeight: 1.5 }}>
          Seus dados são buscados no Hiscores do OSRS.<br />
          O progresso fica salvo localmente no seu navegador.
        </p>
      </div>
    </div>
  )
}