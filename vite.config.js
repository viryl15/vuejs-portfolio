import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: command === 'build' ? '/vuejs-portfolio/' : '/',
  preview: {
    port: 4173,
    host: true
  },
  css: {
    preprocessorOptions: {
      scss: {
  additionalData: `@use "sass:map";@use "sass:color";@use "@/styles/constants.scss" as *;\n`
  ,
  silenceDeprecations: ["legacy-js-api"]
      }
    }
  }
}))
