<template>
  <article class="_rank atom_card_indent-small s_cl-reset">
    <h3 class="_rank__title s_mb-content s_ft-si-title-2">{{title}}</h3>
    <ul>
      <li v-for="(rank, index) in ranks" :key="`rank-${rank.id}`">
        <router-link to="/" class="_rank__li">
          <div class="_rank">{{ index + 1 }}</div>
          <div class="_text">{{ rank.title }}</div>
          <div class="_change" :class="{'up': rank.change > 0, 'down': rank.change < 0}">
            <template v-if="rank.change">
              <font-awesome-icon :icon="rank.change > 0 ? 'caret-up' : 'caret-down'"></font-awesome-icon>
              {{rank.change.toString().replace('-', '')}}
            </template>
            <template v-else>-</template>
          </div>
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'vieHome_CardRank',
  props: ['ranks', 'title']
})
</script>

<style lang="scss" scoped>
._rank {
  min-width: 0;
  &__title {
    padding-bottom: var(--content-gap-vert-15);
    border-bottom: 1px dashed var(--border-cl);
  }
  &__li {
    margin-top: .4rem;
    display: flex;
    ._rank {
      width: 15px;
      text-align: center;
      background: var(--blue-1);
      color: var(--white);
    }
    ._text {
      @include text-ellipsis;
      margin: 0 .4em;
    }
    ._change {
      font-size: var(--ft-si-sub);
      margin-left: auto;
      &.up {
        color: var(--ft-cl-red);
      }
      &.down {
        color: var(--ft-cl-blue);
      }
    }
    ._rank, ._change {
      flex-shrink: 0;
    }
  }
}
</style>