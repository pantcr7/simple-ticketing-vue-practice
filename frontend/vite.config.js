import { fileURLToPath, URL } from 'node:url'
import frappeui from "frappe-ui/vite";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    frappeui()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
          include: ["frappe-ui > feather-icons", "showdown", "engine.io-client"],
  },
})
