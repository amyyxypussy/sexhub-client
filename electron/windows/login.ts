import { BrowserWindow } from 'electron'
import { entryUrl, windowCommonProps } from '../util/window'

export let loginWindow: InstanceType<typeof BrowserWindow> | null

export function createLoginWindow() {
  loginWindow = new BrowserWindow({
    ...windowCommonProps,
    width: 460,
    height: 388
  })

  loginWindow.loadURL(entryUrl('login')).then()

  loginWindow.once('ready-to-show', () => {
    loginWindow?.webContents.openDevTools()
    loginWindow?.show()
  })

  return loginWindow
}
