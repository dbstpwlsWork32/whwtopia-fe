import type { App } from 'vue'

export default function (app: App) {
  app.directive('mounted-focus', {
    mounted(el: HTMLElement) {
      setTimeout(() => {
        el.focus()
      }, 0)
    }
  })
}