import path from 'node:path'

export const windowCommonProps = {
  frame: false,
  show: false,
  resizable: false,
  fullscreenable: false,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
}

const devEntryUrl = (htmlFile: string) => `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/html/${htmlFile}.html`

const buildEntryUrl = (htmlFile: string) =>
  path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/html/${htmlFile}.html`)

export const entryUrl = (htmlFileName: string) =>
  MAIN_WINDOW_VITE_DEV_SERVER_URL ? devEntryUrl(htmlFileName) : buildEntryUrl(htmlFileName)
