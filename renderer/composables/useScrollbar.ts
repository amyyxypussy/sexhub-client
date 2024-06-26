import { inject } from 'vue'
import { updateScrollView } from '@/components/Scrollbar/index'

export function useScrollbar() {
  const updateScrollViewFn = inject<() => void>(updateScrollView) as () => void

  return {
    updateFn: updateScrollViewFn
  }
}
