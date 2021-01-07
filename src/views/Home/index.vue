<template>
<div id="view-home" class="atom_ct-width">
  <router-link
    v-for="post in posts"
    :key="`post-${post.id}`"
    to="/"
    aria-label="go post detail"
    class="_whw-post"
  >
    <whw-post
      :post="post"
    />
  </router-link>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WhwPost from '@/components/WhwPost.vue'

const samplePosts: WhwPostUnAnounceListItem[] = [
  {
    id: 0,
    userInfo: {
      id: 1,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
      name: '츠바사'
    },
    title: '제목',
    date: new Date(),
    content: '컨텐츠',
    comments: 2000,
    likes: 2000,
    gallery: '갤러리1',
    views: 100
  },
  {
    id: 1,
    title: '제목2',
    date: new Date(),
    content: '컨텐츠2',
    gallery: '갤러리2',
    userInfo: {
      id: 1,
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
      name: '츠바사'
    },
    comments: 20000,
    likes: 2000,
    views: 200
  }
]

export default defineComponent({
  name: 'viewsHome',
  setup() {
    return {
      posts: samplePosts
    }
  },
  components: {
    WhwPost
  }
})
</script>

<style lang="scss">
#view-home {
  & > ._whw-post {
    color: var(--cl-base);
    display: block;
    margin-bottom: 10px;
  }
}
</style>