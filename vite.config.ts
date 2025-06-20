import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        sourcemapExcludeSources: true,
        sourcemap: false,
      },
    },
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    manifest: true,
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    fs: {
      strict: true,
    },
  },
  define: {
    'process.env': process.env,
  },
});