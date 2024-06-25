import appBuilder from '@/util/app-builder'

const m = import.meta.glob('@/views/**/index.tsx')

Object.entries(m).forEach(([id, fn]) => {
  fn().then((res) => {
    console.log(res)
  })
})
