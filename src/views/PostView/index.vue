  <template>
<section id="post-view" class="atom_ct-width">
  <div class="atom_ct-indent s_ft-cl-sub _head">
    <h2 class="s_ft-si-up-2 s_ft-cl-base">타이틀</h2>
    <p class="s_ft-cl-base">작성자</p>
    <p class="_date">{{$formatDate(new Date())}}</p>
    <div class="_info">
      <p aria-label="view count"><font-awesome-icon icon="eye" /> {{$formatNumberFlag(20000)}}</p>
      <p aria-label="comment count"><font-awesome-icon icon="comment"/> {{$formatNumberFlag(200)}}</p>
    </div>
    <router-link v-ripple-effect to="/user/0" class="_profile atom_profile" aria-label="go writer profile page">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU" alt="writer profile">
    </router-link>
  </div>
  <div class="atom_ct-indent">
    <p>asddas</p>

    <div class="post-view__user-control">
      <button v-ripple-effect @click="isLiked = !isLiked" class="_like">
        <font-awesome-icon icon="heart" v-if="isLiked"/>
        <font-awesome-icon :icon="['far', 'heart']" v-else/>
      </button>
      <p>{{$formatNumber(20000)}}</p>
    </div>
  </div>

  <comments-section />
</section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CommentsSection from './CommentsSection.vue'

export default defineComponent({
  name: 'view_post-view',
  setup() {
    const isLiked = ref(false)

    return {
      isLiked
    }
  },
  components: {
    CommentsSection
  }
})
</script>

<style lang="scss">
#post-view {
  & > ._head {
    display: grid;
    border-bottom: 1px solid var(--br-cl);
    margin-bottom: 5px;
    grid-template-columns: auto 1fr 1fr;
    gap: 3px 10px;
    align-items: center;
    & > :not(h2) {
      font-size: var(--ft-si-down-1);
    }

    & > h2 {
      grid-column: 2 / 4;
    }
    & > ._date {
      text-align: right;
    }
    & > ._info {
      display: flex;
      gap: 10px;
    }
    & > ._profile {
      flex-shrink: 0;
      grid-row: 1 / 4;
      width: 60px;
      height: 60px;

      @include media(until-m) {
        width: 50px;
        height: 50px;
      }
    }
  }

  .post-view__user-control {
    margin-top: 10px;
    text-align: center;
    button {
      font-size: 35px;
      position: relative;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      overflow: hidden;
      &:hover, &:focus-visible {
        &::after {
          opacity: .2;
        }
      }
      &::after {
        position: absolute;
        display: block;
        content: '';
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: currentColor;
        transition: opacity var(--ani-2);
        opacity: 0;
      }

      &._like {
        color: var(--cl-red);
      }
    }
  }
}
</style>