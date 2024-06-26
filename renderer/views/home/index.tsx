import { useSideBarTitle } from '@/composables/useSideBarTitle'

export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'home',
  order: 1,
  sidebarPosition: 'top',
  title: useSideBarTitle(() => (
    <>
      <div class="i-solar:home-2-bold"></div>
      <span class="mt-1.5 text-xs">首页</span>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div class="text-red">cdcd</div>
})
