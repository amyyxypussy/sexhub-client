<script setup lang="ts">
import UsernamePassword from '@/views/login/components/UsernamePassword.vue'
import EmailVerifyCode from '@/views/login/components/EmailVerifyCode.vue'
import { useSettingStore } from '@/store/setting'
import { login } from '@/apis/user'
import { encrypt } from '@/util/rsa-encrypt'
import { message } from 'ant-design-vue'
import { UserField } from '../../../types/app-setting'

defineOptions({
  name: 'LoginPage'
})

const settingStore = useSettingStore()

const activeTab = ref('UsernamePassword')
const navTabs = [
  {
    label: '账号密码登录',
    value: 'UsernamePassword'
  }
  // {
  //   label: '邮箱验证登录',
  //   value: 'EmailVerifyCode'
  // }
]

const userForm = reactive({
  username: '',
  password: '',
  email: '',
  verifyCode: ''
})

const loading = ref(false)

function miniWindow() {
  window.electron.send('mini-window')
}

function closeWindow() {
  window.electron.send('close-window')
}

async function usernameLogin() {
  if (!userForm.username) {
    message.error('用户名不能为空')
    return
  } else if (!userForm.password) {
    message.error('用户密码不能为空')
    return
  }

  loading.value = true

  try {
    const token = await login({
      username: userForm.username,
      password: encrypt(userForm.password)
    })

    const user: UserField = {
      username: userForm.username,
      password: userForm.password,
      leastLoginDate: new Date().getTime()
    }

    const arr = settingStore.setting.userArray.filter((item) => item.username !== userForm.username)
    arr.unshift(user)

    settingStore.setSettingItem('userArray', arr)

    window.electron.send('user-logged', token)
  } catch (e) {
    loading.value = false
  }
}

function emailLogin() {}

function setAutoLogin(check: boolean) {
  if (check) {
    settingStore.setSettingItem('rememberMe', true)
  }

  settingStore.setSettingItem('autoLogin', check)
}

function setRememberMe(check: boolean) {
  if (!check) {
    settingStore.setSettingItem('autoLogin', false)
  }
  settingStore.setSettingItem('rememberMe', check)
}

setTimeout(() => {
  if (settingStore.setting.autoLogin) {
    if (activeTab.value === 'UsernamePassword') {
      usernameLogin()
    }
  }
}, 1000)
</script>

<template>
  <div class="h-full w-full">
    <div class="drag absolute top-0 h-12 w-full flex items-center justify-end px-3">
      <div class="no-drag opt-icon mr-4" @click="miniWindow">
        <div class="i-ant-design:minus-outlined text-[19px]"></div>
      </div>
      <div class="no-drag opt-icon" @click="closeWindow">
        <div class="i-ant-design:close-outlined text-[19px]"></div>
      </div>
    </div>

    <div class="mt-10 w-full flex items-center px-6">
      <span class="text-[19px]">WELCOME SEXHUB</span>
    </div>

    <div class="mt-2 px-2">
      <Tabs
        v-model="activeTab"
        :tabs="navTabs"
        class="no-drag"
        slider-cls="w-9 mb-2"
        tab-cls="text-[13px]"
      ></Tabs>
    </div>

    <div class="mt-1 px-6">
      <a-form layout="vertical" :disabled="loading">
        <username-password
          v-model:password="userForm.password"
          v-model:username="userForm.username"
          v-if="activeTab === 'UsernamePassword'"
        ></username-password>

        <email-verify-code
          v-else
          v-model="userForm.email"
          v-model:verify-code="userForm.verifyCode"
        ></email-verify-code>

        <a-form-item class="mb-4">
          <div class="flex items-center">
            <a-checkbox
              v-if="activeTab === 'UsernamePassword'"
              :checked="settingStore.setting.rememberMe"
              @change="({ target }) => setRememberMe(target.checked)"
              >记住密码
            </a-checkbox>

            <a-checkbox
              :checked="settingStore.setting.autoLogin"
              @change="({ target }) => setAutoLogin(target.checked)"
              >自动登录
            </a-checkbox>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            :loading="loading"
            :disabled="false"
            class="w-full"
            type="primary"
            size="large"
            @click="activeTab === 'UsernamePassword' ? usernameLogin() : emailLogin()"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped></style>
