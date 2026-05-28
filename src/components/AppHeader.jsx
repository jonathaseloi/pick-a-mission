import { Card } from './ui/index.js'

export default function AppHeader({ username, combatLevel, completedCount, missionStreak, pamCoins, rerollTokens }) {
  return (
    <Card padding="1rem 1.5rem" style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 2px', color: 'var(--c-text)' }}>
          Pick a Mission
        </h1>
        <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          {username} · CB {combatLevel} · {completedCount} missões
          {missionStreak >= 2 && (
            <span style={{ fontSize: 11, background: '#3a1a00', border: '1px solid #c8692a',
              color: '#f5a060', padding: '1px 7px', fontFamily: 'system-ui', fontWeight: 700 }}>
              🔥 {missionStreak}
            </span>
          )}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--c-text)', borderRadius: 8, padding: '4px 12px' }}>
          <span style={{ fontSize: 20 }}>🪙</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#f5d78e', fontFamily: 'system-ui, sans-serif' }}>
            {pamCoins.toLocaleString()}
          </span>
          <span style={{ fontSize: 13, color: 'var(--c-muted)' }}>PAM</span>
        </div>
        {rerollTokens > 0 && (
          <div style={{ fontSize: 11, color: 'var(--c-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#c8a96e', fontWeight: 600 }}>{rerollTokens}</span>
            <span>re-roll{rerollTokens !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </Card>
  )
}
