<template>
<section id="view-post" class="atom_content atom_card">
  <div id="view-post__header" class="s_cl-reset">
    <h2 class="_title">{{postInfo.title}}</h2>

    <div class="s_cl-sub _desc">
      <ripple-btn class="atom_profile" aria-label="view writer's profile"></ripple-btn>
      <div class="_desc__right">
        <p>{{postInfo.writer}}</p>
        <p>{{ $formatDate(postInfo.date) }}</p>
      </div>
    </div>
    <p class="s_cl-sub s_mt-content">조회: {{ $formatNumberFlag(postInfo.view) }}</p>
  </div>

  <div id="view-post__content">
    ㅁㅇㄴㅇㄴㅁ
    ㅁㅇㄴㅇㄴㅁㅁㄴㅇ
    ㅁㄴㅇ
    ㅁㄴㅇ
    ㅁㅇㄴㅇㄴㅁ
  </div>

  <div id="view-post__action">
    <ripple-btn class="_heart" :class="{ 'sc_active': userActive.isLiked }" @click="toggleLike">
      <font-awesome-icon icon="heart" />
      <p>{{$formatNumberFlag(postInfo.like)}}</p>
    </ripple-btn>
    <ripple-btn class="_save" :class="{ 'sc_active': userActive.isSaved }" @click="toggleSave">
      <font-awesome-icon icon="save" />
      <p>저장</p>
    </ripple-btn>
    <ripple-btn class="_report" :class="{ 'sc_active': userActive.isReported }" @click="toggleReport">
      <font-awesome-icon icon="flag" />
      <p>신고</p>
    </ripple-btn>
  </div>

  <article id="view-post__comments">
    <h3>댓글</h3>
  </article>
</section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import useUserActive from './hooks/UserActive'

const postInfo = reactive<displayViewPost>({
  title: '제목',
  writer: '작성자',
  date: new Date(),
  tags: ['태그1', '태그2'],
  like: 1000,
  view: 1000
})

export default defineComponent({
  name: 'viewPost',
  setup() {
    const { userActive, toggleLike, toggleReport, toggleSave } = useUserActive()
    return {
      postInfo,
      userActive,
      toggleReport,
      toggleLike,
      toggleSave
    }
  }
})
</script>

<style lang="scss" scoped>
#view-post {
  &__header {
    padding-bottom: .8em;
    border-bottom: var(--st-border);
    margin-bottom: var(--content-gap-vert);
    & > ._title {
      font-size: rem(25);
      line-height: 1.3em;
      margin-bottom: .5em;
    }
    & > ._desc {
      font-size: var(--ft-si-sub-13);
      display: flex;
      align-items: center;
      .atom_profile {
        flex-shrink: 0;
        border-color: var(--border-cl);
        color: var(--border-cl);
      }
      ._desc__right {
        margin-left: .7em;
      }
    }
  }

  &__action {
    display: flex;
    column-gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: rem(40);
    & > button {
      padding: 10px 20px;
      border-radius: 10px;
      svg {
        font-size: 25px;
        margin-bottom: .2em;
      }
    }
    ._heart {
      flex-shrink: 0;
      &.sc_active {
        color: var(--ft-cl-red);
      }
    }
    ._save.sc_active {
      color: var(--blue)
    }
    ._report.sc_active {
      color: var(--purple)
    }
    @include media(until-m) {
      column-gap: 10px;
      & > button {
        padding: 10px;
        svg {
          font-size: 20px;
        }
      }
    }
  }
}
</style>