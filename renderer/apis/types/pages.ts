export type Page<T> = {
  current: number
  hasNextPage: boolean
  hasPrePage: boolean
  total: number
  size: number
  pages: number
  records: T[]
}
