import type { App } from 'vue'

export default function (app: App) {
  let willRemove: HTMLElement[] = []

  function rippleEffect(e: MouseEvent | KeyboardEvent) {
    // is not enter, don't trigger event
    if (e instanceof KeyboardEvent && (e as KeyboardEvent).key.toLowerCase() !== 'enter') return false

    const target = e.currentTarget as Element

    const nowLength = willRemove.length + 1
    const {
      x: targetViewX, y: targetViewY,
      width: targetWidth, height: targetHeight
    } = target.getBoundingClientRect()
    const radius = Math.max(targetWidth, targetHeight) / 2

    const rippleDom = document.createElement('div')
    rippleDom.classList.add('js_ripple')
    rippleDom.style.width = rippleDom.style.height = `${radius * 2}px`

    const relativeOffest = (e instanceof MouseEvent)
      ? {
        x: e.pageX - targetViewX,
        y: e.pageY - Math.round(window.scrollY) - targetViewY
      }
      : {
        x: targetWidth / 2,
        y: targetHeight / 2
      }

    rippleDom.style.top = `${(relativeOffest.y - radius)}px`
    rippleDom.style.left = `${(relativeOffest.x - radius)}px`

    const rippleEvent = () => {
      if (nowLength === willRemove.length) {
        willRemove.forEach(el => el.remove())
        willRemove = []
      }
    }
    rippleDom.addEventListener('animationend', rippleEvent, { once: true })

    willRemove.push(rippleDom)
    target.appendChild(rippleDom)
  }
  app.directive('ripple-effect', {
    mounted(el: HTMLElement, bind) {
      if (!bind.value || !bind.value.selfAddClass) el.classList.add('m__ripple-btn')

      el.addEventListener('mousedown', rippleEffect)
      el.addEventListener('keydown', rippleEffect)
    },
    beforeUnmount(el: HTMLElement) {
      el.removeEventListener('mousedown', rippleEffect)
      el.removeEventListener('keydown', rippleEffect)
    }
  })
}