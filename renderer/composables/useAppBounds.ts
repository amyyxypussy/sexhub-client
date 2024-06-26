import variables from '@/style/variables.module.scss'

export function useAppBounds() {
  const navHeight = Number(variables.navbarHeight.match(/\d/g)?.join(''))
  const sideBarWidth = Number(variables.sideBarWidth.match(/\d/g)?.join(''))

  const windowBounding = useWindowSize()

  const width = computed(() => {
    return windowBounding.width.value - sideBarWidth
  })

  const height = computed(() => {
    return windowBounding.height.value - navHeight
  })

  return {
    width,
    height
  }
}
