const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.10'/%3E%3C/svg%3E\")"

export const parchment = {
  backgroundColor: 'var(--c-panel)',
  backgroundImage: NOISE,
  border: '2px solid var(--c-border)',
  boxShadow: '0 0 0 2px var(--c-accent), inset 2px 2px 0 var(--c-hi), inset -2px -2px 0 var(--c-accent)',
  borderRadius: 0,
}

export const btn = {
  background: 'var(--btn-bg)', color: 'var(--btn-fg)',
  border: '2px solid var(--btn-bd)',
  boxShadow: 'inset 2px 2px 0 #6a4820, inset -2px -2px 0 var(--btn-bd)',
  borderRadius: 0, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
}

export const DIFF = {
  easy:   { label: 'Fácil',   bg: '#3B6D11', light: '#EAF3DE', border: '#97C459', text: '#EAF3DE' },
  normal: { label: 'Médio',   bg: '#854F0B', light: '#FAEEDA', border: '#EF9F27', text: '#FAEEDA' },
  hard:   { label: 'Difícil', bg: '#7A1F1F', light: '#FAECE7', border: '#D85A30', text: '#FAECE7' },
}
