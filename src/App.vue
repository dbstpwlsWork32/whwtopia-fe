<template>
  <header id="or_header">
    <div class="atom_ct _wrap">
      <button v-ripple-effect class="_nav-btn" v-click-sync="openNav" aria-label="open navigation" aria-haspopup aria-controls="or_nav" :aria-expanded="navDisplay">
        <font-awesome-icon icon="bars" />
      </button>
      <h1 class="s_ft-si-up-3 atom_text-ellipsis">{{headerTitle}}</h1>
    </div>
  </header>

  <transition
    name="nav"
    @after-enter="navDom.style.transition = 'none'"
    @before-leave="navDom.removeAttribute('style')"
  >
    <div class="atom_modal" v-show="navDisplay">
      <nav id="or_nav" ref="navDom">
        <div class="_profile">
          <router-link :to="`/user/${0}`" v-ripple-effect="{selfAddClass: true}" class="m__ripple-btn" v-click-sync="closeNav" aria-label="go my page">
            <div class="_profile__img atom_profile">
              <img src="https://pbs.twimg.com/profile_images/1297591729218916352/XSeEV90C_normal.jpg" alt="profile image" />
            </div>
            <p class="s_ft-si-up-2">프로필 이름</p>
          </router-link>
          <button class="s_ft-cl-sub" @mousedown="uidCopy">UID: 1234123</button>
        </div>
        <div class="_links" @mousedown="closeNav">
          <div class="_wrap">
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'bookmark']" />
              <span>즐겨찾기 갤러리</span>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'sticky-note']" />
              <span>내 목록</span>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'address-book']" />
              <span>구독</span>
            </router-link>
          </div>
          <div class="_wrap">
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'paper-plane']" />
              <span>인기글</span>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'newspaper']" />
              <span>인기 갤러리</span>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'images']" />
              <span>짤빵 저장소</span>
            </router-link>
          </div>
        </div>
        <div class="_footer">
          <button v-ripple-effect aria-label="setting">
            <font-awesome-icon icon="cog" />
          </button>
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
      @after-enter="updateBottomAlert('')"
    >
      <div
        class="_text"
        v-if="bottomAlert"
      >{{ bottomAlert }}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, reactive, ref, watch } from 'vue'
import isMobile from '@/utils/isMobile'
import { bottomAlert, updateBottomAlert } from '@/hooks/bottomAlert'
import headerTitle from '@/hooks/title'

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

function useNavGesture(isOpenRef: Ref<boolean>, navDomRef: Ref<HTMLElement | undefined>) {
  const startPos = reactive({
    x: 0,
    y: 0
  })
  window.addEventListener('touchmove', e => {
    if (isOpenRef.value) {
      const navDom = navDomRef.value as HTMLElement
      const move = e.touches[0].clientX - startPos.x
      if (move < 0) navDom.style.transform = `translateX(${move}px)`
    }
    if (Math.abs(e.touches[0].clientY - startPos.y) > 35) return false

    if (e.touches[0].clientX - startPos.x > 50) {
      isOpenRef.value = true
    } else if (e.touches[0].clientX - startPos.x < -50) {
      isOpenRef.value = false
    }
  })
  window.addEventListener('touchend', () => {
    const navDom = navDomRef.value as HTMLElement

    // when side nav swape cancelled
    if (isOpenRef.value && navDom.style.transform) {
      const matchPx = navDom.style.transform.match(/\d+/)
      let moved = parseInt(matchPx? '-' + matchPx[0] : '0')

      if (moved) {
        const _do = () => {
          moved += 2
          navDom.style.transform = `translateX(${moved > 0 ? 0 : moved}px)`

          if (moved < 0 && isOpenRef.value) requestAnimationFrame(_do)
        }

        _do()
      }
    }
  })
  window.addEventListener('touchstart', e => {
    startPos.x = e.touches[0].clientX
    startPos.y = e.touches[0].clientY
  })
}

export default defineComponent({
  name: 'App',
  setup() {
    const navDom = ref<HTMLElement>()

    async function uidCopy() {
      await window.navigator.clipboard.writeText('asdasd')
      updateBottomAlert('복사 완료!')
    }

    const { display: navDisplay, openNav, closeNav } = useNavigation()

    if (isMobile()) useNavGesture(navDisplay, navDom)

    return {
      uidCopy,
      navDisplay,
      openNav,
      closeNav,
      bottomAlert,
      updateBottomAlert,
      headerTitle,
      navDom
    }
  }
})
</script>

<style lang="scss">
#or_header {
  border-bottom: 2px solid var(--br-cl);
  margin-bottom: 15px;
  & > ._wrap {
    padding-top: 0;
    padding-bottom: 0;
    z-index: 2;
    background: var(--bg-base);
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    & > ._nav-btn {
      flex-shrink: 0;
      font-size: rem(40);
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

.atom_modal {
  $time: var(--ani-3);
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
      transform: translateX(-100%) !important;
    }
  }
}
#or_nav {
  background: var(--bg-base);
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 500px;
  height: 100vh;
  z-index: 10;
  display: grid;
  grid-template-rows: auto 1fr auto;
  & > ._profile {
    padding: var(--ct-indent-vert) var(--ct-indent);
    & > a {
      color: var(--ft-cl-base);
    }
    & > button, & > a {
      display: block;
    }
    ._profile__img {
      width: 60px;
      height: 60px;
      margin-bottom: rem(5);
      @include media(until-m) {
        width: 50px;
        height: 50px;
      }
    }
  }
  & > ._links {
    margin-top: 10px;
    border-top: 1px solid var(--br-cl);
    overflow: auto;
    & > ._wrap {
      padding: 20px var(--ct-indent);
      border-top: 1px solid var(--br-cl);
      display: flex;
      flex-direction: column;
      gap: 20px;
      &:first-child {
        border-top: none;
      }
      a {
        font-size: var(--ft-si-up-2);
        svg {
          color: var(--ft-cl-sub);
        }
        span {
          color: var(--ft-cl-base);
          margin-left: 10px;
        }
      }
    }
  }
  & > ._footer {
    border-top: 1px solid var(--br-cl);
    font-size: rem(20);
    button {
      padding: 5px 10px;
      border-radius: 10px;
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
