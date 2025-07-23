import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {

  const isProduction = mode === 'production'

  return {
    plugins: [react()],
    server: {
      host: 'localhost',
      port: 3001
    },
    preview: {
      host: 'localhost',
      port: 3001
    },
    build: {
      outDir: 'dist',
      sourcemap: isProduction ? false : true,
      minify: isProduction,
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash].[ext]'
        }
      }
    }
  }
})
