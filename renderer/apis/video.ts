import request from '@/util/request'

export type Video = {
  id?: string
  title?: string
  relativePath?: string
  upper?: string
  poster?: string
  duration?: number
  collection?: string
  description?: string
  manufacturer?: string
  serialNumber?: string
  uploadTime?: number
  fileSize?: number
  createTime?: number
}

export type VideoLocal = {
  name: string
  ext: string
  path: string
  base: string
  size: number
}

export type Collection = {
  title: string
  id: string
}

export type Tag = {
  id?: string
  tagTitle?: string
  label?: string
  value?: string
}

export const create = (data: FormData) => request.post('/video/create', { data })

export const getTagList = () => request.get<Tag[]>('/video/tagList')
