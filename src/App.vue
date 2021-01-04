<template>
  <header id="or_header" class="atom_ct">
    <div class="_profile">
      <ripple-btn to="/" class="s_img-fit _img">
        <img src="https://pbs.twimg.com/profile_images/1297591729218916352/XSeEV90C_normal.jpg" alt="profile image" />
      </ripple-btn>
    </div>
    <nav>
    </nav>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
#or_header {
  & > ._profile {
    & > ._img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      @include media(until-m) {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
