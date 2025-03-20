import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'esnext',
        outDir: 'dist',
    },
    server: {
        open: false,
        port: 8000,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    }
})
