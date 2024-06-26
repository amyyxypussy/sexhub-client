import appBuilder from '@/util/app-builder'
import Login from '@/views/login/index.vue'

appBuilder(
  defineComponent({
    setup() {
      const settingStore = useSettingStore()

      settingStore.init()

      return () => h(Login)
    }
  })
).mount('#app')
