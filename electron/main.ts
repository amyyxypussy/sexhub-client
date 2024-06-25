import { app, BrowserWindow } from 'electron'
import { createLoginWindow } from './windows/login'

import './event/index'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

if (require('electron-squirrel-startup')) {
  app.quit()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const createWindow = () => {
  createLoginWindow()
}

app.on('ready', createWindow)
