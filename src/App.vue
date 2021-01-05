<template>
  <header id="or_header" class="atom_ct">
    <ripple-btn class="_nav-btn" @mousedown="openNav" aria-label="open navigation">
      <font-awesome-icon icon="align-justify" />
    </ripple-btn>
  </header>

  <transition name="nav">
    <div class="atom_modal" v-show="navDisplay">
      <nav id="or_nav">
        <div class="_profile">
          <ripple-btn aria-label="go my page">
            <div class="_profile__img s_img-fit">
              <img src="https://pbs.twimg.com/profile_images/1297591729218916352/XSeEV90C_normal.jpg" alt="profile image" />
            </div>
            <p class="s_ft-si-up-1">프로필 이름</p>
          </ripple-btn>
          <button class="s_ft-cl-sub s_ft-si-sub" @mousedown="uidCopy">UID: 1234123</button>
        </div>
      </nav>
      <div class="atom_modal__cover" @mousedown="closeNav" aria-label="navigation close" role="button"></div>
    </div>
  </transition>

  <main>
    <router-view/>
  </main>
  <div id="or_alert_bottom">
    <transition
      name="fade"
      @after-enter="bottomAlertRemove"
    >
      <div
        class="_text"
        v-if="$store.state.bottomAlertText"
      >{{ $store.state.bottomAlertText }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import isMobile from '@/utils/isMobile'
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'

function useBottomAlert() {
  const store = useStore()

  function bottomAlertRemove() {
    store.commit('bottomAlertText', '')
  }
  async function uidCopy() {
    await window.navigator.clipboard.writeText('asdasd')
    const message = '복사 완료!'
    store.commit('bottomAlertText', message)
  }

  return {
    bottomAlertRemove,
    uidCopy
  }
}

function useNavigation() {
  const display = ref(false)

  watch(() => display.value, () => {
    const _do = display.value ? 'add' : 'remove'
    document.body.classList[_do]('sc-lock')
  })
  function openNav() {
    display.value = true
  }
  function closeNav() {
    display.value = false
  }

  return {
    display,
    openNav,
    closeNav
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const { bottomAlertRemove, uidCopy } = useBottomAlert()
    const { display: navDisplay, openNav, closeNav } = useNavigation()

    if (isMobile()) {
      const startPos = reactive({
        x: 0,
        y: 0
      })
      window.addEventListener('touchmove', e => {
        if (Math.abs(e.touches[0].clientY - startPos.y) > 35) return false

        if (e.touches[0].clientX - startPos.x > 50) {
          navDisplay.value = true
        } else if (e.touches[0].clientX - startPos.x < -50) {
          navDisplay.value = false
        }
      })
      window.addEventListener('touchstart', e => {
        startPos.x = e.touches[0].clientX
        startPos.y = e.touches[0].clientY
      })
    }
    return {
      bottomAlertRemove,
      uidCopy,
      navDisplay,
      openNav,
      closeNav
    }
  }
})
</script>

<style lang="scss">
#or_header {
  z-index: 2;
  background: var(--bg-base);
  position: sticky;
  top: 0;
  & > ._nav-btn {
    font-size: rem(40);
    padding: 0 5px;
    @include media(until-t) {
      font-size: rem(34);
    }
  }
}

.atom_modal {
  $time: var(--ani-4);
  .atom_modal__cover {
    contain: strict;
    transition: opacity $time;
    opacity: 1;
  }
  #or_nav {
    contain: strict;
    transition: transform $time;
    transform: translateX(0);
  }
  &.nav-enter-active, &.nav-leave-active {
    transition-duration: $time;
  }
  &.nav-enter-from, &.nav-leave-to {
    .atom_modal__cover {
      opacity: 0;
    }
    #or_nav {
      transform: translateX(-100%);
    }
  }
}
#or_nav {
  background: var(--bg-base);
  position: fixed;
  top: 0;
  left: 0;
  padding-right: 20px;
  width: 80%;
  max-width: 500px;
  height: 100vh;
  z-index: 10;
  padding: var(--ct-indent-vert) var(--ct-indent);
  & > ._profile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    ._profile__img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: rem(10);
      @include media(until-m) {
        width: 50px;
        height: 50px;
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
      transition: opacity .5s;
      transition-delay: .5s;
    }
    &.fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
