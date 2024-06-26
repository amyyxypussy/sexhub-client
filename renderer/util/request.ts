import HttpRequest, { type ResponseData, ResultStatus } from '../../types/http-request'
import { message as aMsg } from 'ant-design-vue'
import { useSettingStore } from '@/store/setting'

const request = new HttpRequest(function () {
  const settingStore = useSettingStore()
  return settingStore.setting.token as string
})

request.instance.interceptors.response.use(
  (response) => {
    const { status, message, data } = response.data as ResponseData

    if (status === ResultStatus.ERROR) {
      aMsg.error(message).then()
      throw new Error(message)
    } else if (status === ResultStatus.WARNING) {
      aMsg.warning(message).then()
      return data
    } else {
      if (message) {
        aMsg.success(message).then()
      }

      return data
    }
  },
  (error) => {
    aMsg.error(error.message).then()
    return Promise.reject(error)
  }
)

export default request
