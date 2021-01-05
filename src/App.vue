<template>
  <header id="or_header" class="atom_ct">
    <ripple-btn class="_nav-btn">
      <font-awesome-icon icon="align-justify" />
    </ripple-btn>
  </header>
  <nav id="or_nav">
    <div class="_profile">
      <ripple-btn>
        <div class="_profile__img s_img-fit">
          <img src="https://pbs.twimg.com/profile_images/1297591729218916352/XSeEV90C_normal.jpg" alt="profile image" />
        </div>
        <p class="s_ft-si-up-1">프로필 이름</p>
      </ripple-btn>
      <button class="s_ft-cl-sub" @mousedown="uidCopy">UID: 1234123</button>
    </div>
  </nav>
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
import { defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  setup() {
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
#or_nav {
  background: var(--bg-base);
  max-width: 80%;
  height: 100vh;
  & > ._profile {
    ._profile__img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
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
