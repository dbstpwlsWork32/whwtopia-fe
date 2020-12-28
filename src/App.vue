<template>
  <div id="or__header__wrap">
    <header id="or__header">
      <h1 class="logo">
        <router-link to="/">
          <img class="s_hidden-not-pc" :src="require('@images/logo.png')" :srcset="`${require('@images/logo.png')} 1x, ${require('@images/logo@2x.png')} 2x`" alt="wellcome to whw" />
          <img class="s_hidden-pc" :src="require('@images/m_logo.png')" :srcset="`${require('@images/m_logo.png')} 1x, ${require('@images/m_logo@2x.png')} 2x`" alt="wellcome to whw" />
        </router-link>
      </h1>
      <div class="search-box s_radius-4">
        <input class="search" type="text" placeholder="Search" />
        <Button>
          <font-awesome-icon icon="search" />
        </Button>
      </div>
      <div class="profile">
      </div>
    </header>
  </div>
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/RippleEffect.vue'

export default defineComponent({
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
    flex-shrink: 0;
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
}
</style>
