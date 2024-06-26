import { useSideBarTitle } from '@/composables/useSideBarTitle'

export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'auth',
  order: 2,
  sidebarPosition: 'top',
  title: useSideBarTitle(() => (
    <>
      <div class="i-fluent:people-team-48-filled"></div>
      <span class="mt-1.5 text-xs">作者</span>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div class="text-red">cdccdscd作者</div>
})
