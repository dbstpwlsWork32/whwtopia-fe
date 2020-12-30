<template>
<div class="atom_card">
  <h2 class="s_mb-content"><slot name="title"></slot></h2>
  <post-li :posts="posts" />
  <router-link to="/" class="a_more s_mt-content">더보기</router-link>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostLi from '@/components/atoms/PostLi.vue'

export default defineComponent({
  name: 'viewsHome_Card',
  props: {
    posts: Array
  },
  components: {
    PostLi
  }
})
</script>

<style lang="scss" scoped>
.atom_card {
  min-width: 0;
  padding-bottom: 0;
}
._title {
  svg {
    margin-right: .1em;
  }
}
.a_more {
  display: block;
  color: var(--ft-cl-white-stance);
  line-height: rem(36);
  background: var(--blue);
  width: calc(100% + var(--content-indent) * 2);
  text-align: center;
  position: relative;
  left: calc(-1 * var(--content-indent));
  border-radius: 0 0 10px 10px;
}
</style>
