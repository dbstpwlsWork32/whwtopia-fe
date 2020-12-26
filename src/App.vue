<template>
  <header id="or__header">
    <h1 class="logo">
      <a href="/">
        <img :src="require('@images/logo.png')" :srcset="`${require('@images/logo.png')} 1x, ${require('@images/logo@2x.png')} 2x`" alt="wellcome to whw" />
      </a>
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
  <router-view/>
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
#or__header {
  padding: 0 20px;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-primary);
  .search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 486px;
    height: 32px;
    margin: 0 12px;
    font-weight: 700;
    overflow: hidden;
    background-color: #DCD9F8;
    color: #4E41DB;
    input {
      padding: 0 10px;
    }
    button {
      width: 80px;
      align-self: stretch;
      text-align: center;
      color: var(--ft-cl-white);
      background: #8F75D9;
    }
  }
  .profile {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--ft-cl-white);
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
