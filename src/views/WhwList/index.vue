<template>
<section class="atom_content">
  <h2>
    "<span class="s_cl-red">{{ $formatNumberFlag(gallerys.length) }}</span>"개의 갤러리에서
    "<span class="s_cl-red">{{ $formatNumberFlag(gallerys.reduce((a, c) => ({user: a.user + c.user}), { user: 0 }).user) }}</span>"명의 사람들이 활동하고 있습니다.
  </h2>

  <div id="whw_list-search">
    <div class="atom_input" aria-label="갤러리 검색" contenteditable="true" role="input" @keydown.enter.prevent></div>
  </div>
  <div id="whw_list__wrap" class="s_mt-content">
    <router-link to="/" v-for="gallery in gallerys" :key="`gal-${gallery.id}`" class="s_cl-reset">
      <article class="whw_list__wrap__card s_radius-10">
        <img :src="gallery.imgUrl" alt="" v-if="gallery.imgUrl">
        <div class="_text">
          <h3>{{gallery.title}}</h3>
          <p><font-awesome-icon icon="user"/> {{$formatNumberFlag(gallery.user)}}</p>
        </div>
      </article>
    </router-link>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const sample = [
  {
    id: 0,
    title: '갤러리 이름 sad dwaasd sad asd asd asd ads asd ads asd asd ads a dsasd a sda sdads asd asd asd asd ads asd a sda sdasd a sd asdasd asd ',
    user: 1000, 
    imgUrl: 'https://66.media.tumblr.com/ad1996d91eee70f4242eef619d1fda24/tumblr_ozrkiiS1Ox1shr96eo3_1280.png'
  },
  {
    id: 1,
    title: '갤러리 이름',
    user: 10000,
    imgUrl: 'https://www.chuing.net/mai/img_character_main/19/805831419186.jpg'
  },
  {
    id: 2,
    title: '갤러리 이름',
    user: 11000
  },
  {
    id: 3,
    title: '갤러리 이름',
    user: 1000
  },
  {
    id: 4,
    title: '갤러리 이름',
    user: 1000
  },
  {
    id: 5,
    title: '갤러리 이름',
    user: 1000
  }
]

export default defineComponent({
  name: 'viewsWhwtList',
  setup() {
    return {
      gallerys: sample
    }
  }
})
</script>

<style lang="scss">
#whw_list-search {
  .atom_input {
    background: var(--bg-base);
    font-size: var(--ft-si-title-16);
    margin-top: var(--content-gap-vert);
  }
}
#whw_list__wrap {
  display: grid;
  gap: var(--content-gap);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  .whw_list__wrap__card {
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
    background: #333333ad;
    @extend %img-fit-cover;
    &:hover img {
      transform: scale(1.2);
    }
    img {
      z-index: -1;
      position: absolute;
      transform: scale(1);
      transition: transform var(--ani-4);
    }
    & > ._text {
      display: flex;
      flex-direction: column;
      top: 50%;
      left: 0;
      right: 0;
      text-align: center;
      transform: translateY(-50%);
      position: absolute;
      color: var(--ft-cl-white-stance);
      padding: 10px;
      h3 {
        font-size: var(--ft-si-base);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      p {
        margin-top: .6em;
      }
    }
  }

  @include media(until-m) {
    grid-template-columns: 1fr;
    gap: var(--content-gap-vert);
    .whw_list__wrap__card {
      padding-bottom: 40px;
      img {
        width: 120px;
        border-right: 2px solid #fff;
      }
      & > ._text {
        text-align: left;
        align-items: center;
        flex-direction: row;
        h3 {
          -webkit-line-clamp: 1;
        }
        p {
          flex-shrink: 0;
          margin-top: 0;
          margin-left: 10px;
        }
      }
    }
  }
} 
</style>