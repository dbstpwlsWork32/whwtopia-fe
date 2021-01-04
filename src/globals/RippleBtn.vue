<template>
  <button ref="wrap" @mousedown="rippleEffect" class="m__ripple-btn">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      willRemove: []
    }
  },
  methods: {
    rippleEffect(e) {
      const nowLength = this.willRemove.length + 1
      const { clientWidth, clientHeight } = e.currentTarget
      const { x: offsetLeft, y: offsetTop } = e.currentTarget.getBoundingClientRect()
      const radius = Math.max(clientWidth, clientHeight) / 2

      const rippleDom = document.createElement('div')
      rippleDom.classList.add('js_ripple')
      rippleDom.style.width = rippleDom.style.height = `${radius * 2}px`

      const relativeOffest = {
        x: (e.pageX) ?  e.pageX - offsetLeft : clientWidth / 2,
        y: (e.pageY) ?  e.pageY - offsetTop : clientHeight / 2
      }

      rippleDom.style.top = `${(relativeOffest.y - radius)}px`
      rippleDom.style.left = `${(relativeOffest.x - radius)}px`

      const rippleEvent = () => {
        if (nowLength === this.willRemove.length) {
          this.willRemove.forEach(el => { el.remove(); el.removeEventListener('animationend', rippleEvent) })
          this.willRemove = []
        }
      }
      rippleDom.addEventListener('animationend', rippleEvent)

      this.willRemove.push(rippleDom)
      this.$refs.wrap.appendChild(rippleDom)
    }
  }
})
</script>

<style lang="scss">
.m__ripple-btn {
  position: relative;
  overflow: hidden;
  .js_ripple {
    contain: strict;
    transform: scale(.8);
    border-radius: 50%;
    position: absolute;
    background: currentcolor;
    animation: default-ripple var(--ani-6, .6s) both;
    opacity: .4;
  }
}
@keyframes default-ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>