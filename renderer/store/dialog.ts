import { base64toBlob } from '@/util/helper'
import { VideoLocal } from '@/apis/video'

export type DialogData = {
  name?: string
  aspectRatio?: number
  cropUrl?: string
  upperID?: string
  video?: VideoLocal
}

export const useDialogStore = defineStore('dialogStore', () => {
  const title = ref('')
  const currentName = ref('')

  const dialogData = useStorage<Record<string, DialogData>>('dialog-setting', {})

  const data = computed(() => dialogData.value[currentName.value])

  function openDialog<T>(
    name: string,
    bounds: { width: number; height: number },
    data: DialogData = {}
  ) {
    data.name = name
    dialogData.value[name] = data

    return window.electron.invoke<T>('open-dialog', bounds, data)
  }

  function selectSingleImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        window.electron.invoke<BlobPart[]>('select-image').then((res) => {
          const reader = new FileReader()
          reader.readAsDataURL(new Blob(res))

          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  function openImageCropDialog(url: string, aspectRatio: number) {
    return new Promise<{ url: string; blob: Blob }>((resolve, reject) => {
      openDialog<{ result?: string }>(
        'image-cropper',
        { width: 600, height: 460 },
        { aspectRatio, cropUrl: url }
      ).then((result) => {
        if (!result) {
          reject()
        } else {
          resolve({
            url: result as string,
            blob: base64toBlob(result as string)
          })
        }
      })
    })
  }

  function closeWindow(data: any = undefined) {
    delete dialogData.value[currentName.value]
    window.electron.send('close-dialog', data, { name: currentName.value })
  }

  return {
    openDialog,
    openImageCropDialog,
    selectSingleImage,
    title,
    currentName,
    dialogData,
    data,
    closeWindow
  }
})
