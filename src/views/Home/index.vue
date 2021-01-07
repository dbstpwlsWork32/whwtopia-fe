<template>
<div id="view-home" class="atom_ct-width">
  <whw-preview-item
    v-for="post in posts"
    :key="`post-${post.id}`"
    :post="post"
    class="_whw-post"
  />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WhwPreviewItem from '@/components/WhwPost/PreviewListItem.vue'

const samplePosts: WhwPostPreviewItem[] = [
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
    views: 100,
    gallery: {
      id: 1,
      name: '갤러리이름'
    }
  },
  {
    id: 1,
    title: '제목2',
    date: new Date(),
    content: '컨텐츠2',
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
    WhwPreviewItem
  }
})
</script>

<style lang="scss">
#view-home {
  & > ._whw-post {
    margin-bottom: 10px;
  }
}
</style>