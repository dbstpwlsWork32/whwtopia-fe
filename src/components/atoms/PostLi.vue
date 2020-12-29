<template>
  <ol>
    <li v-for="post in posts" :key="`post-${post.id}`" class="atom_list">
      <router-link :to="`/post/${post.id}`">
        <div class="atom_list__top">
          <h3 class="s_cl-base _left">{{ post.title }}</h3>
          <p class="s_cl-sub _right">{{ $formatDate(post.date) }}</p>
        </div>
        <div class="atom_list__bottom">
          <p class="_left">{{ post.gallary }}</p>
          <p class="s_cl-sub _right">{{ post.writer }}</p>
        </div>
        <div class="s_cl-sub atom_list__footer">
          <div class="_details">
            <p><font-awesome-icon icon="eye" aria-label="view :" /> {{ $formatNumberFlag(post.view) }}</p>
            <p><font-awesome-icon icon="heart" aria-label="like :" /> {{ $formatNumberFlag(post.like) }}</p>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'coms_atoms_postList',
  props: {
    posts: Array
  }
})
</script>