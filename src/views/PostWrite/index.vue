<template>
<div id="post-write" class="atom_ct-width">
  <input type="file" tabindex="-1" multiple accept="image/*" ref="imageUpload" class="_file" />

  <input type="text" maxlength="40" placeholder="제목을 입력해 주세요" v-mounted-focus class="_title s_ft-si-up-3" @keydown="blurNextFocus" />

  <div contenteditable aria-label="내용을 입력해 주세요" class="_content" @keyup="inputCheck"></div>

  <article
    role="application"
    aria-label="하위 버튼을 선택하면 해당하는 아이템을 삽입합니다."
    class="post-write__floating-menu"
    v-show="uiControl.display"
    :style="{ top: uiControl.top, left: uiControl.left }"
  >
    <template v-if="matchedItems.length">
      <div class="_section" v-for="(section, sectionIndex) in matchedItems" :key="`command-i-${sectionIndex}`">
        <h3 class="s_ft-si-down-1 s_ft-cl-sub">{{section.title}}</h3>
        <button v-for="(item, itemIndex) in section.items" :key="`command-i-${sectionIndex}-${itemIndex}`">{{item}}</button>
      </div>
    </template>
    <h3 class="s_ft-si-down-1 s_ft-cl-sub" v-else>not result</h3>
  </article>

  <!-- font select 했을때 위에 창뜨기 document.selectChange when contenteditable focus -->
</div>
</template>

<script lang="ts">``
import { defineComponent, reactive, ref, watch } from 'vue'
import resolveHangul from '@/utils/resolveHangul'

function blurNextFocus(e: KeyboardEvent) {
  if (e.key.toLowerCase() === 'enter') {
    e.preventDefault()
    const nextEl = (e.target as HTMLElement).nextSibling as HTMLElement
    if (nextEl) nextEl.focus()
  }
}

type commandItem = { title: string; items: string[] }
function useCommandInput (
  commandText: string,
  // items is not ref just static
  items: commandItem[]
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
      if (anchorText === commandText && !uiControl.display) {
        searchStartOffset = anchorOffset
        uiControl.display = true
      }
  
      if (uiControl.display) findMatchItems(anchorNode.nodeValue.slice(searchStartOffset))
    }
  }

  watch(() => uiControl.display, () => {
    if (uiControl.display) {
      const selection = window.getSelection() as Selection

      const { left, top, height, width } = selection.getRangeAt(0).getBoundingClientRect()
      uiControl.top = top + height + 'px'
      uiControl.left = `${left + width}px`
    }
  })

  return {
    uiControl,
    matchedItems,
    inputCheck
  }
}

export default defineComponent({
  name: 'view_post-write',
  setup() {
    // 검색 알고리즘은 효율을 위해 아이템텍스트엔 한글 + 숫자만 있다고 가정하고 코드짬
    const { uiControl, matchedItems, inputCheck } = useCommandInput('/', [
      {
        title: '내용',
        items: ['이미지', '제목1', '제목2', '제목3', '작은텍스트1']
      },
      {
        title: '임베디드',
        items: ['유튜브영상']
      }
    ])
    return {
      blurNextFocus,
      uiControl,
      matchedItems,
      inputCheck
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
    padding: var(--ct-indent-vert) var(--ct-indent);
    background: var(--bg-sub-2);
  }
  & > ._content {
    min-height: 10ch;
    margin-top: 2em;
    @include media(until-m) {
      margin-top: 1em;
    }
  }
  & > ._file {
    display: none;
  }
}

.post-write__floating-menu {
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