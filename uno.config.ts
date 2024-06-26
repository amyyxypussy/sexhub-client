// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

import themes from './renderer/util/themes'

export default defineConfig({
  theme: {
    colors: {
      primary: themes.colorPrimary,
      regular: 'rgba(0,0,0,0.9)',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0,0,0,0.4)'
    }
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        sh: FileSystemIconLoader('./renderer/assets/icons', (svg) =>
          svg.replace(/#fff/, 'currentColor')
        )
      }
    }),
    presetAttributify(),
    presetTypography(),
    presetWebFonts()
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'renderer/**/*.{js,ts}'
      ]
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
