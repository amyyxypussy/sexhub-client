import { BrowserWindow } from 'electron'
import { entryUrl, windowCommonProps } from '../util/window'

export let homeWindow: InstanceType<typeof BrowserWindow> | null

export function createHomeWindow() {
  homeWindow = new BrowserWindow({
    ...windowCommonProps,
    width: 1050,
    height: 680
  })

  homeWindow.loadURL(entryUrl('index')).then()

  homeWindow.once('ready-to-show', () => {
    homeWindow?.show()
    homeWindow?.webContents.openDevTools()
  })

  return homeWindow
}
