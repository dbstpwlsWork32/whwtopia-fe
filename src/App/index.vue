<template>
  <header id="or_header">
    <div class="atom_ct _wrap">
      <button v-ripple-effect class="_nav-btn" v-click-sync="() => navDisplay = true" aria-label="open navigation" aria-haspopup aria-controls="or_nav" :aria-expanded="navDisplay">
        <font-awesome-icon icon="bars" />
      </button>
      <h1 class="s_ft-si-up-3 atom_text-ellipsis">{{headerTitle}}</h1>
    </div>
  </header>

  <Nav v-model:navDisplay="navDisplay" />

  <main>
    <router-view/>
  </main>
  <div id="or_alert_bottom">
    <transition
      name="fade"
      @after-enter="updateBottomAlert('')"
    >
      <div
        class="_text"
        v-if="bottomAlert"
        role="alertdialog"
        v-mounted-focus
        tabindex="0"
      >{{ bottomAlert }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { bottomAlert } from '@/hooks/bottomAlert'
import headerTitle from '@/hooks/title'
import { overTabletWidth } from '@/utils/isMobile'
import { updateBottomAlert } from '@/hooks/bottomAlert'

import Nav from './Nav.vue'

function useNavResizeEv(navDisplay: Ref<boolean>) {
  navDisplay.value = overTabletWidth()
  let throttling: number | null = null
  window.addEventListener('resize', () => {
    if (throttling !== null) clearTimeout(throttling)
    throttling = setTimeout(() => {
      throttling = null

      navDisplay.value = overTabletWidth()
    }, 200)
  })
}

export default defineComponent({
  name: 'App',
  setup() {
    const navDisplay = ref(false)

    useNavResizeEv(navDisplay)

    return {
      bottomAlert,
      headerTitle,
      navDisplay,
      updateBottomAlert
    }
  },
  components: {
    Nav
  }
})
</script>

<style lang="scss">
$nav-pc-width: 250px;
body {
  @include media(over-t) {
    padding-left: $nav-pc-width !important;
  }
}
main {
  @include media(over-t) {
    padding-left: 10px !important;
  }
}
#or_header {
  border-bottom: 2px solid var(--br-cl);
  margin-bottom: 15px;
  position: sticky;
  top: 0;
  background: var(--bg-base);
  z-index: 2;
  & > ._wrap {
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    min-height: 3em;
    & > ._nav-btn {
      flex-shrink: 0;
      font-size: rem(40);
      @include media(over-t) {
        display: none;
      }
      @include media(until-t) {
        font-size: rem(34);
      }
      @include media(until-m) {
        font-size: rem(30);
      }
    }
    & > h1 {
      padding-left: 5px;
      flex-grow: 1;
      text-align: center;
    }
  }
}

#or_alert_bottom {
  z-index: 11;
  contain: layout paint;
  position: fixed;
  bottom: 10%;
  left: var(--ct-indent);
  right: var(--ct-indent);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & > ._text {
    border: 2px solid var(--br-cl);
    background: var(--bg-sub-2);
    padding: 5px 10px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    &.fade-enter-active {
      transition: transform var(--ani-2);
    }
    &.fade-enter-from {
      transform: scale(0);
    }
    &.fade-leave-active {
      transition: opacity .5s;
      transition-delay: .5s;
    }
    &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
