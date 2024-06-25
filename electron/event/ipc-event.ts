export enum OnEvent {
  OPEN_DEV_TOOL = 'open-dev-tool',
  CLOSE_WINDOW = 'close-window',
  MINI_WINDOW = 'mini-window',
  SET_SETTING_ITEM = 'set-setting-item',
  INIT_SETTING_FIELD = 'init-setting-field',

  LOGGED = 'user-logged',
  CLOSE_DIALOG = 'close-dialog'
}

export enum HandleEvent {
  OPEN_DIALOG = 'open-dialog',
  SELECT_IMAGE = 'select-image',
  SELECT_VIDEO = 'select-video'
}

export enum SendEvent {
  ASYNC_SETTING_ITEM = 'async-setting-item'
}

export type OnEventChannels = `${OnEvent}`

export type HandleEventChannels = `${HandleEvent}`

export type SendEventChannels = `${SendEvent}`
