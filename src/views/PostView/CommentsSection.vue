<template>
<section class="m_ct-indent post-view__comment-sec">
  <h3 class="s_ft-si-up-2">댓글 <span class="s_ft-cl-sub s_ft-si-down-1">({{$formatNumber(1000)}})</span></h3>

  <write-comment class="_write" />

  <ul class="post-view__comment-sec__list">
    <li v-for="comment in comments" :key="`comment-${comment.id}`">
      <router-link class="m_profile" :to="`/user/${comment.userInfo.id}`">
        <img :src="comment.userInfo.imgUrl" alt="profile">
      </router-link>
      <div class="post-view__comment-sec__list__side">
        <div class="_top s_ft-si-down-1 s_ft-cl-sub">
          <p>{{comment.userInfo.name}}</p>
          <p>{{$formatDate(comment.date)}}</p>
        </div>
        <p class="_comment se_post-content-base">{{comment.content}}</p>
        <div class="_bottom s_ft-si-down-1">
          <p><font-awesome-icon icon="heart" aria-label="like count" class="s_ft-cl-red" /> {{$formatNumber(comment.likes)}}</p>
          <button class="s_btn-base" @click="visibleReply[comment.id] = !visibleReply[comment.id]">{{ !visibleReply[comment.id] ? '답글' : '취소' }}</button>
        </div>
      </div>
      <article class="_reply-wrap">
        <write-comment class="_write" v-if="visibleReply[comment.id]" />
        <ul class="post-view__comment-sec__list">
          <li v-for="reply in comment.reply" :key="`reply-${reply.id}`">
            <router-link class="m_profile" :to="`/user/${comment.userInfo.id}`">
              <img :src="reply.userInfo.imgUrl" alt="profile">
            </router-link>
            <div class="post-view__comment-sec__list__side">
              <div class="_top s_ft-si-down-1 s_ft-cl-sub">
                <p>{{reply.userInfo.name}}</p>
                <p>{{$formatDate(reply.date)}}</p>
              </div>
              <p class="_comment se_post-content-base">{{reply.content}}</p>
            </div>
          </li>
        </ul>
      </article>
    </li>
  </ul>
</section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import writeComment from './atoms/WriteComment.vue'

const commentsSample: UserComment[] = [
  {
    id: 0,
    userInfo: {
      id: 0,
      name: '이름',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
    },
    date: new Date(),
    content: 'adsdsaasdsda',
    likes: 1020,
    reply: []
  },
  {
    id: 1,
    userInfo: {
      id: 231,
      name: '이름2',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
    },
    date: new Date(),
    content: 'adsdsaasdsdasdasdasd12123aasdasdasddassadasddasdasdasasddasdassadasdasdasddasdsaasddsa',
    likes: 10210,
    reply: [
      {
        id: 0,
        userInfo: {
          id: 123,
          name: '답글',
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
        },
        date: new Date(),
        content: '답글 답글 ㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇㅁㄴ ㅇㅁㄴ asd klsadkl; asd kl;sad ;kldas kl;das kl;asd kl; das kl;sad jklsad kjlsad ljkdas jkl sad ljk dasdhasj das hujkwed uh wqedf gjhkl wqer hkjl qwer hkjl qwer hjkl qwer hkjl qwer hkjl qwer hjkl qwer hkjl qwer lhjk werhjklqwer qwerjhkl  qwerjhkl'
      },
      {
        id: 1,
        userInfo: {
          id: 123,
          name: '답글2',
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU',
        },
        date: new Date(),
        content: '답글 답글 ㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇㅁㄴ ㅇㅁㄴ asd klsadkl; asd kl;sad ;kldas kl;das kl;asd kl; das kl;sad jklsad kjlsad ljkdas jkl sad ljk dasdhasj das hujkwed uh wqedf gjhkl wqer hkjl qwer hkjl qwer hjkl qwer hkjl qwer hkjl qwer hjkl qwer hkjl qwer lhjk werhjklqwer qwerjhkl  qwerjhkl'
      }
    ]
  }
]

export default defineComponent({
  name: 'view_post-view-comments',
  setup() {
    const visibleReply = ref([])
    return {
      comments: commentsSample,
      visibleReply
    }
  },
  components: {
    writeComment
  }
})
</script>

<style lang="scss">

$grid-gap: 10px;
.post-view__comment-sec {
  .m_profile {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    @include media(until-m) {
      width: 40px;
      height: 40px;
    }
  }

  & > ._write {
    margin-top: var(--gap-20-10);
  }

  &__list {
    margin-top: 4em;
    @include media(until-m) {
      margin-top: 2em;
    }
    & > li {
      display: grid;
      gap: $grid-gap;
      margin-top: 1.5em;
      grid-template-columns: auto 1fr;
      & > ._reply-wrap {
        margin-left: 2em;
        grid-column: span 2;
        @include media(until-m) {
          margin-left: 1em;
        }
        .m_profile {
          width: 35px;
          height: 35px;
          @include media(until-m) {
            width: 30px;
            height: 30px;
          }
        }

        & > ._write {
          margin-bottom: 2em;
        }

        .post-view__comment-sec__list {
          margin-top: 0;
          & > li {
            margin-top: .5em;
          }
        }
      }
    }

    &__side {
      flex-grow: 1;
      & > ._top {
        display: flex;
        // gap: $grid-gap;
        p {
          margin-right: $grid-gap;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      & > ._comment {
        margin-top: .2em;
        margin-bottom: .4em;
      }
      & > ._bottom {
        display: flex;
        align-items: center;
        // gap: $grid-gap;
        p {
          margin-right: $grid-gap;
        }
      }
    }
  }
}
</style>