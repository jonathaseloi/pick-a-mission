import { parchment } from '../../constants.js'

export default function Card({ padding = '1.25rem', style, children }) {
  return (
    <div style={{ ...parchment, padding, ...style }}>
      {children}
    </div>
  )
}
