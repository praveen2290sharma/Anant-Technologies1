
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // Providing a basic process object to avoid crashes in libraries that expect it
    'process.env': JSON.stringify({ NODE_ENV: 'production' })
  },
  server: {
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
