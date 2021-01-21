import type { App } from 'vue'

export default function (app: App) {
  let keyboardCb: (e: KeyboardEvent) => void

  app.directive('click-sync', {
    mounted(el: HTMLElement, bind) {
      keyboardCb = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() !== 'enter') return false
        bind.value()
      }

      el.addEventListener('mousedown', bind.value)
      el.addEventListener('keydown', keyboardCb)
    },
    beforeUnmount(el: HTMLElement, bind) {
      el.removeEventListener('mousedown', bind.value)
      el.removeEventListener('keydown', keyboardCb)
    }
  })
}