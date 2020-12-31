<template>
<section id="view-post" class="atom_content atom_card">
  <div id="view-post__header" class="s_cl-reset">
    <h2 class="_title">{{postInfo.title}}</h2>

    <div class="s_cl-sub _desc">
      <ripple-btn class="atom_profile" :aria-label="`${postInfo.writer} profile`"></ripple-btn>
      <div class="_desc__right">
        <p>{{postInfo.writer}}</p>
        <p>{{ $formatDate(postInfo.date) }}</p>
      </div>
    </div>
    <p class="s_cl-sub s_mt-content">조회: {{ $formatNumberFlag(postInfo.view) }}</p>
  </div>

  <div id="view-post__content">{{postInfo.content}}</div>

  <div id="view-post__tags" class="s_mt-content">
    <p
      v-for="(tag, index) in postInfo.tags" :key="`tag-${index}`"
    >#{{tag}}</p>
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
    <ripple-btn class="_emotion">
      <font-awesome-icon icon="lungs" />
      <p>감정</p>
    </ripple-btn>
  </div>

  <article id="view-post__comments">
    <h3 class="s_mt-content s_mb-content">댓글 <span class="s_cl-red">({{comments.length}})</span></h3>

    <div class="_write-comment">
      <div class="atom_input" contenteditable="true" aria-multiline="true" role="textbox" aria-label="댓글 작성"></div>
      <ripple-btn class="_register">작성</ripple-btn>
    </div>

    <ul class="a_comment-wrap">
      <li class="a_comment" v-for="comment in comments" :key="`comment-${comment.id}`">
        <ripple-btn class="atom_profile" aria-label="someone profile"></ripple-btn>
        <div class="a_comment__right">
          <div class="_top">
            <p>{{comment.user}}</p>
            <p class="_date">{{$formatDate(comment.date)}}</p>
          </div>
          <p class="a_comment">{{comment.comment}}</p>
        </div>
      </li>
    </ul>
  </article>

  <article id="view-post__more" class="atom_card__divide">
    <h2 class="_title">다른글 보기</h2>
    <post-li :posts="posts" />
  </article>
</section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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

import useUserActive from './hooks/UserActive'

const postInfo = reactive<displayViewPost>({
  title: '제목',
  writer: '작성자',
  date: new Date(),
  tags: ['태그1', '태그2'],
  like: 1000,
  view: 1000,
  content: ' asddas asdasd sad asd  sadsdaads sad sad '
})

const smapleComments = [
  {
    id: 1,
    user: '작성자',
    date: new Date(),
    comment: 'asdasdasd'
  }
]

export default defineComponent({
  name: 'viewPost',
  setup() {
    const { userActive, toggleLike, toggleReport, toggleSave } = useUserActive()
    return {
      postInfo,
      userActive,
      toggleReport,
      toggleLike,
      toggleSave,
      comments: smapleComments,
      posts: sample
    }
  },
  components: {
    PostLi
  }
})
</script>

<style lang="scss">
#view-post {
  .atom_profile {
    flex-shrink: 0;
    border-color: var(--border-cl);
    color: var(--border-cl);
  }
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
      ._desc__right {
        margin-left: .7em;
      }
    }
  }

  #view-post__tags {
    display: flex;
    gap: 5px;
    color: var(--ft-cl-blue);
    font-size: var(--ft-si-sub);
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
      &:not(._emotion) {
        color: var(--ft-cl-sub);
      }
      &:hover {
        color: var(--ft-cl-base);
      }
    }
    ._heart {
      flex-shrink: 0;
      &.sc_active {
        color: var(--ft-cl-red);
      }
    }
    ._save.sc_active {
      color: var(--ft-cl-blue)
    }
    ._report.sc_active {
      color: var(--ft-cl-purple)
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

  &__comments {
    & > ._write-comment {
      ._register {
        margin-bottom: var(--content-gap-vert);
        margin-top: 5px;
        width: 80px;
        line-height: 35px;
        background: var(--ft-cl-red);
        color: var(--ft-cl-white-stance);
      }
    }

    .atom_input::after {
      color: var(--ft-cl-blue);
    }

    .a_comment-wrap {
      & > .a_comment {
        margin-bottom: 10px;
      }
    }
    .a_comment {
      display: flex;
      align-items: center;
      .a_comment__right {
        margin-left: 10px;
        & > ._top {
          display: flex;
          align-items: center;
          & > ._date {
            margin: 4px;
            color: var(--ft-cl-sub);
            font-size: var(--ft-si-sub);
          }
        }
      }
    }
  }

  &__more {
    margin-top: var(--article-gap-vert-60);
    &::before {
      margin-bottom: var(--article-gap-vert);
    }

    & > ._title {
      margin-bottom: 10px;
    }
  }
}
</style>