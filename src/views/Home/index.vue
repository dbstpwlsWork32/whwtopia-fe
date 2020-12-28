<template>
<div class="atom_content">
  <div id="view-home__notify" class="s_mt-content">
    <card-list
      :posts="posts"
    >
      <template v-slot:title>
        <font-awesome-icon icon="fire" class="s_cl-red" /> 뜨거운 WHW
      </template>
    </card-list>
    <card-list
      :posts="posts"
    >
      <template v-slot:title>
        <font-awesome-icon icon="stopwatch" class="s_cl-blue" /> 실시간 WHW
      </template>
    </card-list>
  </div>

  <div id="view-home__sub">
    <article class="_rank atom_card_indent-small s_mt-article s_cl-reset">
      <h2 class="_rank__title s_mb-content s_ft-si-title-2">잘팔리는 갤러리</h2>
      <ul>
        <li v-for="(rank, index) in ranks" :key="`rank-${rank.id}`">
          <router-link to="/" class="_rank__li">
            <div class="_rank">{{ index + 1 }}</div>
            <div class="_text">{{ rank.title }}</div>
            <div class="_change" :class="{'up': rank.change > 0, 'down': rank.change < 0}">
              <template v-if="rank.change">
                <font-awesome-icon :icon="rank.change > 0 ? 'caret-up' : 'caret-down'"></font-awesome-icon>
                {{rank.change.toString().replace('-', '')}}
              </template>
              <template v-else>-</template>
            </div>
          </router-link>
        </li>
      </ul>
    </article>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/moment'
import CardList from './CardList.vue'

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
    CardList
  }
})
</script>

<style lang="scss" scoped>
#view-home__notify {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--content-gap);
  & > div {
    min-width: 0;
  }

  @include media(until-m) {
    grid-template-columns: 1fr;
  }
}

#view-home__sub {
  display: grid;
  grid-template-columns: repeat(3, 200px);

  ._rank {
    &__title {
      padding-bottom: var(--content-gap-vert-15);
      border-bottom: 1px dashed var(--border-cl);
    }
    &__li {
      margin-top: .4rem;
      display: flex;
      ._rank {
        width: 15px;
        text-align: center;
        background: var(--blue-1);
        color: var(--white);
      }
      ._text {
        @include text-ellipsis;
        margin: 0 .4em;
      }
      ._change {
        font-size: var(--ft-si-sub);
        margin-left: auto;
        &.up {
          color: var(--ft-cl-red);
        }
        &.down {
          color: var(--ft-cl-blue);
        }
      }
      ._rank, ._change {
        flex-shrink: 0;
      }
    }
  }
}
</style>