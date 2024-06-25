import { createApp, defineComponent, Suspense } from 'vue'
import type { Component } from 'vue'
import { ConfigProvider, theme } from 'ant-design-vue'
import '@/style/index.scss'
import 'virtual:uno.css'
import themes from './themes'

export default function appBuilder(root: Component) {
  const app = createApp(
    defineComponent({
      setup() {
        document.onkeydown = function (e) {
          if (e.key === 'F12') {
            window.electron.send('open-dev-tool')
          }
        }

        return () =>
          h(
            ConfigProvider,
            { theme: { algorithm: theme.defaultAlgorithm } },
            {
              default: () =>
                h(
                  ConfigProvider,
                  { theme: { token: themes } },
                  { default: () => h(Suspense, {}, { default: () => h(root) }) }
                )
            }
          )
      }
    })
  )

  app.use(createPinia())

  return app
}
