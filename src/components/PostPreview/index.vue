<template>
<div class="com_post-preview m_ct-width">
  <item
    v-for="post in posts"
    :key="`post-${post.id}`"
    :post="post"
    class="_whw-post"
  />
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
}
</style>