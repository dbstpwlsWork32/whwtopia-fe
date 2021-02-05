<template>
  <section
    class="v-gallery__category"
    v-for="(category, index) in categorys"
    :key="`v-g-c-${index}`"
  >
    <h2 class="s_ft-si-up-2 _title">{{ category.title }} <span class="s_ft-si-down-1 s_ft-cl-sub">{{ `(${category.items.length})` }}</span> </h2>
    <div class="_items">
      <router-link
        v-for="gallery in category.items"
        :to="`/gallery/${gallery.id}`"
        :key="`v-g-c-${index}-${gallery.id}`"
        class="_item"
      >
        <img :src="gallery.imgUrl" alt="gallery image" v-if="gallery.imgUrl" />
        <h3>{{gallery.name}}</h3>
        <p class="s_ft-si-down-1 s_ft-cl-sub">맴버: {{ $formatNumberFlag(gallery.member) }}명</p>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Gallery {
  id: number;
  name: string;
  member: number;
  imgUrl: string;
}

const sampleData: { title: string; items: Gallery[] }[] = [
  {
    title: '카테고리',
    items: [
      {
        id: 0,
        name: '갤러리1',
        member: 2000,
        imgUrl: 'https://t1.daumcdn.net/cfile/tistory/25501850583EFF4322'
      },
      {
        id: 1,
        name: '갤러리2',
        member: 20000,
        imgUrl: ''
      }
    ]
  },
  {
    title: '카테고리2',
    items: [
      {
        id: 2,
        name: '갤러리123',
        member: 2000,
        imgUrl: 'https://t1.daumcdn.net/cfile/tistory/25501850583EFF4322'
      },
      {
        id: 3,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 31,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 35,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 312,
        name: '아이돌 마스터 밀리언 라이브 스탈렛 시즌',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 341,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 341123,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      },
      {
        id: 3411255,
        name: '프라이데이 나이트 펌프킨 채널',
        member: 20000,
        imgUrl: ''
      }
    ]
  }
]

export default defineComponent({
  name: 'v-gallery',
  setup() {
    return {
      categorys: sampleData
    }
  }
})
</script>

<style lang="scss">
.v-gallery__category {
  padding: 0 var(--ct-indent);
  padding-bottom: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid var(--br-cl);
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }

  & > ._title {
    margin-bottom: .5em;
  }
  & > ._items {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    width: 100%;
    & > ._item {
      position: relative;
      border: 1px solid var(--br-cl);
      border-radius: 5px;
      z-index: 0;
      padding: .5em .8em;
      color: #fff;
      @extend %s_img-fit;
  
      &:hover, &:focus {
        img {
          transform: scale(1.1);
        }
      }
  
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background: rgba(0, 0, 0, .8);
      }
      img {
        transition: transform var(--ani-3);
        transform: scale(1);
        top: 0;
        left: 0;
        position: absolute;
        z-index: -1;
      }

      h3 {
        margin-bottom: .5em;
        @include media(until-m) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>