<template>
  <header id="or_header">
    <div class="_wrap m_ct-indent">
      <button v-ripple-effect class="_nav-btn" v-click-sync="() => navDisplay = true" aria-label="open navigation" aria-haspopup aria-controls="or_nav" :aria-expanded="navDisplay">
        <font-awesome-icon icon="bars" />
      </button>
      <h1 class="s_ft-si-up-3 m_text-ellipsis">{{headerTitle}}</h1>
    </div>
  </header>

  <Nav v-model:navDisplay="navDisplay" />

  <main>
    <router-view/>
  </main>

  <div id="or_floating-btn" class="m_ct-width" v-show="FLOATINGMENU.display">
    <div v-click-sync="() => FLOATINGMENU.cb()" class="_btn" :role="FLOATINGMENU.role" :aria-label="FLOATINGMENU.label">
      <div class="_view-port">
        <div class="_wrap" :style="{ transform: FLOATINGMENUTransform, transition: 'transform var(--ani-3)' }">
          <font-awesome-icon icon="feather-alt" />
          <font-awesome-icon icon="plus" />
        </div>
      </div>
    </div>
  </div>
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
import { onMounted, Ref, watch } from 'vue'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

import { bottomAlert } from '@/Store/bottomAlert'
import headerTitle from '@/Store/title'
import { overTabletWidth } from '@/utils/isMobile'
import { updateBottomAlert } from '@/Store/bottomAlert'
import { firstInitHomepage } from '@/Store/user'
import { FLOATINGMENU, FLOATINGMENUTransform } from '@/Store/floatingMenu'
import type { IconFlag } from '@/Store/floatingMenu'

import Nav from './Nav/index.vue'

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

function useFloatingMenu() {
  const DISPLAY = [
    {
      path: '/',
      iconFlag: 'write'
    },
    {
      path: /^\/gallery(\/\d+)?$/,
      iconFlag: 'new'
    }
  ] as { path: RegExp | string; iconFlag: IconFlag }[]

  const route = useRoute()

  /*
    if path is root when first enter homepage, watch doesn't work
    and even if use route.path onMounted, if always return '/' even if it isn't
    so use setTimeout
  */
  setTimeout(() => {
    if (route.path === '/') FLOATINGMENU.display = true
  }, 0)
  watch(() => route.path,
    path => {
      const exist = DISPLAY.find(({ path: displayPath }) => {
        if (displayPath instanceof RegExp) return path.match(displayPath)
        return path === displayPath
      })
      if (!exist && FLOATINGMENU.display) FLOATINGMENU.display = false
      else if (exist) {
        FLOATINGMENU.display = true
        FLOATINGMENU.iconFlag = exist.iconFlag
      }
    }
  )
}

export default defineComponent({
  name: 'App',
  setup() {
    const navDisplay = ref(false)
    useNavResizeEv(navDisplay)
    useFloatingMenu()

    onMounted(() => {
      firstInitHomepage()
    })

    return {
      bottomAlert,
      headerTitle,
      navDisplay,
      updateBottomAlert,
      FLOATINGMENU,
      FLOATINGMENUTransform
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
      flex-grow: 1;
      text-align: center;
      @include media(until-t) {
        padding-left: 5px;
      }
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

#or_floating-btn {
  text-align: right;
  padding: 0 var(--ct-indent);
  & > ._btn {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    transform: translateX(-100%);
    z-index: 3;
    text-align: center;
    display: inline-block;
    box-shadow: var(--shaodw-base);
    color: #fff;
    font-size: rem(35);
    background: var(--flag-cl-primary);
    border-radius: 50%;

    & > ._view-port {
      width: 1.8em;
      height: 1.8em;
      overflow: hidden;
      ._wrap {
        line-height: 1.8em;
      }
    }
  }

  @include media(until-m) {
    font-size: rem(23);
    & > ._btn {
      bottom: 5px;
    }
  }
}
</style>
