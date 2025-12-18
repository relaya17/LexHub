import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lexhub/types': path.resolve(__dirname, '../../packages/types/src'),
      '@lexhub/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
      '@lexhub/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: {
    port: 3019,
    strictPort: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

