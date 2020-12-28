<template>
  <div id="or__header__wrap">
    <header id="or__header">
      <h1 class="logo">
        <router-link to="/">
          <img class="s_hidden-not-pc" :src="require('@images/logo.png')" :srcset="`${require('@images/logo.png')} 1x, ${require('@images/logo@2x.png')} 2x`" alt="wellcome to whw" />
          <img class="s_hidden-pc" :src="require('@images/m_logo.png')" :srcset="`${require('@images/m_logo.png')} 1x, ${require('@images/m_logo@2x.png')} 2x`" alt="wellcome to whw" />
        </router-link>
      </h1>

      <button @click="searchOpen">검색</button>
      <div class="search-box s_radius-4" v-if="isSearchOpen">
        <input
          class="search"
          type="text"
          placeholder="Search"
          v-model="searchValue"
          @click="e => e.stopPropagation()"
          @keydown.esc="searchClose"
          ref="searchDom"
        />
        <Button>
          <font-awesome-icon icon="search" />
        </Button>
      </div>

      <div class="_right">
        <Button aria-label="notify" class="notify">
          <font-awesome-icon icon="bell"></font-awesome-icon>
        </Button>
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
import Button from '@/components/RippleEffect.vue'

const isSearchOpen = ref(false)
const searchValue = ref('')
const searchDom = ref<HTMLInputElement>()

export default defineComponent({
  setup() {
    const searchClose = () => {
      isSearchOpen.value = false
      document.removeEventListener('click', searchClose)
    }
    const searchOpen = (e: MouseEvent) => {
      e.stopPropagation()
      isSearchOpen.value = true
      document.addEventListener('click', searchClose)
      nextTick(() => {
        searchDom.value!.focus()
      })
    }
    return {
      isSearchOpen,
      searchOpen,
      searchClose,
      searchValue,
      searchDom
    }
  },
  components: {
    Button
  }
})
</script>

<style lang="scss">

#or__header__wrap {
  background: var(--bg-header);
}
#or__header {
  margin-left: auto;
  margin-right: auto;
  max-width: 1920px;
  padding: 0 var(--content-indent);
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  .search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 486px;
    height: 32px;
    margin: 0 12px;
    font-weight: 700;
    overflow: hidden;
    background-color: var(--purple-1);
    color: var(--ft-cl-blue);
    input {
      padding: 0 10px;
    }
    button {
      width: 80px;
      align-self: stretch;
      text-align: center;
      color: var(--ft-cl-white);
      background: var(--purple-2);
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
}
</style>
