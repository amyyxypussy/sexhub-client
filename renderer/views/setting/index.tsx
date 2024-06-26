export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'setting',
  order: 2,
  sidebarPosition: 'bottom',
  title: useSideBarTitle(() => (
    <>
      <div class="i-material-symbols:settings-outline-rounded"></div>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div></div>
})
