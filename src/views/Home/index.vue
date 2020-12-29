<template>
<div class="atom_content">
  <div id="view-home__notify" class="s_mt-content">
    <card-list
      :posts="posts"
    >
      <template v-slot:title>
        <font-awesome-icon icon="fire" class="s_cl-red" /> 뜨거운 글
      </template>
    </card-list>
    <card-list
      :posts="posts"
    >
      <template v-slot:title>
        <font-awesome-icon icon="stopwatch" class="s_cl-blue" /> 실시간 글
      </template>
    </card-list>
  </div>

  <section id="view-home__ranks" class="s_mt-article">
    <h2 class="_title s_mb-content">순위</h2>

    <div class="_content">
      <card-rank :ranks="ranks" title="WHW" />
      <card-rank :ranks="ranks" title="검색어" />
      <card-rank :ranks="ranks" title="Tag" />
      <card-rank :ranks="ranks" title="위키" />
    </div>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/moment'
import CardList from './atoms/CardList.vue'
import CardRank from './atoms/CardRank.vue'

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
          tags: ['태그1', '태그2', '태그3', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4', 'tag4'],
          detail: {
            like: 2000,
            view: 2000
          }
        }
      ]

const sampleRank = [
  {
    id: 0,
    title: '갤러리',
    change: 0
  },
  {
    id: 1,
    title: '갤러리 asd dsaads asd a sd adsadsa dsad sasd asdads asc sddas  das',
    change: 1
  },
  {
    id: 2,
    title: '갤러리 asd dsaads asd a sd adsadsa dsad sasd asdads asc sddas  das',
    change: -1
  }
]

export default defineComponent({
  name: 'viewsHome',
  data(): { posts: displayHomePost[]; ranks: typeof sampleRank } {
    return {
      posts: sample.map(e => ({ ...e, date: formatDate(e.date) })),
      ranks: sampleRank
    }
  },
  components: {
    CardList,
    CardRank
  }
})
</script>

<style lang="scss" scoped>
#view-home__notify {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--content-gap);

  @include media(until-m) {
    grid-template-columns: 1fr;
  }
}

#view-home__ranks {
  & > ._content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--content-gap);

    @include media(until-m) {
      grid-template-columns: 1fr;
    }
  }
}
</style>