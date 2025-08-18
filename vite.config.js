import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/vuejs-portfolio/' : '/',
  css: {
    preprocessorOptions: {
      scss: {
  additionalData: `@use "sass:map";@use "sass:color";@use "@/styles/constants.scss" as *;\n`
  ,
  silenceDeprecations: ["legacy-js-api"]
      }
    }
  }
})
