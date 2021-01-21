<template>
<div class="com_post-preview m_ct-width">
  <item
    v-for="post in posts"
    :key="`post-${post.id}`"
    :post="post"
    class="_whw-post"
  />

  <div class="_write-btn-wrap">
    <router-link to="/newpost" class="_btn" aria-label="write post">
      <font-awesome-icon icon="feather-alt" />
    </router-link>
  </div>
</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import Item from './Item.vue'

export default defineComponent({
  name: 'com_post_preview',
  props: {
    posts: {
      type: Array as PropType<WhwPostPreviewItem[]>
    }
  },
  components: {
    Item
  }
})
</script>

<style lang="scss">
.com_post-preview {
  & > ._whw-post {
    margin-bottom: 10px;
  }
  
  & > ._write-btn-wrap {
    text-align: right;
    & > ._btn {
      text-align: center;
      display: inline-block;
      box-shadow: var(--shaodw-base);
      color: #fff;
      transform: translateX(calc(-100% - 5px));
      position: fixed;
      bottom: 15px;
      font-size: rem(35);
      width: 1.8em;
      line-height: 1.8em;
      background: var(--flag-cl-primary);
      border-radius: 50%;
    }

    @include media(until-m) {
      font-size: rem(23);
    }
  }
}
</style>