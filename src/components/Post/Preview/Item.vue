<template>
<router-link :to="`/post/${post.id}`" aria-label="go post detail" class="com_post_preview_item-wrap">
  <section class="com_post_preview_item atom_ct-indent">
    <div class="_head">
      <h2 class="atom_text-ellipsis s_ft-si-up-2">{{post.title}}</h2>
      <p class="s_ft-cl-sub">{{post.userInfo.name}}</p>
      <div class="_info">
        <router-link :to="`/gallery/${post.gallery.id}`" class="atom_text-ellipsis s_ft-si-down-1" v-if="post.gallery">{{post.gallery.name}}</router-link>
        <p class="s_ft-si-down-1 s_ft-cl-sub">{{$formatDateFlag(post.date)}}</p>
      </div>
      <router-link :to="`/user/${post.userInfo.id}`" class="_writer">
        <div class="com_post_preview_item__writer-pr atom_profile">
          <img :src="post.userInfo.imgUrl" alt="writer profile">
        </div>
      </router-link>
    </div>
    <div class="se_post-comment">
      <img src="https://storage.matsurihi.me/mltd_ko/card_bg/016tsu0034_0.png" alt="">
      asdkl;dsalk;sad;lkdskl;dsa;kldsa;kldaskl;dsa;lkdsa;kldsakl;das;lkdask;ldsa;kldas;kldas;kldas;klasdkl;dsalk;sad;lkdskl;dsa;kldsa;kldaskl;dsa;lkdsa;kldsakl;das;lkdask;ldsa;kldas;kldas;kldas;klasdkl;dsalk;sad;lkdskl;dsa;kldsa;kldaskl;dsa;lkdsa;kldsakl;das;lkdask;ldsa;kldas;kldas;kldas;klasdkl;dsalk;sad;lkdskl;dsa;kldsa;kldaskl;dsa;lkdsa;kldsakl;das;lkdask;ldsa;kldas;kldas;kldas;klasdkl;dsalk;sad;lkdskl;dsa;kldsa;kldaskl;dsa;lkdsa;kldsakl;das;lkdask;ldsa;kldas;kldas;kldas;kl
    </div>
    <div class="_user-handle atom_text-ellipsis">
      <p aria-label="like count"><font-awesome-icon icon="heart"/> {{$formatNumberFlag(post.likes)}}</p>
      <p aria-label="comment count"><font-awesome-icon icon="comment"/> {{$formatNumberFlag(post.comments)}}</p>
      <p aria-label="view count"><font-awesome-icon icon="eye" /> {{$formatNumberFlag(post.views)}}</p>
    </div>
  </section>
</router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'com_post_preview_item',
  props: {
    post: {
      type: Object as PropType<WhwPostPreviewItem>,
      required: true
    }
  }
})
</script>

<style lang="scss">
.com_post_preview_item {
  cursor: pointer;
  transition: background-color var(--ani-2);
  background-color: transparent;
  border: 1px solid var(--br-cl);
  &:hover {
    background-color: var(--bg-hover);
  }

  &-wrap {
    color: var(--cl-base);
    display: block;
  }

  &__writer-pr {
    width: 70px;
    height: 70px;
    @include media(until-m) {
      width: 50px;
      height: 50px;
    }
  }

  & > ._head {
    text-align: center;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 3px 10px;
    text-align: left;
    align-items: center;
    margin-bottom: 20px;
    @include media(until-m) {
      margin-bottom: 10px;
    }
    & > ._writer {
      grid-row: 1 / 4;
    }
    & > ._info {
      display: flex;
      min-width: 0;
      gap: 5px;
      a {
        display: inline;
      }
      p {
        flex-shrink: 0;
        margin-left: auto;
      }
    }
  }

  & > ._user-handle {
    margin-top: var(--ct-indent-vert);
    display: flex;
    // gap is not apply at samsung browser ssibal
    // gap: var(--gap-20-10);
    p {
      margin-right: var(--gap-20-10);
      &:last-child {
        margin-right: 0;
      }
    }
  }

  @include media(until-t) {
    border-left: none;
    border-right: none;
  }
}
</style>