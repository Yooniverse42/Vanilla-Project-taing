import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.js', '.ts', '.jsx', 'tsx', '.scss'],
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),

        // page 구현 시 연결할 html 파일
        // register: resolve(__dirname, 'src/pages/register/index.html'),
        login: resolve(__dirname, 'src/pages/loginID/index.html'),
        // detail: resolve(__dirname, 'src/pages/detail/index.html'),
      },
    },
  },
});
