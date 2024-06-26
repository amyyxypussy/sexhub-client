import { Component } from 'vue'

/**
 * @description 扩展ruoter-meta的类型 此处必须要export {} 不然找不到类型
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: Component
    keepAlive?: boolean
    type?: 'view' | 'dialog'
    space?: string
    sidebarPosition?: 'top' | 'bottom'
    order?: number
    permission?: Array<string>
  }
}

export {}
