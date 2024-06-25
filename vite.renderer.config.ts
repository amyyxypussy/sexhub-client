import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { pluginExposeRenderer } from './vite.base.config'
import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import devtools from 'vite-plugin-vue-devtools'

import autoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'html', 'index.html'),
          login: path.resolve(__dirname, 'html', 'login.html'),
          dialog: path.resolve(__dirname, 'html', 'dialog.html'),
          floatWindow: path.resolve(__dirname, 'html', 'floating-window.html')
        }
      }
    },
    plugins: [
      pluginExposeRenderer(name),
      vueJsxPlugin(),
      vue(),
      devtools(),
      autoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        dts: './types/auto-import.d.ts',
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        imports: ['vue', 'vue-router', '@vueuse/core']
      })
    ],
    resolve: {
      preserveSymlinks: true
    },
    clearScreen: false
  } as UserConfig
})
