import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
// @ts-ignore
import { pluginExposeRenderer, getEnvDefine } from './vite.base.config'
import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import devtools from 'vite-plugin-vue-devtools'

import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config
export default defineConfig((env) => {
  // @ts-ignore
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
      UnoCSS(),
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
        dirs: ['./renderer/store/*.ts', './renderer/composables/*.ts', './renderer/util/*.ts'],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true
          },
          {
            from: './renderer/util/view.ts',
            imports: ['ViewModel', 'SideBarModel', 'ViewEntity'],
            type: true
          }
        ]
      }),
      Components({
        dirs: ['./renderer/components'],
        dts: './types/components.d.ts',
        extensions: ['vue', 'tsx'],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      })
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': path.resolve(__dirname, "renderer")
      }
    },
    // define: getEnvDefine(env),
    clearScreen: false
  } as UserConfig
})
