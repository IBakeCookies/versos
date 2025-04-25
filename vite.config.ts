import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss(), checker({ typescript: true })],
    resolve: {
        alias: {
            '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
            '@connection': fileURLToPath(new URL('./src/connection', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
            '@presentation': fileURLToPath(new URL('./src/presentation', import.meta.url)),
            '@component': fileURLToPath(new URL('./src/presentation/component', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
    },
});
