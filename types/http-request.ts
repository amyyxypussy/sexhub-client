import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export interface SMRequestInterceptors<T extends AxiosResponse<any, any>> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SMRequestConfig<V = AxiosResponse<any, any>> extends AxiosRequestConfig {
  // @ts-ignore
  interceptors?: SMRequestInterceptors<V>
}

export enum ResultStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export type ResponseData = {
  data: any
  message: string
  status: ResultStatus
}

export default class HttpRequest {
  instance: AxiosInstance

  constructor(getToken: () => string) {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API
    })

    this.instance.interceptors.request.use((config) => {
      const token = getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })
  }

  request<T = any>(config: SMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res: T) => resolve(res))
        .catch((err: any) => reject(err))
    })
  }

  get<T = any>(url: string, config: SMRequestConfig<T> = {}): Promise<T> {
    return this.request<T>({ url, ...config, method: 'GET' })
  }

  post<T = any>(url: string, config: SMRequestConfig<T> = {}): Promise<T> {
    return this.request<T>({ url, ...config, method: 'POST' })
  }

  delete<T = any>(url: string, config: SMRequestConfig<T> = {}): Promise<T> {
    return this.request<T>({ url, ...config, method: 'DELETE' })
  }

  put<T = any>(url: string, config: SMRequestConfig<T> = {}): Promise<T> {
    return this.request<T>({ url, ...config, method: 'PUT' })
  }

  patch<T = any>(url: string, config: SMRequestConfig<T> = {}): Promise<T> {
    return this.request<T>({ url, ...config, method: 'PATCH' })
  }
}
