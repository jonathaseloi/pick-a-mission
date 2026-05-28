import { Modal, Button } from './ui/index.js'

export default function TierUnlockModal({ notifications, onClose }) {
  if (!notifications?.length) return null

  return (
    <Modal onClose={onClose} overlayBg="rgba(139, 105, 20, 0.25)" padding="1.75rem 1.5rem"
      style={{ textAlign: 'center', boxShadow: '0 8px 32px rgba(44, 26, 0, 0.2)' }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--c-text)', margin: '0 0 2px' }}>
        Novo Tier Desbloqueado!
      </h2>

      {notifications.map((notif, i) => (
        <div key={i}>
          <p style={{ fontSize: 13, color: 'var(--c-muted)', margin: '10px 0 14px' }}>
            <strong>{notif.tierLabel}</strong> · {notif.monsters.length} monstro{notif.monsters.length > 1 ? 's' : ''} liberado{notif.monsters.length > 1 ? 's' : ''} na sua coleção
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            {notif.monsters.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 12,
                  border: '2px solid var(--c-accent)', background: 'var(--c-mid)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={m.img} alt={m.name}
                    style={{ width: 62, height: 62, objectFit: 'contain', imageRendering: 'pixelated' }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--c-text)', fontWeight: 600, maxWidth: 80, lineHeight: 1.3 }}>
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p style={{ fontSize: 10, color: 'var(--c-muted)', margin: '12px 0 16px', fontStyle: 'italic' }}>
        Acesse a aba Hunt para começar a caçar
      </p>

      <Button onClick={onClose} style={{ padding: '10px 36px' }}>
        Boa caçada!
      </Button>
    </Modal>
  )
}
