const SAVE_KEY = 'osrs_board_v2'

export function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  } catch {
    console.warn('Não foi possível salvar o progresso.')
  }
}