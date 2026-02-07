import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // plain Node environment
    include: ['app/tests/unit/**/*.ts'],

  },
})