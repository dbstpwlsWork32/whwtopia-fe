<template>
  <header id="or_header" class="atom_ct">
    <ripple-btn>
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
      <button class="s_ft-cl-sub" @mousedown="uidCopy">1234123</button>
    </div>
  </nav>
  <main>
    <router-view/>
  </main>
  <div id="or_alert_bottom">
    <transition-group name="fade">
      <div
        v-for="(bottomNotify, index) in bottomNotifys"
        :key="`bottomNotify-${index}`"
        class="_text"
        v-on:transitionend="handleTransitionend(bottomNotify)"
      >{{ bottomNotify }}</div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      bottomNotifys: []
    }
  },
  methods: {
    handleTransitionend(text) {
      this.bottomNotifys.splice(this.bottomNotifys.indexOf(text), 1)
    },
    handleUnderNotify(text) {
      this.bottomNotifys.push(text)
    },
    async uidCopy() {
      await window.navigator.clipboard.writeText('asdasd')
      this.handleUnderNotify('복사 완료!')
    }
  }
})
</script>

<style lang="scss">
#or_nav {
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
