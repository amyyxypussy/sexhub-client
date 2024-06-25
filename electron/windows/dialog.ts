import { BrowserWindow, Rectangle } from 'electron'
import { entryUrl, windowCommonProps } from '../util/window'

export let dialogWindow: InstanceType<typeof BrowserWindow> | null

type Bounds = {
  width: number
  height: number
}

export default function createDialogWindow(
  parent: BrowserWindow,
  { width, height }: Bounds,
  data: Record<string, any>
) {
  const bounds = parent?.getBounds() as Rectangle

  const x = bounds.x + parent.getBounds().width / 2 - width / 2
  const y = bounds.y + parent.getBounds().height / 2 - height / 2

  dialogWindow = new BrowserWindow({
    ...windowCommonProps,
    width,
    height,
    x,
    y,
    parent,
    modal: true
  })

  dialogWindow.loadURL(entryUrl('dialog') + `?name=${data.name}`).then()

  dialogWindow.once('ready-to-show', dialogWindow.show)

  return dialogWindow
}
