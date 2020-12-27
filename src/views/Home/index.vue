<template>
<div id="view-home" class="atom_content">
  <Card
    :posts="posts"
  >
    <template v-slot:title>
      <font-awesome-icon icon="fire" class="s_cl-red" /> 뜨거운 WHW
    </template>
  </Card>
  <Card
    :posts="posts"
  >
    <template v-slot:title>
      <font-awesome-icon icon="stopwatch" class="s_cl-blue" /> 실시간 WHW
    </template>
  </Card>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/moment'
import Card from './Card.vue'

const sample = [
        {
          id: 0,
          title: '제목',
          date: new Date(),
          gallary: '갤러리',
          writer: '작성자',
          tags: ['태그1', '태그2', '태그3'],
          detail: {
            like: 1000,
            view: 1000
          }
        },
        {
          id: 1,
          title: '존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목',
          date: new Date(),
          gallary: '존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리',
          writer: '존나긴 작성자존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리',
          tags: ['태그1', '태그2', '태그3', 'tag4'],
          detail: {
            like: 2000,
            view: 2000
          }
        }
      ]

export default defineComponent({
  name: 'viewsHome',
  data(): { posts: displayHomePost[] } {
    return {
      posts: sample.map(e => ({ ...e, date: formatDate(e.date) }))
    }
  },
  components: {
    Card
  }
})
</script>

<style lang="scss" scoped>
#view-home {
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // column-gap: var(--content-gap);
}
</style>