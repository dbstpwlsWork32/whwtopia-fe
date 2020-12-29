<template>
<section id="view-post" class="atom_content atom_card">
  <div id="view-post__header" class="s_cl-reset">
    <h2 class="_title">제목</h2>

    <div class="s_cl-sub _desc">
      <ripple-btn class="atom_profile" aria-label="view writer's profile"></ripple-btn>
      <div class="_desc__right">
        <p>작성자</p>
        <p>{{ $formatDate(new Date()) }}</p>
      </div>
    </div>
    <p class="s_cl-sub s_mt-content">조회: {{ $formatNumber(99) }}</p>
  </div>

  <div id="view-post__content">
    ㅁㅇㄴㅇㄴㅁ
    ㅁㅇㄴㅇㄴㅁㅁㄴㅇ
    ㅁㄴㅇ
    ㅁㄴㅇ
    ㅁㅇㄴㅇㄴㅁ
  </div>

  <div id="view-post__action">
    <ripple-btn class="_heart">
      <font-awesome-icon icon="heart" />
      <p>1111111111</p>
    </ripple-btn>
    <ripple-btn>
      <font-awesome-icon icon="save" />
      <p>저장</p>
    </ripple-btn>
    <ripple-btn>
      <font-awesome-icon icon="flag" />
      <p>신고</p>
    </ripple-btn>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'viewPost',
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