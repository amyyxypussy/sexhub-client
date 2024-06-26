import request from '@/util/request'
import { Page } from '@/apis/types/pages'

export type Author = {
  id: string
  name: string
  description: string
  avatarName: string
  avatarPath: string
  creator: string
  createTime: number
  posterPath: string
}

export const createUpper = (data: FormData) => request.post<string>('/upper/createUpper', { data })

export const getList = (params: { pageIndex: number; type: number; pageSize: number }) =>
  request.get<Page<Author>>('/upper/getUpperList', { params })

export const getUpperDetail = (params: { upperID: string }) =>
  request.get<Author>('/upper/getUpperDetailWithCreator', { params })

export const setUpperPoster = (data: FormData) => request.post('/upper/setPoster', { data })
