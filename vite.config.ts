import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import VitePluginSitemap from 'vite-plugin-sitemap'

import { ROUTES } from './src/router/utils'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://rocketshoes-sand.vercel.app/',
      // rotas estáticas
      exclude: [ROUTES.checkout],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
