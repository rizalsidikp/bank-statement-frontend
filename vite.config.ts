/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // optional kalau kamu pakai
    coverage: {
      provider: 'v8', // penting untuk UI coverage
      reporter: ['text', 'html'], // bisa tambah 'lcov' kalau mau upload ke Codecov
      reportsDirectory: './coverage',
      enabled: true, // aktifkan coverage
    },
    ui: false, // 👈 aktifkan Vitest UI
  },
})
