export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'image',
  order: 4,
  sidebarPosition: 'top',
  title: useSideBarTitle(() => (
    <>
      <div class="i-sh:image"></div>
      <span class="mt-1.5 text-xs">图片</span>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div></div>
})
