import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Figma Make 导出的组件会以 `figma:asset/<hash>.png` 形式 import 占位图。
// 与 Freshman 一致：用一个灰色占位 data-URI 解析这些虚拟模块。
const FIGMA_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNEOUQ5RDkiLz48L3N2Zz4='

function figmaAssetPlugin() {
  return {
    name: 'vite-plugin-figma-asset',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return '\0' + id
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        return `export default ${JSON.stringify(FIGMA_PLACEHOLDER)}`
      }
      return null
    },
  }
}

export default defineConfig({
  base: '/alva-infant/',
  plugins: [figmaAssetPlugin(), react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: '127.0.0.1',
  },
})
