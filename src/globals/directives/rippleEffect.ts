import type { App } from 'vue'

export default function (app: App) {
  let willRemove: HTMLElement[] = []

  function rippleEffect(e: MouseEvent | KeyboardEvent) {
    // is not enter, don't trigger event
    if (e instanceof KeyboardEvent && (e as KeyboardEvent).key.toLowerCase() !== 'enter') return false

    const target = e.currentTarget as Element

    const nowLength = willRemove.length + 1
    const { clientWidth, clientHeight } = target
    const { x: offsetLeft, y: offsetTop } = target.getBoundingClientRect()
    const radius = Math.max(clientWidth, clientHeight) / 2

    const rippleDom = document.createElement('div')
    rippleDom.classList.add('js_ripple')
    rippleDom.style.width = rippleDom.style.height = `${radius * 2}px`

    const relativeOffest = {
      x: ('pageX' in e) ?  e.pageX - offsetLeft : clientWidth / 2,
      y: ('pageY' in e) ?  e.pageY - offsetTop : clientHeight / 2
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
      if (bind.value && bind.value.router) {
        // if router-link, it overlap class
        setTimeout(() => {
          el.classList.add('m__ripple-btn')
        }, 0)
      } else {
        el.classList.add('m__ripple-btn')
      }

      el.addEventListener('mousedown', rippleEffect)
      el.addEventListener('keydown', rippleEffect)
    },
    unmounted(el: HTMLElement) {
      el.removeEventListener('mousedown', rippleEffect)
      el.removeEventListener('keydown', rippleEffect)
    }
  })
}