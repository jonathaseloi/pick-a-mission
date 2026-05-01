import { useState } from 'react'
import { parchment } from '../constants.js'

const parch = parchment

// ─── Reset confirmation modal ─────────────────────────────────────────────────
function ResetModal({ onConfirm, onCancel }) {
  const [typed, setTyped] = useState('')
  const confirmed = typed.trim().toLowerCase() === 'resetar'

  const items = [
    { icon: '🪙', label: 'PAM Coins — zerados' },
    { icon: '📋', label: 'Missões concluídas — apagadas' },
    { icon: '🔓', label: 'Desbloqueios de skills e itens — perdidos' },
    { icon: '🎯', label: 'Hunt ativo — cancelado' },
    { icon: '🐉', label: 'Monstros desbloqueados — removidos' },
    { icon: '📜', label: 'Histórico de missões e hunts — apagado' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{
        ...parch, borderRadius: 14, padding: '1.5rem',
        maxWidth: 400, width: '100%',
        boxShadow: '0 0 40px rgba(216,90,48,0.3), 0 20px 60px rgba(0,0,0,0.5)',
        border: '2px solid #D85A30',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚠️</div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#7A1F1F', margin: '0 0 6px' }}>
            Resetar tudo?
          </h2>
          <p style={{ fontSize: 12, color: '#5a3a0e', margin: 0 }}>
            Esta ação é irreversível. O seguinte será perdido:
          </p>
        </div>

        {/* What gets lost */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {items.map(({ icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 12px', borderRadius: 8,
              background: '#FAECE7', border: '1px solid #D85A3044',
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontSize: 12, color: '#7A1F1F' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* O que NÃO é perdido */}
        <div style={{
          padding: '8px 12px', borderRadius: 8, marginBottom: 16,
          background: '#EAF3DE', border: '1px solid #97C45944',
        }}>
          <p style={{ fontSize: 11, color: '#3B6D11', margin: 0 }}>
            ✓ Usuário e níveis do personagem são mantidos
          </p>
        </div>

        {/* Confirm by typing */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 6px' }}>
            Digite <strong>resetar</strong> para confirmar:
          </p>
          <input
            type="text"
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder="resetar"
            autoFocus
            style={{
              width: '100%', padding: '9px 12px', fontSize: 13,
              borderRadius: 8, border: `1px solid ${confirmed ? '#97C459' : '#c8a96e'}`,
              background: '#fffdf4', color: '#2c1a00',
              fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
            border: '1px solid #c8a96e', background: 'transparent',
            color: '#8B6914', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button
            onClick={onConfirm}
            disabled={!confirmed}
            style={{
              flex: 1, padding: '10px', fontSize: 13, borderRadius: 8,
              border: 'none', fontFamily: 'inherit', fontWeight: 600,
              cursor: confirmed ? 'pointer' : 'not-allowed',
              background: confirmed ? '#7A1F1F' : '#3a1010',
              color: confirmed ? '#faeae7' : '#8B6914',
              transition: 'all 0.15s',
            }}>
            Resetar tudo
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ConfigTab({ mode, modes, onChange, username, onRefresh, onChangeUser, onReset }) {
  const [refreshing,  setRefreshing]  = useState(false)
  const [msg,         setMsg]         = useState(null)
  const [showReset,   setShowReset]   = useState(false)

  async function handleRefresh() {
    setRefreshing(true)
    setMsg(null)
    const ok = await onRefresh()
    setMsg(ok ? '✓ Níveis atualizados!' : '✗ Erro ao buscar. Tente novamente.')
    setRefreshing(false)
    setTimeout(() => setMsg(null), 3000)
  }

  function handleConfirmReset() {
    setShowReset(false)
    onReset()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Player */}
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ fontSize: 11, color: '#8B6914', margin: '0 0 12px', letterSpacing: '0.06em' }}>
          PERSONAGEM
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
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
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem' }}>
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

      {/* Danger zone */}
      <div style={{ ...parch, borderRadius: 12, padding: '1.25rem', borderColor: '#D85A3066' }}>
        <p style={{ fontSize: 11, color: '#993C1D', margin: '0 0 10px', letterSpacing: '0.06em' }}>
          ZONA DE PERIGO
        </p>
        <p style={{ fontSize: 12, color: '#8B6914', margin: '0 0 12px' }}>
          Reseta todo o progresso do jogo — missões, hunts, coins e desbloqueios.
          O personagem é mantido.
        </p>
        <button onClick={() => setShowReset(true)}
          style={{
            width: '100%', padding: '10px', fontSize: 13, borderRadius: 8,
            border: '1px solid #D85A30', background: 'transparent',
            color: '#993C1D', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
          }}>
          🗑️ Resetar todo o progresso
        </button>
      </div>

      {showReset && (
        <ResetModal onConfirm={handleConfirmReset} onCancel={() => setShowReset(false)} />
      )}
    </div>
  )
}