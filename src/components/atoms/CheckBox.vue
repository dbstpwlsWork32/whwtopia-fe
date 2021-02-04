<template>
  <div class="atom_checkbox">
    <input type="checkbox" v-model="hug" :id="idKey" />
    <label :for="idKey" class="atom_checkbox__label">
      <div class="_icon-wrap">
        <font-awesome-icon icon="check" class="atom_checkbox__label__icon" />
      </div>
      <slot></slot>
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import makeUniqueKey from '@/utils/makeUniqueKey'

export default {
  name: 'com-atom__checkbox',
  props: {
    value: Boolean
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const hug = ref(props.value)

    watch(hug, () => {
      emit('update:value', hug.value)
    })
    return {
      idKey: makeUniqueKey('com-atom'),
      hug
    }
  }
}
</script>

<style lang="scss">
.atom_checkbox {
  input {
    position: absolute;
    z-index: -1;
    width: 0;
    height: 0;

    &:focus-visible + .atom_checkbox__label {
      box-shadow: var(--btn-focus-shadow);
    }

    &:checked + .atom_checkbox__label .atom_checkbox__label__icon {
      opacity: 1;
    }
  }
  &__label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    outline: none;
    user-select: none;

    ._icon-wrap {
      position: relative;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1px solid var(--br-cl);
      margin-right: .3em;
    }
    &__icon {
      font-size: 14px;
      position: absolute;
      opacity: 0;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

  }
}
</style>