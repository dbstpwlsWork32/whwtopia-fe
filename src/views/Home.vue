<template>
  <div class="s_shadow atom_content m__card__list">
    <h2 class="_title"><font-awesome-icon icon="fire" class="s_cl-red" /> 뜨거운 WHW </h2>
    <ul>
      <li v-for="post in posts" :key="`post-${post.id}`" class="atom_list">
        <div class="atom_list__top">
          <h3 class="s_cl-base _left">{{ post.title }}</h3>
          <p class="s_cl-sub _right">{{ post.date }}</p>
        </div>
        <div class="atom_list__bottom">
          <p class="_left">{{ post.gallary }}</p>
          <p class="s_cl-sub _right">{{ post.writer }}</p>
        </div>
        <div class="s_cl-sub atom_list__footer">
          <p><font-awesome-icon icon="eye" aria-label="views :" /> 1000</p>
          <p><font-awesome-icon icon="thumbs-up" aria-label="likes :" /> 1000</p>
          <p class="_tags">
            <router-link to="/"># 태그</router-link>
            <router-link to="/"># 태그2</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
            <router-link to="/"># 태그3</router-link>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatDate } from '@/utils/moment'

type post = {
  id: number;
  title: string;
  date: string;
  gallary: string;
  writer: string;
}

const sample = [
        {
          id: 0,
          title: '제목',
          date: new Date(),
          gallary: '갤러리',
          writer: '작성자'
        },
        {
          id: 1,
          title: '존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목존나긴 제목 존나긴제목',
          date: new Date(),
          gallary: '존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리',
          writer: '존나긴 작성자존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리존나긴 갤러리'
        }
      ]

export default defineComponent({
  name: 'viewsHome',
  data(): { posts: post[] } {
    return {
      posts: sample.map(e => ({ ...e, date: formatDate(e.date) }))
    }
  }
})
</script>

<style lang="scss">
._title {
  svg {
    margin-right: .1em;
  }
}
</style>