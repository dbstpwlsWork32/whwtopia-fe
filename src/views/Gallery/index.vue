<template>
  <modal cover v-model:display="createGalleryDisplay">
    <article id="v-gallery__modal-create" class="m_ct">
      <h2 class="s_ft-si-up-2 _title">갤러리 창설</h2>

      <input type="text" maxlength="20" v-mounted-focus placeholder="갤러리 이름" />
      <input type="text" maxlength="10" placeholder="갤러리 카테고리" />

      <div class="_list-wrap">
        <h3 class="s_ft-si-up-1">갤러리를 창설하신 운영자님께는 다음과 같은 권한이 있습니다^^</h3>
        <ol class="s_ft-cl-sub _list">
          <li>갤러리 내 게시글 삭제</li>
          <li>갤러리 내 댓글 삭제</li>
          <li>갤러리 내 공지 등록</li>
        </ol>
        <p class="s_ft-si-down-1">위와같은 권한을 얻는만큼 책임감을 갖고 운영해주시길 바라며 PC방등의 공용시설에 로그인할때 장치기억을 해제해주시길... 화이팅!</p>
      </div>

      <button class="s_btn-base" v-ripple-effect v-click-sync="register">등록</button>
    </article>
  </modal>

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
import { defineComponent, ref } from 'vue'
import { updateFLOATINGMENU } from '@/Store/floatingMenu'
import Modal from '@/components/Modal.vue'

import CATEGORY from '@/api/category'

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

function useCreateGalleryModal() {
  const createGalleryDisplay = ref(false)

  async function register() {
    const a = await CATEGORY.getAll()
    console.log(a)
  }

  return {
    createGalleryDisplay,
    register
  }
}

export default defineComponent({
  name: 'v-gallery',
  setup() {
    const { createGalleryDisplay, register } = useCreateGalleryModal()

    updateFLOATINGMENU({
      cb() { createGalleryDisplay.value = true },
      label: 'create gallery',
      role: 'button'
    })

    return {
      categorys: sampleData,
      createGalleryDisplay,
      register
    }
  },
  components: {
    Modal
  }
})
</script>

<style lang="scss">
#v-gallery__modal-create {
  max-width: 100%;
  width: 800px;
  border-radius: 8px;
  background: var(--bg-sub);

  & > ._title {
    color: var(--flag-cl-primary);
    margin-bottom: 1em;
  }

  & > ._list-wrap {
    border-top: 1px solid var(--br-cl);
    border-bottom: 1px solid var(--br-cl);
    padding: .5em;
    margin-bottom: 1em;

    & > ._list {
      margin: .5em 0;
      li {
        padding-left: 8px;
        position: relative;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          width: 5px;
          height: 5px;
          margin-top: -1.5px;
          background: var(--ft-cl-sub);
          border-radius: 50%;
        }
      }
    }
  }

  button, input {
    border-radius: 5px;
  }

  input {
    padding: var(--ct-indent-vert) var(--ct-indent);
    background: var(--bg-sub-2);
    margin-bottom: 1em;
  }
  button {
    display: block;
    width: 100%;
  }
}

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