export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'video',
  order: 3,
  sidebarPosition: 'top',
  title: useSideBarTitle(() => (
    <>
      <div class="i-sh:video"></div>
      <span class="mt-1.5 text-xs">视频</span>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div></div>
})
