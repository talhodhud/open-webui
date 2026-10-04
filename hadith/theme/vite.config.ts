import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
  plugins: [svelte()],
  build: { lib: { entry: 'src/main.ts', name: 'HadithTheme', formats: ['es'], fileName: () => 'hadith-theme.js' }, cssCodeSplit: false },
  server: { proxy: { '/api': 'http://127.0.0.1:8770' } }
});
