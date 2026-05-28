import { parchment } from '../../constants.js'

export default function Modal({ onClose, maxWidth = 380, padding = '1.5rem', style, overlayBg = 'rgba(0,0,0,0.65)', children }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: overlayBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          ...parchment, padding, maxWidth, width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          ...style,
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
