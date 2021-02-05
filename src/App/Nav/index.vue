<template>
  <transition
    name="nav"
    @after-enter="navDom.style.transition = 'none'"
    @before-leave="navDom.removeAttribute('style')"
  >
    <div class="m_modal" id="or_nav-modal" v-show="navDisplay">
      <nav id="or_nav" ref="navDom">
        <div class="_profile _head" v-if="isSignedIn">
          <router-link :to="`/user/${user.id}`" v-ripple-effect="{selfAddClass: true}" class="m_ripple-btn" v-click-sync="closeNav" aria-label="go my page">
            <div class="_profile__img m_profile">
              <img :src="user.imgUrl" alt="profile image" />
            </div>
            <p class="s_ft-si-up-2">{{ user.name }}</p>
          </router-link>
          <div class="_profile__btn-wrap">
            <button class="s_ft-cl-sub" @mousedown="uidCopy" aria-label="uid copy">UID: {{user.id}}</button>
            <button class="s_btn-base-border s_ft-si-down-1" @mousedown="logout">로그아웃</button>
          </div>
        </div>
        <div class="_head" v-else>
          <button class="or_nav__login-btn s_btn-base" v-ripple-effect v-click-sync="() => login('google')" :disabled="loginProcess"><font-awesome-icon :icon="['fab', 'google']" aria-label="google" /> 로그인</button>

          <check-box v-model:value="rememberDevice" class="_check">장치 기억</check-box>
        </div>

        <div class="_links" @mousedown="closeNav">
          <div class="_wrap" v-if="isSignedIn">
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
            <router-link to="/gallery">
              <font-awesome-icon :icon="['far', 'newspaper']" />
              <span>갤러리 탐색</span>
            </router-link>
            <router-link to="/">
              <font-awesome-icon :icon="['far', 'images']" />
              <span>짤빵 저장소</span>
            </router-link>
          </div>
        </div>
        <div class="_footer">
          <button v-ripple-effect aria-label="setting" v-click-sync="() => settingModalDisplay = true">
            <font-awesome-icon icon="cog" />
          </button>
        </div>
      </nav>
      <div class="m_modal__cover" @mousedown="closeNav" aria-label="navigation close" role="button"></div>
    </div>
  </transition>

  <modal v-model:display="settingModalDisplay" cover v-mounted-focus tabindex="0">
    <setting />
  </modal>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, defineAsyncComponent, ref, watch, reactive  } from 'vue'
import { isMobile, overTabletWidth } from '@/utils/isMobile'
import { updateBottomAlert } from '@/Store/bottomAlert'
import { isSignedIn, user } from  '@/Store/user'
import { useLogin, logout } from '@/Store/user'

import CheckBox from '@/components/atoms/CheckBox.vue'
import Modal from '@/components/Modal.vue'
/**
 * Setting component have to get html font-size
 * but even if use getComputedStyle api, it can't get real rendered font-size.
 * And Setting component is rendered every displayed by wrapped Modal component's v-if direction.
 * so To get real html font-size once, it have to called asyncnology
 */
const Setting = defineAsyncComponent(() => import('./Setting.vue'))

type NavEmit = (event: "update:navDisplay", p: boolean) => void

function useNavigation(dispaly: boolean, emit: NavEmit) {
  watch(() => dispaly, () => {
    if(!overTabletWidth()) {
      const _do = dispaly ? 'add' : 'remove'
      document.body.classList[_do]('sc-lock')
    }
  })
  function openNav() {
    emit('update:navDisplay', true)
  }
  function closeNav() {
    if (!overTabletWidth()) emit('update:navDisplay', false)
  }

  return {
    openNav,
    closeNav
  }
}

function useNavGesture(props: { navDisplay: boolean }, emit: NavEmit, navDomRef: Ref<HTMLElement | undefined>) {
  const startPos = reactive({
    x: 0,
    y: 0
  })
  window.addEventListener('touchmove', e => {
    if (props.navDisplay) {
      const navDom = navDomRef.value as HTMLElement
      const move = e.touches[0].clientX - startPos.x
      if (move < 0) navDom.style.transform = `translateX(${move}px)`
    }
    if (Math.abs(e.touches[0].clientY - startPos.y) > 35) return false

    if (e.touches[0].clientX - startPos.x > 50) {
      emit('update:navDisplay', true)
    } else if (e.touches[0].clientX - startPos.x < -50) {
      emit('update:navDisplay', false)
    }
  })
  window.addEventListener('touchend', () => {
    const navDom = navDomRef.value as HTMLElement

    // when side nav swape cancelled
    if (props.navDisplay && navDom.style.transform) {
      const matchPx = navDom.style.transform.match(/\d+/)
      let moved = parseInt(matchPx? '-' + matchPx[0] : '0')

      if (moved) {
        const _do = () => {
          moved += 2
          navDom.style.transform = `translateX(${moved > 0 ? 0 : moved}px)`

          if (moved < 0 && props.navDisplay) requestAnimationFrame(_do)
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
  name: 'app_nav',
  props: {
    navDisplay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:navDisplay'],
  setup(props, { emit }) {
    const navDom = ref<HTMLElement>()
    const settingModalDisplay = ref(false)

    const { openNav, closeNav } = useNavigation(props.navDisplay, emit)
    async function uidCopy() {
      await window.navigator.clipboard.writeText(`UID: ${user.id}`)
      updateBottomAlert('복사 완료!')
    }

    if (isMobile()) useNavGesture(props, emit, navDom)

    const { login, rememberDevice, processing: loginProcess } = useLogin()

    return {
      uidCopy,
      openNav,
      closeNav,
      navDom,
      settingModalDisplay,
      isSignedIn,
      user,
      login,
      loginProcess,
      logout,
      rememberDevice
    }
  },
  components: {
    Modal,
    Setting,
    CheckBox
  }
})
</script>


<style lang="scss">
#or_nav-modal {
  $time: var(--ani-3);
  .m_modal__cover {
    contain: strict;
    transition: opacity $time;
    opacity: 1;
    @include media(over-t) {
      display: none !important;
    }
  }
  #or_nav {
    contain: strict;
    transition: transform $time;
    transform: translateX(0);
    @include media(over-t) {
      max-width: $nav-pc-width;
    }
  }
  &.nav-enter-active, &.nav-leave-active {
    transition-duration: $time;
  }
  &.nav-enter-from, &.nav-leave-to {
    .m_modal__cover {
      opacity: 0;
    }
    #or_nav {
      transform: translateX(-100%) !important;
    }
  }
}
#or_nav {
  border-right: 1px solid var(--br-cl);
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

  .or_nav__login-btn {
    display: block;
    width: 100%;
  }

  & > ._head {
    padding: var(--ct-indent-vert) var(--ct-indent);
    & > ._check {
      margin-top: .5em;
    }
  }
  & > ._profile {
    & > a {
      color: var(--ft-cl-base);
      display: block;
    }

    ._profile__btn-wrap {
      margin-top: .5em;
      display: flex;
      justify-content: space-between;
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
      display: grid;
      gap: 20px;
      &:first-child {
        border-top: none;
      }
      a {
        font-size: var(--ft-si-up-2);
        color: var(--ft-cl-base);
        &.router-link-exact-active {
          color: var(--flag-cl-primary);
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
  & > ._footer {
    text-align: right;
    border-top: 1px solid var(--br-cl);
    font-size: rem(20);
    button {
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
}
</style>