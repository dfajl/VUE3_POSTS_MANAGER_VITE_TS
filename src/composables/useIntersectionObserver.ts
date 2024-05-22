import { Ref, watch, onMounted, onUnmounted } from 'vue'

export default function useIntersectionObserver(
  watchedEl: Ref<Element | null>,
  root: Ref<Element | null>,
  callbackFromPinia: () => void
): void {
  const options: IntersectionObserverInit = {
    root: root.value,
    rootMargin: '0px',
    threshold: 0.5
  }

  const callback: IntersectionObserverCallback = (entries) => {
    console.log('start observing')
    if (entries[0].isIntersecting) {
      callbackFromPinia() // Запрос за партией данных
    }
  }

  const observer = new IntersectionObserver(callback, options)
  onMounted(() => {
    /*
      вотчер вызывается три раза из-за наличия v-if в шаблоне.
      { immediate: true } - даст вывод в консоль v-node.
      далее из-за v-if v-node заменится на null.
      появление постов превратит null в DOM div.observer
    */
    watch(
      () => watchedEl.value,
      (newEl, oldEl) => {
        console.log('watchedEl value changed:', { newEl, oldEl })
        if (oldEl) observer.unobserve(oldEl)
        if (newEl) observer.observe(newEl)
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    if (watchedEl.value) {
      observer.unobserve(watchedEl.value)
    }
  })
}
