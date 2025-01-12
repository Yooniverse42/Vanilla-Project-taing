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
        findpw: resolve(__dirname, 'src/pages/findpw/index.html'),
        register: resolve(__dirname, 'src/pages/register/index.html'),
        taing: resolve(__dirname, 'src/pages/taing/index.html'),
        profile_select: resolve(
          __dirname,
          'src/pages/profile/profile_select/index.html'
        ),
        profile_edit: resolve(
          __dirname,
          'src/pages/profile/profile_edit/index.html'
        ),
        profile_edit_detail: resolve(
          __dirname,
          '/src/pages/profile/profile_edit_detail/index.html'
        ),
        profile_create: resolve(
          __dirname,
          '/src/pages/profile/profile_create/index.html'
        ),
        search: resolve(__dirname, '/src/pages/taing/search/index.html'),
        // page 구현 시 연결할 html 파일
        // detail: resolve(__dirname, 'src/pages/detail/index.html'),
      },
    },
  },
});
