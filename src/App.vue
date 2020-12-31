<template>
  <div id="or__header__wrap">
    <header id="or__header">
      <h1>
        <router-link to="/">
          <img class="s_hidden-not-pc" :src="require('@images/logo.png')" :srcset="`${require('@images/logo.png')} 1x, ${require('@images/logo@2x.png')} 2x`" alt="wellcome to whw" />
          <img class="s_hidden-pc" :src="require('@images/m_logo.png')" :srcset="`${require('@images/m_logo.png')} 1x, ${require('@images/m_logo@2x.png')} 2x`" alt="wellcome to whw" />
        </router-link>
      </h1>

      <nav class="s_cl-reset _center">
        <router-link to="/whw_list" aria-label="gallery tour">
          <span class="s_hidden-m">둘러보기</span>
          <font-awesome-icon icon="compass" class="s_hidden-t s_hidden-pc" />
        </router-link>
        <button @click="searchOpen">
          <span class="s_hidden-m">검색</span>
          <font-awesome-icon icon="search" class="s_hidden-t s_hidden-pc" />
        </button>
      </nav>
      <div class="search-box s_radius-4" v-if="isSearchOpen" @click="e => e.stopPropagation()">
        <button @click="searchClose">
          <font-awesome-icon icon="arrow-left" />
        </button>
        <input
          class="search"
          type="text"
          placeholder="Search"
          v-model="searchValue"
          @keydown.esc="searchClose"
          ref="searchDom"
        />
      </div>

      <div class="_right">
        <ripple-btn aria-label="notify" class="_notify">
          <font-awesome-icon icon="bell"></font-awesome-icon>
        </ripple-btn>
        <ripple-btn class="atom_profile" aria-label="view profile">
        </ripple-btn>
      </div>
    </header>
  </div>
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

const isSearchOpen = ref(false)
const searchValue = ref('')
const searchDom = ref<HTMLInputElement>()

export default defineComponent({
  setup() {
    const searchClose = () => {
      isSearchOpen.value = false
      document.removeEventListener('click', searchClose)
      if (searchValue.value) searchValue.value = ''
    }
    const searchOpen = (e: MouseEvent) => {
      e.stopPropagation()
      isSearchOpen.value = true
      document.addEventListener('click', searchClose)
      nextTick(() => {
        (searchDom.value as HTMLInputElement).focus()
      })
    }
    return {
      isSearchOpen,
      searchOpen,
      searchClose,
      searchValue,
      searchDom
    }
  }
})
</script>

<style lang="scss">

$height: 60px;
#or__header__wrap {
  background: var(--bg-header);
}
#or__header {
  margin-bottom: rem(40);
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  padding: 0 var(--content-indent);
  display: flex;
  height: $height;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @include media(until-m) {
    margin-bottom: rem(20);
  }
  .search-box {
    display: flex;
    overflow: hidden;
    position: absolute;
    z-index: 10;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    border: var(--st-border);
    width: 100%;
    max-width: 700px;
    height: $height;
    font-weight: $ft-bold;
    background-color: var(--bg-base);
    align-items: center;
    input {
      padding-right: 10px;
    }
    button {
      width: 50px;
      align-self: stretch;
      text-align: center;
    }
  }

  & > ._right {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    ._notify {
      padding: 10px;
      color: var(--ft-cl-white-stance);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 1em;
      font-size: 20px;
      @include media(until-m) {
        margin-right: 5px;
      }

      svg {
        transform: translateY(-4px);
      }
    }
  }

  & > ._center {
    margin-left: 12px;
    margin-right: 10px;
    font-size: var(--ft-si-title-18);
    color: var(--ft-cl-white-stance);
    & > a {
      margin-right: 30px;
    }

    .router-link-exact-active {
      cursor: default;
      opacity: .7;
    }

    @include media(until-m) {
      font-size: 20px;
      & > a {
        margin-right: 20px;
      }
    }
  }
}
</style>
