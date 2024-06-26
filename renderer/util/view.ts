import type { RouteMeta } from 'vue-router'
import type { InjectionKey, DefineSetupFnComponent } from 'vue'

export type ViewModel = {
  beforeEnter?: () => Promise<void>
  beforeLeave?: () => Promise<void>
} & RouteMeta

export type SideBarModel = {
  routeName: string
  routePath: string
} & RouteMeta

export type ViewEntity = {
  meta: ViewModel
  default: DefineSetupFnComponent<any>
}

export const sidebarTop = Symbol() as InjectionKey<SideBarModel[]>
export const sidebarBottom = Symbol() as InjectionKey<SideBarModel[]>
export const viewRoutes = Symbol() as InjectionKey<SideBarModel[]>

export function defineViewMeta(meta: ViewModel) {
  return meta
}
