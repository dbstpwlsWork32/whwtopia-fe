<template>
<div id="post-write" class="atom_ct-width">
  <input type="file" tabindex="-1" multiple accept="image/*" ref="imageUpload" class="_file" />

  <input type="text" maxlength="40" placeholder="글 제목" v-mounted-focus class="_title s_ft-si-up-3" @keydown.enter="blurNextFocus" />

  <div contenteditable aria-label="내용을 입력해 주세요" class="_content se_post-content-write" ref="contentDomRef"></div>

  <article
    role="application"
    aria-label="하위 버튼을 선택하면 해당하는 아이템을 삽입합니다. 위 아래 키보드 키로 아이템을 선택할수 있습니다."
    class="post-write__floating-menu"
    v-show="uiControl.display"
    :style="{ top: uiControl.top, left: uiControl.left }"
    ref="insertMenuDomRef"
  >
    <template v-if="matchedItems.length">
      <div class="_section" v-for="(section, sectionIndex) in matchedItems" :key="`command-i-${sectionIndex}`">
        <h3 class="s_ft-cl-sub">{{section.title}}</h3>
        <button
          class="s_ft-si-up-2"
          v-for="(item, itemIndex) in section.items"
          :key="`command-i-${sectionIndex}-${itemIndex}`"
          :class="{'s_selected': uiControl.selectKey.join('-') === `${sectionIndex}-${itemIndex}`}"
          tabindex="-1"
          @mousedown="item.func"
        >{{item.text}}</button>
      </div>
    </template>
    <h3 class="s_ft-cl-sub" v-else>없어용!</h3>
  </article>
</div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import useCommandInput from './useContenteditable'

const contentDomRef = ref<HTMLElement>() as Ref<HTMLElement>
const insertMenuDomRef = ref<HTMLElement>() as Ref<HTMLElement>

function blurNextFocus(e: KeyboardEvent) {
  e.preventDefault()
  const nextEl = (e.target as HTMLElement).nextSibling as HTMLElement
  if (nextEl) nextEl.focus()
}

const commandItem = [
  {
    title: '컨텐츠',
    items: [
      {
        text: '제목1',
        func() {
          const range = document.createRange()
          const div = document.createElement('div')
          const h3 = document.createElement('h3')
          h3.classList.add('s_ft-si-up-3')

          h3.setAttribute('aria-label', '제목1')
          div.appendChild(h3)
          contentDomRef.value.appendChild(div)
        }
      },
      {
        text: '제목2',
        func() {
          console.log('2')
        }
      },
      {
        text: '제목3',
        func() {
          console.log('3')
        }
      }
    ]
  },
  {
    title: '임베디드',
    items: [
      {
        text: '유튜브영상',
        func() {
          console.log('4')
        }
      }
    ]
  }
]

export default defineComponent({
  name: 'view_post-write',
  setup() {
    // 아이템 검색 알고리즘은 효율을 위해 아이템텍스트엔 한글 + 숫자만 있다고 가정하고 코드짬
    const { uiControl, matchedItems } = useCommandInput('/', commandItem, contentDomRef, insertMenuDomRef)
    return {
      blurNextFocus,
      uiControl,
      matchedItems,
      contentDomRef,
      insertMenuDomRef
    }
  }
})
</script>

<style lang="scss">
#post-write {
  margin-top: 3em;
  @include media(until-m) {
    margin-top: 1em;
  }
  & > ._title, & > ._content {
    padding: calc(var(--ct-indent-vert) * 2) var(--ct-indent);
    background: var(--bg-sub-2);
  }
  & > ._content {
    min-height: 10ch;
    margin-top: 2em;
    margin-bottom: 30em;
    @include media(until-m) {
      margin-top: 1em;
      margin-bottom: 10em;
    }
  }
  & > ._file {
    display: none;
  }
}

.post-write__floating-menu {
  min-width: 120px;
  max-width: calc(100% - 10ch);
  max-height: 100vh;
  overflow: auto;
  z-index: 3;
  padding: .5em;
  will-change: top, left;
  position: fixed;
  border: 1px solid var(--br-cl);
  background: var(--bg-sub);
  border-radius: 5px;
  & > ._section {
    padding-bottom: .7em;
    margin-bottom: .7em;
    border-bottom: 1px solid var(--br-cl);
    &:last-child {
      border: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    & > h3 {
      margin-bottom: .2em;
    }
    button {
      padding: .2em .5em;
      padding-bottom: .2em;
      display: block;
      text-align: left;
      width: 100%;
      &.s_selected {
        background: var(--bg-sub-2);
      }
    }
  }
}
</style>