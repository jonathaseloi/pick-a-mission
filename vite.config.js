import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Troque 'osrs-mission-board' pelo nome exato do seu repositório no GitHub
  base: '/pick-a-mission/',
})