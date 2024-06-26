import { Setting, type SettingField } from '../../types/app-setting'
import { type ComputedRef } from 'vue'

export const useSettingStore = defineStore('settingStore', () => {
  const setting = reactive(new Setting())

  const searching = ref<boolean>(false)
  const upperOrder = ref([1])
  const compoShow = ref(true)

  const showNavTab = computed(() => {
    return !searching.value && compoShow.value
  })

  window.electron.on(
    'async-setting-item',
    <T extends keyof SettingField>(key: T, data: SettingField[T]) => {
      setting[key] = data
    }
  )

  function init() {
    window.electron.send('init-setting-field')
  }

  function setSettingItem<T extends keyof SettingField>(key: T, data: SettingField[T]) {
    window.electron.send('set-setting-item', key, data)
  }

  function navTabWrapController(onTop: ComputedRef<boolean>) {
    const stop = watchEffect(function () {
      compoShow.value = onTop.value
    })

    onUnmounted(() => {
      compoShow.value = true
      stop()
    })
  }

  return {
    setting,
    init,
    setSettingItem,
    navTabWrapController,
    compoShow,
    searching,
    showNavTab,
    upperOrder
  }
})
