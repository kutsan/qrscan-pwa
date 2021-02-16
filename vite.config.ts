import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'
import { minifyHtml } from 'vite-plugin-html'

export default defineConfig({
  root: './src',
  server: {
    https: true,
    host: '0.0.0.0',
  },
  build: {
    outDir: '../dist',
    assetsDir: './',
    emptyOutDir: true,
  },
  plugins: [
    reactRefresh(),
    minifyHtml(),
    VitePWA({
      manifest: {
        name: 'QR Scan',
        short_name: 'QR Scan',
        description:
          'A simple offline QR code scanner as a progressive web application, works offline, no ads, no trackers, free & open-source.',
        icons: [
          {
            src: '/logo.svg',
            sizes: '512x512',
          },
        ],
        background_color: '#000000',
        start_url: '/source=pwa',
        display: 'standalone',
        scope: '/',
        theme_color: '#000000',
      },
    }),
  ],
})
