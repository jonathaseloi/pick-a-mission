import { useState } from 'react'
import { fetchPlayerLevels, ACCOUNT_TYPES } from '../hooks/useOSRSApi.js'
import { fetchRuneProfile } from '../hooks/useRuneProfile.js'
import { parchment } from '../constants.js'

export default function SetupScreen({ onComplete }) {
  const [username,    setUsername]    = useState('')
  const [accountType, setAccountType] = useState('ironman')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)
  const [rpDetected,  setRpDetected]  = useState(null) // 'ironman' | 'hcim' | 'normal' | null

  // Tenta detectar tipo de conta via RuneProfile ao sair do campo
  async function handleUsernameBlur() {
    const name = username.trim()
    if (!name) return
    try {
      const rp = await fetchRuneProfile(name)
      if (rp?.found && rp.accountType) {
        setRpDetected(rp.accountType)
        setAccountType(rp.accountType)
      }
    } catch { /* silencioso */ }
  }

  async function handleSubmit() {
    const name = username.trim()
    if (!name) return
    setLoading(true)
    setError(null)
    try {
      const [levelsResult, rpResult] = await Promise.allSettled([
        fetchPlayerLevels(name, accountType),
        fetchRuneProfile(name),
      ])

      if (levelsResult.status === 'rejected') throw levelsResult.reason

      const levels = levelsResult.value
      const rp     = rpResult.status === 'fulfilled' ? rpResult.value : null

      // Se RuneProfile detectou tipo diferente, usa o detectado
      const finalType = rp?.accountType ?? accountType

      if (rp?.isDeadHCIM) {
        // Passa rpData mesmo assim — App.jsx exibe memorial
        onComplete(name, levels, 'hcim', rp)
        return
      }

      onComplete(name, levels, finalType, rp)
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
      <div style={{ ...parchment, padding: '2rem', maxWidth: 360, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#2c1a00', margin: '0 0 6px' }}>
          Pick a Mission
        </h1>
        <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 24px', lineHeight: 1.6 }}>
          Progressão bloqueada por missões
        </p>

        <p style={{ fontSize: 13, color: '#5a3e1b', margin: '0 0 8px', textAlign: 'left' }}>
          Tipo de conta
          {rpDetected && (
            <span style={{ marginLeft: 8, fontSize: 10, color: '#3B6D11', fontFamily: 'system-ui',
              background: '#EAF3DE', border: '1px solid #97C459', padding: '1px 6px' }}>
              ✓ detectado via RuneProfile
            </span>
          )}
        </p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {ACCOUNT_TYPES.map(at => (
            <button key={at.id} onClick={() => setAccountType(at.id)}
              style={{
                flex: 1, padding: '7px 4px', fontSize: 11, cursor: 'pointer',
                fontFamily: 'inherit', border: '2px solid',
                borderColor: accountType === at.id ? '#0e0600' : '#6a4820',
                background:  accountType === at.id ? '#3a2408' : 'transparent',
                color:       accountType === at.id ? '#f0c860' : '#5a3e1b',
                fontWeight:  accountType === at.id ? 600 : 400,
                borderRadius: 0,
                boxShadow: accountType === at.id ? 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 #0e0600' : 'none',
              }}>
              <div style={{ fontSize: 16 }}>{at.emoji}</div>
              <div style={{ fontSize: 10, marginTop: 2 }}>{at.label}</div>
            </button>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#5a3e1b', margin: '0 0 10px', textAlign: 'left' }}>
          Username do OSRS
        </p>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          onBlur={handleUsernameBlur}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="ex: Zezima"
          style={{
            width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 0,
            border: '1px solid #6a4820', background: '#d4b87a', color: '#2c1a00',
            fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
            marginBottom: 12,
          }}
        />

        {error && (
          <p style={{ fontSize: 12, color: '#993C1D', margin: '0 0 12px',
            background: '#FAECE7', padding: '6px 10px' }}>
            {error}
          </p>
        )}

        <button onClick={handleSubmit} disabled={loading || !username.trim()}
          style={{
            width: '100%', padding: '11px', fontSize: 14,
            border: '2px solid #0e0600', fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            borderRadius: 0,
            background: loading || !username.trim() ? '#2a1800' : '#3a2408',
            color: loading || !username.trim() ? '#6a4820' : '#f0c860',
            boxShadow: loading || !username.trim() ? 'none' : 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 #0e0600',
          }}>
          {loading ? 'Buscando personagem...' : 'Começar aventura'}
        </button>

        <p style={{ fontSize: 11, color: '#8B6914', marginTop: 16, lineHeight: 1.5 }}>
          Níveis buscados via OSRS Hiscores.<br />
          Tipo de conta detectado via RuneProfile (se disponível).<br />
          Progresso salvo localmente no navegador.
        </p>
      </div>
    </div>
  )
}
