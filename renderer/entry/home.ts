import appBuilder from '@/util/app-builder'
import { createRouter, createWebHashHistory, type RouteRecordRaw, RouterView } from 'vue-router'
import Layout from '@/layout/index.vue'

async function init() {
  const routes: RouteRecordRaw[] = []
  const topMenuMeta: SideBarModel[] = []
  const bottomMenuMeta: SideBarModel[] = []

  const keepAliveView: SideBarModel[] = []

  const viewModules = import.meta.glob<ViewEntity>('@/views/**/*.tsx')

  for (const [id, fn] of Object.entries(viewModules)) {
    const modules = await fn()

    const meta = modules.meta

    if (modules.meta.type === 'view') {
      const viewPath = id.split('/')[3]
      const viewName = pascalCaseToCamelCase(viewPath)

      // @ts-ignore
      const vm: SideBarModel = {
        ...meta,
        viewPath,
        viewName
      }

      if (meta.keepAlive) keepAliveView.push(vm)

      if (meta.sidebarPosition) {
        meta.sidebarPosition === 'top' ? topMenuMeta.push(vm) : bottomMenuMeta.push(vm)
      }

      routes.push({
        path: `/${viewPath}`,
        name: viewName,
        component: modules.default,
        meta
      })
    }
  }

  const router = createRouter({
    routes: [
      {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        children: routes
      }
    ],
    history: createWebHashHistory()
  })

  const app = appBuilder(
    defineComponent(() => {
      provide(viewRoutes, keepAliveView)

      provide(
        sidebarTop,
        topMenuMeta.sort((a, b) => (a.order || 0) - (b.order || 0))
      )
      provide(
        sidebarBottom,
        bottomMenuMeta.sort((a, b) => (a.order || 0) - (b.order || 0))
      )

      return () => h(RouterView)
    })
  )

  app.use(router)

  app.mount('#app')
}

init().then()
