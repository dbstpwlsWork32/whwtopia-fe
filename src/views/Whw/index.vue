<template>
  <div class="atom_card atom_content">
    <post-li :posts="posts">
      <template v-slot:title>
        <h2>갤러리! dasasd  asdasd  asddas asd  asd asddas das awsd dsa sad das daws  asd</h2>
      </template>
    </post-li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostLi from '@/components/atoms/PostLi.vue'

const sample = [
        {
          id: 0,
          title: '제목',
          date: new Date(),
          gallary: '갤러리',
          writer: '작성자',
          tags: ['태그1', '태그2', '태그3'],
          like: 1000,
          view: 1000
        },
        {
          id: 1,
          title: '존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목',
          date: new Date(),
          gallary: '존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리',
          writer: '존나긴 작성자존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리',
          tags: ['태그1', '태그2', '태그3', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4'],
          like: 2000,
          view: 2000
        }
      ]

export default defineComponent({
  name: 'view_whw-home',
  setup() {
    return {
      posts: sample
    }
  },
  components: {
    PostLi
  }
})
</script>