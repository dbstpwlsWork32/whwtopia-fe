<template>
<div class="atom_card">
  <h2 class="s_mb-content"><slot name="title"></slot></h2>
  <template v-if="posts.length">
    <ol>
      <li v-for="post in posts" :key="`post-${post.id}`" class="atom_list">
        <router-link :to="`/post/${post.id}`">
          <div class="atom_list__top">
            <h3 class="s_cl-base _left">{{ post.title }}</h3>
            <p class="s_cl-sub _right">{{ post.date }}</p>
          </div>
          <div class="atom_list__bottom">
            <p class="_left">{{ post.gallary }}</p>
            <p class="s_cl-sub _right">{{ post.writer }}</p>
          </div>
          <div class="s_cl-sub atom_list__footer">
            <div class="_details">
              <p><font-awesome-icon icon="eye" aria-label="view :" /> {{post.detail.view}}</p>
              <p><font-awesome-icon icon="thumbs-up" aria-label="like :" /> {{post.detail.like}}</p>
            </div>
            <div class="_tags">
              <p
                v-for="(tag, index) in post.tags" :key="`post-${post.id}-tag${index}`"
              >#{{tag}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ol>
    <router-link to="/" class="_more s_mt-content">더보기</router-link>
  </template>
  <div style="text-align: center; padding-top: .5rem" v-else>
    <img
      :src="require('@assets/images/char/empty.png')"
      :srcset="`${require('@assets/images/char/empty.png')} 1x, ${require('@assets/images/char/empty@2x.png')} 2x`"
      alt="empty content"
    />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'viewsHome_Card',
  props: {
    posts: Array
  }
})
</script>

<style lang="scss" scoped>
.atom_card {
  min-width: 0;
  padding-bottom: 0;
  overflow: hidden;
}
._title {
  svg {
    margin-right: .1em;
  }
}
._more {
  display: block;
  color: var(--ft-cl-white);
  line-height: rem(36);
  background: var(--blue);
  width: calc(100% + var(--content-gap) * 2);
  text-align: center;
  position: relative;
  left: calc(-1 * var(--content-gap));
}
</style>
