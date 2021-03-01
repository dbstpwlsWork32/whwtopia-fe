<template>
<div id="view-home" class="m_ct-width">
  <PostPreview :posts="posts" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostPreview from '@/components/PostPreview/index.vue'
import { updateFLOATINGMENU } from '@/Store/floatingMenu'
import { useRouter } from 'vue-router'

const samplePosts: WhwPostPreviewItem[] = [
  {
    id: 0,
    userInfo: {
      id: 1,
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeuBaTW1dzHWLBe21HwCvOYbsBfKsGEkslA&usqp=CAU',
      name: 'rornfl'
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
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeuBaTW1dzHWLBe21HwCvOYbsBfKsGEkslA&usqp=CAU',
      name: 'rornfl'
    },
    comments: 20000,
    likes: 2000,
    views: 200
  }
]

export default defineComponent({
  name: 'viewsHome',
  setup() {
    const router = useRouter()
    updateFLOATINGMENU({
      cb() { router.push('/newpost') },
      label: 'write post',
      role: 'link'
    })
    return {
      posts: samplePosts
    }
  },
  components: {
    PostPreview
  }
})
</script>

<style lang="scss">
#view-home {
  @include media(over-t) {
    padding: 0 10px;
  }
  & > ._whw-post {
    margin-bottom: 10px;
  }
}
</style>