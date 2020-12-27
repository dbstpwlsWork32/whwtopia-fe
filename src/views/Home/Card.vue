<template>
<div class="atom_card m__card_list">
  <h2 class="_title"><slot name="title"></slot></h2>
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
          <p><font-awesome-icon icon="eye" aria-label="view :" /> {{post.detail.view}}</p>
          <p><font-awesome-icon icon="thumbs-up" aria-label="like :" /> {{post.detail.like}}</p>
          <div class="_tags">
            <p
              v-for="(tag, index) in post.tags" :key="`post-${post.id}-tag${index}`"
            >#{{tag}}</p>
          </div>
        </div>
      </router-link>
    </li>
  </ol>
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
._title {
  svg {
    margin-right: .1em;
  }
}
</style>
