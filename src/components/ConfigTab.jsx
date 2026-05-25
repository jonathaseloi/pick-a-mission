import { useState, Fragment } from 'react'
import { parchment } from '../constants.js'

const parch = parchment

function ResetModal({ onConfirm, onCancel }) {
  const [typed, setTyped] = useState('')
  const confirmed = typed.trim().toLowerCase() === 'resetar'

  const items = [
    'PAM Coins — zerados',
    'Missões concluídas — apagadas',
    'Desbloqueios de skills e itens — perdidos',
    'Hunt ativo — cancelado',
    'Monstros desbloqueados — removidos',
    'Histórico de missões e hunts — apagado',
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }}>
      <div style={{ ...parch, padding: '1.5rem', maxWidth: 400, width: '100%',
        boxShadow: '0 0 40px rgba(216,90,48,0.2), 0 20px 60px rgba(0,0,0,0.5)' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#7A1F1F', margin: '0 0 4px' }}>
          Resetar tudo?
        </p>
        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 14px', fontFamily: 'system-ui' }}>
          Esta ação é irreversível. O seguinte será perdido:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
          {items.map(label => (
            <div key={label} style={{
              fontSize: 12, color: '#7A1F1F', fontFamily: 'system-ui',
              padding: '5px 10px', background: 'var(--c-mid)', border: '1px solid #D85A3044',
            }}>{label}</div>
          ))}
        </div>

        <div style={{ padding: '6px 10px', background: 'var(--c-mid)', border: '1px solid var(--c-accent)',
          marginBottom: 14 }}>
          <p style={{ fontSize: 11, color: '#3B6D11', margin: 0, fontFamily: 'system-ui' }}>
            Usuario e niveis do personagem sao mantidos
          </p>
        </div>

        <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 6px', fontFamily: 'system-ui' }}>
          Digite <strong>resetar</strong> para confirmar:
        </p>
        <input
          type="text"
          value={typed}
          onChange={e => setTyped(e.target.value)}
          placeholder="resetar"
          autoFocus
          style={{
            width: '100%', padding: '9px 12px', fontSize: 13, marginBottom: 14,
            borderRadius: 0, border: `1px solid ${confirmed ? '#97C459' : 'var(--c-accent)'}`,
            background: 'var(--c-panel)', color: 'var(--c-text)',
            fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
          }}
        />

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: '1px solid var(--c-accent)', background: 'transparent',
            color: 'var(--c-muted)', fontFamily: 'inherit', cursor: 'pointer',
          }}>Cancelar</button>
          <button onClick={onConfirm} disabled={!confirmed} style={{
            flex: 1, padding: '10px', fontSize: 13, borderRadius: 0,
            border: 'none', fontFamily: 'inherit', fontWeight: 600,
            cursor: confirmed ? 'pointer' : 'not-allowed',
            background: confirmed ? '#7A1F1F' : 'var(--c-mid)',
            color: confirmed ? '#faeae7' : 'var(--c-muted)',
          }}>
            Resetar tudo
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ConfigTab({ username, onRefresh, onChangeUser, onReset }) {
  const [refreshing, setRefreshing] = useState(false)
  const [msg,        setMsg]        = useState(null)
  const [showReset,  setShowReset]  = useState(false)
  const [section,    setSection]    = useState('player')

  const SECTIONS = [
    { id: 'player', label: 'Personagem' },
    { id: 'danger', label: 'Zona de Perigo' },
  ]

  async function handleRefresh() {
    setRefreshing(true)
    setMsg(null)
    const ok = await onRefresh()
    setMsg(ok ? 'Niveis atualizados!' : 'Erro ao buscar. Tente novamente.')
    setRefreshing(false)
    setTimeout(() => setMsg(null), 3000)
  }

  function handleConfirmReset() {
    setShowReset(false)
    onReset()
  }

  return (
    <>
      <div style={{ ...parch, padding: 0, overflow: 'hidden' }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-accent)', borderBottom: '2px solid var(--c-border)' }}>
          {SECTIONS.map((s, i) => (
            <Fragment key={s.id}>
              {i > 0 && <span style={{ color: 'var(--c-mid)', fontSize: 16, alignSelf: 'center', userSelect: 'none', flexShrink: 0 }}>|</span>}
              <button onClick={() => setSection(s.id)} style={{
                padding: '8px 16px', fontSize: 11, border: 'none', borderRadius: 0,
                fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap',
                background: section === s.id ? 'var(--c-panel)' : 'transparent',
                color: section === s.id ? 'var(--c-text)' : 'var(--c-panel)',
                fontWeight: section === s.id ? 700 : 400,
              }}>{s.label}</button>
            </Fragment>
          ))}
        </div>

        <div style={{ padding: '1.25rem' }}>
          {section === 'player' && (
            <>
              <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: '0 0 12px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
                PERSONAGEM
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', margin: '0 0 2px' }}>{username}</p>
                  <p style={{ fontSize: 11, color: 'var(--c-muted)', margin: 0, fontFamily: 'system-ui' }}>Ironman</p>
                </div>
                <button onClick={handleRefresh} disabled={refreshing}
                  style={{ padding: '7px 14px', fontSize: 12, borderRadius: 0,
                    cursor: refreshing ? 'default' : 'pointer', fontFamily: 'inherit',
                    border: '2px solid var(--btn-bd)', background: 'var(--btn-bg)', color: 'var(--btn-fg)',
                    fontWeight: 600, boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)' }}>
                  {refreshing ? 'Atualizando...' : 'Atualizar niveis'}
                </button>
              </div>
              {msg && (
                <p style={{ fontSize: 12, margin: '0 0 10px', padding: '6px 10px', fontFamily: 'system-ui',
                  background: msg.includes('Erro') ? 'var(--c-mid)' : 'var(--c-mid)',
                  color: msg.includes('Erro') ? '#993C1D' : '#3B6D11',
                  border: `1px solid ${msg.includes('Erro') ? '#D85A30' : '#97C459'}` }}>
                  {msg}
                </p>
              )}
              <button onClick={onChangeUser}
                style={{ fontSize: 11, color: '#993C1D', background: 'transparent',
                  border: '1px solid #D85A3066', padding: '5px 12px', borderRadius: 0,
                  cursor: 'pointer', fontFamily: 'inherit' }}>
                Trocar de usuario (reseta progresso)
              </button>
            </>
          )}

          {section === 'danger' && (
            <>
              <p style={{ fontSize: 11, color: '#993C1D', margin: '0 0 10px', letterSpacing: '0.06em', fontFamily: 'system-ui' }}>
                ZONA DE PERIGO
              </p>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 14px', fontFamily: 'system-ui' }}>
                Reseta todo o progresso — missoes, hunts, coins e desboqueios. O personagem e mantido.
              </p>
              <button onClick={() => setShowReset(true)}
                style={{
                  width: '100%', padding: '10px', fontSize: 13, borderRadius: 0,
                  border: '1px solid #D85A30', background: 'transparent',
                  color: '#993C1D', fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                }}>
                Resetar todo o progresso
              </button>
            </>
          )}
        </div>
      </div>

      {showReset && <ResetModal onConfirm={handleConfirmReset} onCancel={() => setShowReset(false)} />}
    </>
  )
}
