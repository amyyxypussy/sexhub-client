import type { Component } from 'vue'

export function useSideBarTitle(title: Component) {
  return defineComponent(() => {
    return () =>
      h('div', { class: 'no-drag mt-5 flex flex-col cursor-pointer items-center' }, h(title))
  })
}
