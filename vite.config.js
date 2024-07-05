import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),

        // page 구현 시 연결할 html 파일
        // product: resolve(__dirname, 'src/pages/product/index.html'),
        // register: resolve(__dirname, 'src/pages/register/index.html'),
        // login: resolve(__dirname, 'src/pages/login/index.html'),
        // detail: resolve(__dirname, 'src/pages/detail/index.html'),
      },
    },
  },
});
