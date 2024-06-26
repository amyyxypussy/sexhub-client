<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { useSettingStore } from '@/store/setting'

const settingStore = useSettingStore()

defineOptions({
  name: 'UsernamePassword'
})

const username = defineModel('username')
const password = defineModel('password')

const showPassword = ref(false)

const options = computed(() => {
  return settingStore.setting.userArray.map((item) => ({
    value: item.username,
    text: item.password
  }))
})

function onSelect(value: string) {
  const user = settingStore.setting.userArray.find((item) => item.username === value)
  password.value = user.password
}

watchEffect(function () {
  if (settingStore.setting.userArray[0] && !username.value) {
    username.value = settingStore.setting.userArray[0].username
    onSelect(settingStore.setting.userArray[0].username)
  }
})
</script>

<template>
  <a-form-item class="mb-2">
    <span text-xs>用户名</span>
    <a-auto-complete size="large" v-model:value="username" :options="options" @select="onSelect">
    </a-auto-complete>
  </a-form-item>

  <a-form-item class="mb-2">
    <span text-xs>密码</span>
    <a-input size="large" v-model:value="password" :type="showPassword ? 'text' : 'password'">
      <template #suffix>
        <div class="cursor-pointer" @click="showPassword = !showPassword">
          <EyeOutlined v-if="showPassword" />
          <EyeInvisibleOutlined v-else />
        </div>
      </template>
    </a-input>
  </a-form-item>
</template>
