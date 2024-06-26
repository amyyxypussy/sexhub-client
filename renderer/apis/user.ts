import request from '@/util/request'

export const login = (data: Record<string, any>) => request.post<string>('/auth/login', { data })
