import { OnEvent, SendEvent } from './ipc-event'
import { BrowserWindow, ipcMain } from 'electron'
import type { IpcMainEvent } from 'electron'
import { getSettingField, setSettingField } from '../store/setting'
import { Setting, SettingField } from '../../types/app-setting'
import { createHomeWindow } from '../windows/home'

ipcMain.on(OnEvent.OPEN_DEV_TOOL, (_event: IpcMainEvent) => {
  BrowserWindow.fromWebContents(_event.sender)?.webContents.openDevTools()
})

ipcMain.on(
  OnEvent.SET_SETTING_ITEM,
  <T extends keyof SettingField>(_event: IpcMainEvent, key: T, data: SettingField[T]) => {
    setSettingField(key, data)
    BrowserWindow.fromWebContents(_event.sender)?.webContents.send(
      SendEvent.ASYNC_SETTING_ITEM,
      key,
      data
    )
  }
)

ipcMain.on(OnEvent.INIT_SETTING_FIELD, (_event: IpcMainEvent) => {
  const window = BrowserWindow.fromWebContents(_event.sender)

  Object.entries(new Setting()).forEach(([key]) => {
    window?.webContents.send(
      SendEvent.ASYNC_SETTING_ITEM,
      key,
      getSettingField(key as keyof SettingField)
    )
  })
})

ipcMain.on(OnEvent.CLOSE_WINDOW, (_event: IpcMainEvent) => {
  BrowserWindow.fromWebContents(_event.sender)?.close()
})

ipcMain.on(OnEvent.MINI_WINDOW, (_event) => {
  BrowserWindow.fromWebContents(_event.sender)?.minimize()
})

ipcMain.on(OnEvent.LOGGED, (_event: IpcMainEvent, token: string) => {
  setSettingField('token', token)

  const home = createHomeWindow()

  home.once('show', () => {
    BrowserWindow.fromWebContents(_event.sender)?.destroy()
  })
})
