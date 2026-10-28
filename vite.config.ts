import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// `ANALYZE=true npm run build` writes a treemap of the bundle to dist/stats.html
const analyze = process.env.ANALYZE === 'true'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    analyze &&
      visualizer({ filename: 'dist/stats.html', gzipSize: true, open: true }),
  ],
  build: {
    rolldownOptions: {
      output: {
        // Libraries change far less often than app code, so give them their own
        // long-cached chunks instead of re-shipping them with every deploy.
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'vendor-router',
              test: /node_modules[\\/]@tanstack[\\/](react-router|router-core|history|store|react-store)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-state',
              test: /node_modules[\\/](@reduxjs|react-redux|redux|immer|reselect)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-i18n',
              test: /node_modules[\\/](i18next|react-i18next|i18next-[^\\/]+)[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor-charts',
              test: /node_modules[\\/](recharts|d3-[^\\/]+|victory-vendor)[\\/]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})

export default config
