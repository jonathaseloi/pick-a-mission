import MissionCard from './MissionCard.jsx'
import RewardReveal from './RewardReveal.jsx'
import { MISSIONS, CHAPTER_META, getChapterProgress } from '../data/missions.js'
import { Card, Button } from './ui/index.js'

export default function BoardTab({
  options, pickedId, dailyCard, isDailyPick,
  completed, missionStreak, pamCoins, rerollTokens,
  showReward, weeklyTheme,
  onPick, onAccept, onReroll, onSkip, onShowReward,
}) {
  const activeMission   = pickedId ? MISSIONS.find(m => m.id === pickedId) : null
  const dailyMission    = dailyCard ? MISSIONS.find(m => m.id === dailyCard.missionId) : null
  const recId           = options.length ? options.reduce((b, m) => (m.priority ?? 0) > (b.priority ?? 0) ? m : b).id : null
  const chapterProgress = getChapterProgress(completed)

  return (
    <Card>
      {/* Chapter progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1rem' }}>
        {[1,2,3,4,5,6].map(ch => {
          const p    = chapterProgress[ch]
          const meta = CHAPTER_META[ch]
          const done   = p.done === p.total && p.total > 0
          const active = !done && p.done > 0
          return (
            <div key={ch} title={`${meta.label}: ${p.done}/${p.total}`}
              style={{ flex: 1, height: 4, background: done ? meta.border : active ? `${meta.border}66` : '#3a2a0a' }} />
          )
        })}
      </div>

      {/* Weekly theme banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#1a1000', border: '1px solid #c8a96e',
        padding: '6px 12px', marginBottom: '1rem',
        fontSize: 11, color: '#c8a96e', fontFamily: 'system-ui',
      }}>
        <span style={{ fontSize: 14 }}>{weeklyTheme.emoji}</span>
        <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{weeklyTheme.label}</span>
        <span style={{ color: '#8a7050' }}>— missões de {weeklyTheme.label.replace(' Week','')} dão 2× moedas esta semana</span>
      </div>

      {!pickedId && (
        <>
          <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 1rem', textAlign: 'center' }}>
            Escolha uma missão — a recompensa é revelada ao concluir
          </p>
          {options.length === 0
            ? <p style={{ color: 'var(--c-muted)', fontSize: 13, textAlign: 'center' }}>
                Nenhuma missão disponível com seus desbloqueios atuais.
              </p>
            : <div style={{ display: 'flex', gap: 10 }}>
                {options.map(m => (
                  <MissionCard key={m.id} mission={m} state="idle"
                    recommended={m.id === recId}
                    isThemeMatch={weeklyTheme.categories.includes(m.category)}
                    onClick={() => onPick({ mission: m, isDaily: false })} />
                ))}
              </div>
          }

          {dailyMission && !dailyCard?.completed && !completed.has(dailyMission.id) && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: '#c8a96e', fontFamily: 'system-ui',
                  fontWeight: 700, letterSpacing: '0.08em' }}>
                  ⭐ MISSÃO DIÁRIA
                </span>
                <span style={{ fontSize: 10, color: '#8a7050', fontFamily: 'system-ui' }}>
                  +50% recompensa · muda à meia-noite
                </span>
              </div>
              <div style={{ border: '2px solid #c8a96e', boxShadow: '0 0 12px #c8a96e33' }}>
                <MissionCard mission={dailyMission} state="idle"
                  recommended={false} isDaily={true}
                  onClick={() => onPick({ mission: dailyMission, isDaily: true })} />
              </div>
            </div>
          )}

          {dailyCard?.completed && (
            <div style={{ marginTop: 14, padding: '8px 12px', background: '#1a2a10',
              border: '1px solid #97C459', fontSize: 11, color: '#97C459',
              fontFamily: 'system-ui', textAlign: 'center' }}>
              ✅ Missão diária concluída! Nova missão amanhã.
            </div>
          )}
        </>
      )}

      {pickedId && !showReward && activeMission && (
        <>
          <p style={{ fontSize: 12, color: 'var(--c-muted)', margin: '0 0 1rem', textAlign: 'center' }}>
            Complete a missão no jogo e volte aqui
          </p>
          {isDailyPick ? (
            <div style={{ marginBottom: '1rem', border: '2px solid #c8a96e', boxShadow: '0 0 12px #c8a96e33' }}>
              <MissionCard mission={activeMission} state="selected"
                recommended={false} isDaily={true} onClick={() => {}} />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginBottom: '1rem' }}>
              {options.map(m => (
                <MissionCard key={m.id} mission={m}
                  state={m.id === pickedId ? 'selected' : 'faded'}
                  recommended={false}
                  isThemeMatch={weeklyTheme.categories.includes(m.category)}
                  onClick={() => {}} />
              ))}
            </div>
          )}

          {(() => {
            const base  = activeMission.coins ?? 20
            const sk    = Math.floor(base * Math.min(missionStreak, 5) * 0.1)
            const wk    = weeklyTheme.categories.includes(activeMission.category) ? base : 0
            const dy    = isDailyPick && !dailyCard?.completed ? Math.floor(base * 0.5) : 0
            const total = base + sk + wk + dy
            if (total === base) return null
            return (
              <div style={{ marginBottom: 10, padding: '6px 12px', background: '#1a1000',
                border: '1px solid #6a4820', fontSize: 11, color: '#c8a96e',
                fontFamily: 'system-ui', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span>Base: {base}🪙</span>
                {sk > 0 && <span>🔥 Streak: +{sk}</span>}
                {wk > 0 && <span>{weeklyTheme.emoji} Tema: +{wk}</span>}
                {dy > 0 && <span>⭐ Diária: +{dy}</span>}
                <span style={{ fontWeight: 700 }}>= {total}🪙</span>
              </div>
            )
          })()}

          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={onShowReward} style={{ flex: 1, padding: 11 }}>
              Completei! Revelar recompensa
            </Button>
            {rerollTokens > 0 && (
              <Button variant="secondary" onClick={onReroll}
                title={`Usar 1 re-roll (${rerollTokens} disponíveis) — reseta streak`}
                style={{ padding: '11px 14px', border: '1px solid #c8a96e', color: '#c8a96e', whiteSpace: 'nowrap', fontWeight: 600 }}>
                Re-roll ({rerollTokens})
              </Button>
            )}
            <Button variant="secondary" onClick={onSkip} disabled={pamCoins < 15}
              title={pamCoins < 15 ? 'Precisa de 15 PAM Coins' : 'Pular missão (15 🪙) — reseta streak'}
              style={{ padding: '11px 14px', whiteSpace: 'nowrap', fontWeight: 600,
                color: pamCoins >= 15 ? 'var(--c-muted)' : '#4a3010' }}>
              Pular 15🪙
            </Button>
          </div>
        </>
      )}

      {pickedId && showReward && activeMission && (
        <RewardReveal mission={activeMission} onAccept={onAccept} />
      )}
    </Card>
  )
}
