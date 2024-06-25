import Store from 'electron-store'
import { Setting, SettingField } from '../../types/app-setting'

const store = new Store<SettingField>({ name: 'app-setting' })
const defaultSetting = new Setting()

export function getSettingField<T extends keyof SettingField>(key: T): SettingField[T] {
  return store.get(key) || defaultSetting[key]
}

export function setSettingField<T extends keyof SettingField>(key: T, data: SettingField[T]) {
  store.set(key, data)
}
