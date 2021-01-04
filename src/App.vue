<template>
  <header id="or_header" class="atom_ct">
    <ripple-btn>
      <font-awesome-icon icon="align-justify" />
    </ripple-btn>
  </header>
  <nav id="or_nav">
    <div class="_profile">
      <ripple-btn class="s_img-fit _img">
        <img src="https://pbs.twimg.com/profile_images/1297591729218916352/XSeEV90C_normal.jpg" alt="profile image" />
      </ripple-btn>
      <p class="s_ft-si-up-1">프로필 이름</p>
      <button class="s_ft-cl-sub" @mousedown="uidCopy">1234123</button>
    </div>
  </nav>
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  methods: {
    uidCopy() {
      window.navigator.clipboard.writeText('asdasd')
    }
  }
})
</script>

<style lang="scss">
#or_nav {
  & > ._profile {
    & > ._img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
</style>
