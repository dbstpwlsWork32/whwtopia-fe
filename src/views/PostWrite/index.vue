<template>
<div id="post-write" class="atom_ct-width">
  <input type="file" tabindex="-1" multiple accept="image/*" ref="imageUpload" class="_file" />

  <input type="text" maxlength="40" placeholder="제목을 입력해 주세요" v-mounted-focus class="_title s_ft-si-up-3" @keydown.enter="blurNextFocus" />

  <div contenteditable aria-label="내용을 입력해 주세요" class="_content" ref="contentDomRef"></div>

  <article
    role="application"
    aria-label="하위 버튼을 선택하면 해당하는 아이템을 삽입합니다."
    class="post-write__floating-menu"
    v-show="uiControl.display"
    :style="{ top: uiControl.top, left: uiControl.left }"
    ref="insertMenuDomRef"
  >
    <template v-if="matchedItems.length">
      <div class="_section" v-for="(section, sectionIndex) in matchedItems" :key="`command-i-${sectionIndex}`">
        <h3 class="s_ft-cl-sub">{{section.title}}</h3>
        <button class="s_ft-si-up-2" v-for="(item, itemIndex) in section.items" :key="`command-i-${sectionIndex}-${itemIndex}`">{{item}}</button>
      </div>
    </template>
    <h3 class="s_ft-cl-sub" v-else>없어용!</h3>
  </article>
</div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, reactive, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import resolveHangul from '@/utils/resolveHangul'

function blurNextFocus(e: KeyboardEvent) {
  e.preventDefault()
  const nextEl = (e.target as HTMLElement).nextSibling as HTMLElement
  if (nextEl) nextEl.focus()
}

type commandItem = { title: string; items: string[] }
function useCommandInput (
  commandText: string,
  // items is not ref just static
  items: commandItem[],
  contentDomRef: Ref<HTMLElement>,
  insertMenuDomRef: Ref<HTMLElement>
) {
  const uiControl = reactive({
    display: false,
    top: '',
    left: ''
  })
  const matchedItems = ref(items)
  let searchStartOffset = 0

  function findMatchItems(query: string) {
    if (!query) {
      matchedItems.value = items
      return false
    }
    function searchAlgorhythm(itemText: string, querys: ResolveHangle[]) {
      const matchResult = querys.filter(query => {
        const { cho: qCho } = query

        return itemText.split('').find(s => {
          const { cho } = resolveHangul(s)

          return cho === qCho
        })
      })

      return matchResult.length === querys.length
    }

    const foundItems: commandItem[] = []

    // 여기 한정으로 아이템엔 한글 + 숫자만 있으니까 거르기 ( 무겁게 만들 필요가 없다고 생각한다. )
    if (query.match(/[ㄱ-ㅎ가-힣0-9]/)) {

      const resolveQuery = query.split('').map(s => resolveHangul(s))
      items.forEach(section => {
        const foundSectionItems = section.items.filter(s => searchAlgorhythm(s, resolveQuery))
        if (foundSectionItems.length) foundItems.push({ title: section.title, items: foundSectionItems })
      })
    }

    matchedItems.value = foundItems
  }
  function inputCheck() {
    const { anchorOffset, anchorNode, isCollapsed } = window.getSelection() as Selection
    const anchorBeforeOffset = anchorOffset - 1

    if (!(anchorNode instanceof Text) || !anchorNode.nodeValue || !anchorNode.nodeValue[anchorBeforeOffset]) {
      uiControl.display = false
      return false
    }

    const anchorText = anchorNode.nodeValue[anchorBeforeOffset]
    if (uiControl.display) {
      if (anchorText.charCodeAt(0) === 160 || searchStartOffset > anchorOffset || !isCollapsed) uiControl.display = false
    }

    if (isCollapsed) {
      if (anchorText === commandText) {
        if (!uiControl.display) {
          searchStartOffset = anchorOffset
          uiControl.display = true
        } else if (searchStartOffset !== anchorOffset) {
          uiControl.display = false
        }
      }
  
      if (uiControl.display) findMatchItems(anchorNode.nodeValue.slice(searchStartOffset))
    }
  }

  function keyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase()
    if (key === 'enter') {
      window.scrollBy(0, 21)
    } else if (key === 'arrowup' || key === 'arrowdown') {
      if (uiControl.display) {
        e.preventDefault()
      }
    }
  }

  function closeFloatingMenu() {
    uiControl.display = false
  }

  onMounted(() => {
    contentDomRef.value.addEventListener('keydown', keyDown)
    contentDomRef.value.addEventListener('keyup', inputCheck)
    contentDomRef.value.addEventListener('mousedown', closeFloatingMenu)

    watch(() => uiControl.display, async () => {
      if (uiControl.display) {
        await nextTick()

        const { innerHeight: maximumHeight, innerWidth: maximumWidth } = window
        const { offsetHeight, offsetWidth } = insertMenuDomRef.value
        const selection = window.getSelection() as Selection

        const { left, top, height } = selection.getRangeAt(0).getBoundingClientRect()

        let willTop = top + height
        const occupyHeight = offsetHeight + willTop
        if (occupyHeight > maximumHeight) {
          willTop -= occupyHeight - maximumHeight
          if (willTop < 0) willTop = 0
        }

        let willLeft = left + 3
        const occupyWidth = offsetWidth + willLeft
        if (occupyWidth > maximumWidth) {
          willLeft = left - offsetWidth
          if (willLeft < 0) willLeft = 0
        }

        uiControl.top = willTop + 'px'
        uiControl.left = `${willLeft}px`
      }
    })
  })
  onBeforeUnmount(() => {
    contentDomRef.value.removeEventListener('keydown', keyDown)
    contentDomRef.value.removeEventListener('keyup', inputCheck)
    contentDomRef.value.removeEventListener('mousedown', closeFloatingMenu)
  })

  return {
    uiControl,
    matchedItems
  }
}

export default defineComponent({
  name: 'view_post-write',
  setup() {
    const contentDomRef = ref<HTMLElement>()
    const insertMenuDomRef = ref<HTMLElement>()

    // 아이템 검색 알고리즘은 효율을 위해 아이템텍스트엔 한글 + 숫자만 있다고 가정하고 코드짬
    const { uiControl, matchedItems } = useCommandInput('/', [
      {
        title: '다음 라인에 삽입',
        items: ['제목1', '제목2', '제목3', '유튜브 영상']
      }
    ], contentDomRef as Ref<HTMLElement>, insertMenuDomRef as Ref<HTMLElement>)
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
    button, label {
      padding: .2em 0;
      display: block;
      text-align: left;
      width: 100%;
    }
  }
}
</style>