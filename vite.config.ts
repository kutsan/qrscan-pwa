import { defineConfig } from 'vite'

import preactRefresh from '@prefresh/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { minifyHtml } from 'vite-plugin-html'

export default defineConfig(() => {
  const base = process.env.BASE_PATH || '/'

  return {
    base,
    root: './src',
    server: {
      https: true // MediaDevices API requires a secure connection.
    },
    build: {
      outDir: '../dist',
      assetsDir: './',
      emptyOutDir: true
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import { h, Fragment } from 'preact'`
    },
    resolve: {
      alias: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom', replacement: 'preact/compat' }
      ]
    },
    plugins: [
      preactRefresh(),
      minifyHtml(),
      VitePWA({
        manifest: {
          name: 'QR Scan',
          short_name: 'QR Scan',
          description:
            'A simple offline QR code scanner as a progressive web application, works offline, no ads, no trackers, free & open-source.',
          icons: [
            {
              src: `${base}logo-192x192.png`,
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: `${base}logo-512x512.png`,
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          background_color: '#000000',
          start_url: base,
          display: 'standalone',
          scope: base,
          theme_color: '#000000'
        }
      })
    ]
  }
})
