<template>
  <button ref="wrap" @click="rippleEffect" class="m__ripple-btn">
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
      const { clientWidth, clientHeight, offsetTop, offsetLeft } = e.currentTarget
      const diameter = Math.max(clientWidth, clientHeight)

      const rippleDom = document.createElement('div')
      rippleDom.classList.add('js_ripple')
      rippleDom.style.width = rippleDom.style.height = `${diameter}px`

      rippleDom.style.top = `${(e.pageY - offsetTop - diameter / 2)}px`
      rippleDom.style.left = `${(e.pageX - offsetLeft - diameter / 2)}px`

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
    transform: scale(.4);
    border-radius: 50%;
    position: absolute;
    background: currentcolor;
    animation: default-ripple .6s both;
    opacity: .6;
  }
}
@keyframes default-ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>