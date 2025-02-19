import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:9080';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: apiBaseUrl, // ✅ env 파일 기반 설정
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
});
