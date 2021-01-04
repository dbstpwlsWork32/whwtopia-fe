<template>
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
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App_nav',
  emits: ['bottomNotify'],
  methods: {
    async uidCopy() {
      await window.navigator.clipboard.writeText('asdasd')
      this.$emit('bottomNotify', '복사 완료!')
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
</style>