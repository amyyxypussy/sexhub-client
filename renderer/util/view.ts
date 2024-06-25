import { RouteMeta } from 'vue-router'
import { InjectionKey } from 'vue'

export type ViewModel = {
  default?: ViewModel
  mate?: RouteMeta
  beforeEnter?: () => Promise<void>
  beforeLeave?: () => Promise<void>
}

export type SideBarModel = {
  mate?: RouteMeta
  routeName: string
  routePath: string
}

export const sidebarTop = Symbol() as InjectionKey<SideBarModel[]>
export const sidebarBottom = Symbol() as InjectionKey<SideBarModel[]>
export const viewRoutes = Symbol() as InjectionKey<SideBarModel[]>
