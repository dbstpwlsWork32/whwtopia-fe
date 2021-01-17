import type { Ref } from 'vue'
import { reactive, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import resolveHangul from '@/utils/resolveHangul'

type commandItem = { title: string; items: { text: string; func: () => void | Function }[] }
export default function useCommandInput(
  commandText: string,
  // items is not ref just static
  itemsOrigin: commandItem[],
  contentDomRef: Ref<HTMLElement>,
  insertMenuDomRef: Ref<HTMLElement>
) {
  const uiControl = reactive({
    display: false,
    top: '',
    left: '',
    selectKey: [0, -1]
  })
  let searchStartOffset = 0
  let openTextNode: Text

  const items = itemsOrigin.map(sec => {
    return {
      ...sec,
      items: sec.items.map(i => ({
        ...i,
        func() {
          const openTextNodeTextContent = openTextNode.textContent as string
          if (openTextNodeTextContent === commandText) openTextNode.remove();
          else openTextNode.textContent = openTextNodeTextContent.slice(0, searchStartOffset - 1)

          uiControl.display = false;
          i.func()
        }
      }))
    }
  })
  const matchedItems = ref(items)

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
        const foundSectionItems = section.items.filter(s => searchAlgorhythm(s.text, resolveQuery))
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
          openTextNode = anchorNode
          uiControl.display = true
        } else if (searchStartOffset !== anchorOffset) {
          uiControl.display = false
        }
      }
  
      if (uiControl.display) findMatchItems(anchorNode.nodeValue.slice(searchStartOffset))
    }
  }

  function itemsKeyControl(e: KeyboardEvent) {
    const key = e.key.toLowerCase()
    if (key === 'enter') {
      if (uiControl.selectKey[1] !== -1) {
        e.preventDefault()

        const [ctSectionIndex, ctItemIndex] = uiControl.selectKey
        const ctItem = matchedItems.value[ctSectionIndex].items[ctItemIndex]
        ctItem.func()
      } else {
        window.scrollBy(0, 21)
      }
    } else if (key === 'arrowup' || key === 'arrowdown') {
      if (uiControl.display) {
        e.preventDefault()

        const [ctSectionIndex, ctItemIndex] = uiControl.selectKey
        let willSectionIndex = ctSectionIndex
        let willItemIndex = (key === 'arrowdown')? ctItemIndex + 1 : ctItemIndex - 1

        if (!matchedItems.value[willSectionIndex]) {
          willSectionIndex = 0
          willItemIndex = -1
        }

        if (willItemIndex < 0) {
          if (willSectionIndex > 0) {
            willSectionIndex = ctSectionIndex - 1
            willItemIndex = matchedItems.value[willSectionIndex].items.length - 1
          } else {
            willItemIndex = 0
          }
        } else if (willItemIndex > matchedItems.value[willSectionIndex].items.length - 1) {
          if (willSectionIndex < matchedItems.value.length - 1) {
            willSectionIndex = willSectionIndex + 1
            willItemIndex = 0
          } else {
            willItemIndex = ctItemIndex
          }
        }
        
        uiControl.selectKey = [willSectionIndex, willItemIndex]
      }
    }
  }

  function itemsMouseControl(e: Event) {
    e.stopPropagation()
    const { anchorNode, anchorOffset } = window.getSelection() as Selection

    if (anchorNode && anchorNode.nodeValue && anchorNode.nodeValue[anchorOffset - 1] === commandText) uiControl.display = true
    else uiControl.display = false
  }

  onMounted(() => {
    contentDomRef.value.addEventListener('keydown', itemsKeyControl)
    contentDomRef.value.addEventListener('keyup', inputCheck)
    contentDomRef.value.addEventListener('mouseup', itemsMouseControl)

    watch(() => uiControl.display, async () => {
      if (uiControl.display) {
        window.addEventListener('mouseup', () => uiControl.display = false, { once: true })

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
      } else {
        uiControl.selectKey = [0, -1]
      }
    })
  })
  onBeforeUnmount(() => {
    contentDomRef.value.removeEventListener('keydown', itemsKeyControl)
    contentDomRef.value.removeEventListener('keyup', inputCheck)
    contentDomRef.value.removeEventListener('mouseup', itemsMouseControl)
  })

  return {
    uiControl,
    matchedItems
  }
}