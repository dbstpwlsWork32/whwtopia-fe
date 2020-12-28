<template>
  <div id="or__header__wrap">
    <header id="or__header">
      <h1 class="logo">
        <router-link to="/">
          <img class="s_hidden-not-pc" :src="require('@images/logo.png')" :srcset="`${require('@images/logo.png')} 1x, ${require('@images/logo@2x.png')} 2x`" alt="wellcome to whw" />
          <img class="s_hidden-pc" :src="require('@images/m_logo.png')" :srcset="`${require('@images/m_logo.png')} 1x, ${require('@images/m_logo@2x.png')} 2x`" alt="wellcome to whw" />
        </router-link>
      </h1>

      <div class="s_cl-reset _center">
        <button @click="searchOpen">검색</button>
        <router-link to="/">둘러보기</router-link>
      </div>
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
        <ripple-btn aria-label="notify" class="notify">
          <font-awesome-icon icon="bell"></font-awesome-icon>
        </ripple-btn>
        <div class="profile">
        </div>
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
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  padding: 0 var(--content-indent);
  display: flex;
  height: $height;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
    font-weight: 700;
    background-color: var(--white);
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
  .profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--white);
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  & > ._right {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    button {
      padding: 10px;
      color: #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 1em;
      font-size: 20px;
    }
  }

  & > ._center {
    margin: 0 12px;
  }
}
</style>
