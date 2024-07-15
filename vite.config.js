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
        login: resolve(__dirname, 'src/pages/loginID/index.html'),
        findid: resolve(__dirname, 'src/pages/findId/index.html'),
        findpw: resolve(__dirname, 'src/pages/findPw/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        taing: resolve(__dirname, 'src/pages/taing/index.html'),

        // page 구현 시 연결할 html 파일
        // detail: resolve(__dirname, 'src/pages/detail/index.html'),
      },
    },
  },
});
