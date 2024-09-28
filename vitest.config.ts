import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      actions: resolve(__dirname, 'app/javascript/actions'),
      components: resolve(__dirname, 'app/javascript/components'),
      hooks: resolve(__dirname, 'app/javascript/hooks'),
      selectors: resolve(__dirname, 'app/javascript/selectors'),
      stores: resolve(__dirname, 'app/javascript/stores'),
      stylesheets: resolve(__dirname, 'app/javascript/stylesheets'),
      transformers: resolve(__dirname, 'app/javascript/transformers'),
      types: resolve(__dirname, 'app/javascript/types'),
      util: resolve(__dirname, 'app/javascript/util'),
    },
  },
})
