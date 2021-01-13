<template>
  <transition name="com_modal">
    <div class="atom_modal com_modal" v-if="display">
      <div class="_content" v-mounted-focus tabindex="0">
        <slot></slot>
      </div>
      <div class="atom_modal__cover" v-if="cover" @click="() => {if(!persistence) $emit('update:display', false)}"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'atom_modal',
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
  .atom_modal__cover, & > ._content {
    transition: opacity $time;
    opacity: 1;
  }

  &.com_modal-enter-from, &.com_modal-leave-to {
    .atom_modal__cover, & > ._content {
      opacity: 0;
    }
  }
}
</style>