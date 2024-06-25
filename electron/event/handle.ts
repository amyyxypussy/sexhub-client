import { HandleEvent, OnEvent } from './ipc-event'
import { BrowserWindow, dialog, ipcMain } from 'electron'
import createDialogWindow from '../windows/dialog'
import fs from 'node:fs'
import path from 'node:path'

ipcMain.handle(HandleEvent.OPEN_DIALOG, (_event, bounds, data) => {
  return new Promise((resolve) => {
    const parent = BrowserWindow.fromWebContents(_event.sender) as BrowserWindow
    createDialogWindow(parent, bounds, data)

    ipcMain.on(OnEvent.CLOSE_DIALOG, (event, res, { name }) => {
      BrowserWindow.fromWebContents(event.sender)?.close()
      if (data.name === name) resolve(res)
    })
  })
})

ipcMain.handle(HandleEvent.SELECT_IMAGE, (_event, args) => {
  return new Promise((resolve, reject) => {
    const result = dialog.showOpenDialogSync({
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
      ...args
    })
    if (result) {
      const path = result.map((p) => {
        return fs.readFileSync(p)
      })
      resolve(path)
    } else {
      reject()
    }
  })
})

ipcMain.handle(HandleEvent.SELECT_VIDEO, () => {
  return new Promise((resolve) => {
    const result = dialog.showOpenDialogSync({
      filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mpg'] }]
    })

    if (result) {
      const size = fs.statSync(result[0]).size

      resolve({
        path: result[0],
        size,
        ...path.parse(result[0])
      })
    }
  })
})
