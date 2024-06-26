export const meta = defineViewMeta({
  type: 'view',
  keepAlive: true,
  space: 'transmission',
  order: 1,
  sidebarPosition: 'bottom',
  title: useSideBarTitle(() => (
    <>
      <div class="i-sh:upload"></div>
    </>
  ))
})

export default defineComponent(() => {
  return () => <div></div>
})
