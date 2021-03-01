<template>
<div class="com_input-select">
  <input
    type="text"
    v-model="hug"
    @focus="display = true"
    @blur="display = false"
    :placeholder="placeholder"
    @keydown.up="arrowUp"
    @keydown.down="arrowDown"
    @keydown.enter="selectIndex"
  />
  <modal>
    <div role="listbox" class="com_input-select__list-box" v-show="display">
      <div
        v-for="(item, index) in items"
        :key="`item-${index}`"
        class="com_input-select__list"
        :class="{ active: index === focusIndex }"
        role="listitem"
      >{{ item }}</div>
    </div>
  </modal>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import type { Ref } from 'vue'
import Modal from '../Modal.vue'

type ListItem = {
  id: number | string;
  text: string;
}
type ModelValue = {
  id: number | -1;
  text: string;
}

const useListItem = (items: ListItem[]) => {
  const selectedIndex = ref(-1)
  const focusIndex = ref(-1)

  function arrowUp() {
    const willIndex = focusIndex.value + 1
    if (willIndex > items.length - 1) return false

    focusIndex.value = willIndex
  }
  function arrowDown() {
    const willIndex = focusIndex.value - 1
    if (willIndex < 0) focusIndex.value = 0
    else focusIndex.value = willIndex
  }

  return {
    focusIndex,
    selectedIndex,
    arrowUp,
    arrowDown
  }
}

const useDisplay = (items: ListItem[], focusIndex: Ref<number>) => {
  const display = ref(false)

  function close() {
    display.value = false
  }

  watch(display, ctDisplay => {
    if (ctDisplay) {
      window.addEventListener('mousedown', close)
    } else {
      focusIndex.value = -1
      window.removeEventListener('mousedown', close)
    }
  })

  return {
    display
  }
}

export default defineComponent({
  name: 'coms_input-select',
  props: {
    value: {
      type: Object as PropType<ModelValue>,
      required: true
    },
    items: {
      type: Array as PropType<ListItem[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const hug = ref(props.value.text)

    const { focusIndex, selectedIndex, arrowUp, arrowDown } = useListItem(props.items)
    const { display } = useDisplay(props.items, focusIndex)

    watch(hug, () => {
      emit('update:value', { id: selectedIndex.value, text: hug.value } as ModelValue)
    })

    return {
      hug,
      display,
      focusIndex, selectedIndex, arrowUp, arrowDown
    }
  },
  components: {
    Modal
  }
})
</script>

<style lang="scss">
.com_input-select {
  position: relative;

  &__list-box {
    position: absolute;
    left: 0;
    right: 0;
  }

  &__list.active {
    background: red;
  }
}
</style>