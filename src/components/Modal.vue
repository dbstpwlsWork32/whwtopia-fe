<template>
  <transition name="com_modal">
    <div class="m_modal com_modal" v-if="display" @click="this.close">
      <div class="_content" @click.stop="">
        <slot></slot>
      </div>
      <div class="m_modal__cover" v-if="cover"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'm_modal',
  props: {
    display: {
      type: Boolean,
      default: false
    },
    persistence: {
      type: Boolean,
      default: false
    },
    cover: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if(!this.persistence) this.$emit('update:display', false)
    },
    keyClose(e: KeyboardEvent) {
      const keyLowCase = e.key.toLowerCase()
      if (keyLowCase === 'esc' || keyLowCase === 'escape') this.close()
    }
  },
  watch: {
    display(display) {
      if (display) window.addEventListener('keydown', this.keyClose)
      else window.removeEventListener('keydown', this.keyClose)
    }
  }
})
</script>

<style lang="scss">
$time: var(--ani-3);
.com_modal {
  width: 100%;
  height: 100vh;
  transition: none $time;
  transition-duration: $time;
  & > ._content {
    contain: paint;
    outline: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: calc(100% - var(--ct-indent) * 2);
    max-height: 90vh;
    overflow-y: auto;
  }
  .m_modal__cover, & > ._content {
    transition: opacity $time;
    opacity: 1;
  }

  &.com_modal-enter-from, &.com_modal-leave-to {
    .m_modal__cover, & > ._content {
      opacity: 0;
    }
  }
}
</style>