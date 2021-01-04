<template>
  <header id="or_header" class="atom_ct">
    <ripple-btn>
      <font-awesome-icon icon="align-justify" />
    </ripple-btn>
  </header>
  <navigation v-on:bottomNotify="text => bottomNotify = text" />
  <main>
    <router-view/>
  </main>
  <div id="or_alert_bottom">
    <transition name="fade">
      <div
        class="_text"
        v-if="bottomNotify"
        v-on:transitionend="() => bottomNotify = ''"
      >{{ bottomNotify }}</div>
    </transition>
  </div>
</template>

<script>
import Navigation from './Nav.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      bottomNotify: ''
    }
  },
  components: {
    Navigation
  }
})
</script>

<style lang="scss">
#or_alert_bottom {
  contain: layout paint;
  position: fixed;
  bottom: 10%;
  left: var(--ct-indent);
  right: var(--ct-indent);
  color: var(--ft-cl-sub);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & > ._text {
    background: var(--bg-sub-2);
    padding: 5px 10px;
    border-radius: 5px;
    &.fade-enter-active {
      transition: transform var(--ani-2);
    }
    &.fade-enter-from {
      transform: scale(0);
    }
    &.fade-leave-active {
      transition: opacity 1s;
      transition-delay: 1s;
    }
    &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
