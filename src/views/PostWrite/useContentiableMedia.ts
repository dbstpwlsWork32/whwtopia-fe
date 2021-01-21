import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'

const mediaWrapperMarker = 'data-content-media' as const

function makeMediaWrapper(tagname: string) {
  const el = document.createElement(tagname)
  el.setAttribute(mediaWrapperMarker, 'true')
  el.setAttribute('tabindex', '0')

  function backspaceRemove(e: KeyboardEvent) {
    if (e.key.toLowerCase() === 'backspace') {
      e.preventDefault()
      if (el.parentElement) el.parentElement.focus()
      el.remove()
      el.removeEventListener('keydown', backspaceRemove)
    }
  }

  el.addEventListener('keydown', backspaceRemove)
  return el
}

function useContenteditableMedia(contenteditableDomRef: Ref<HTMLElement>) {
  function keyup() {
    const se = window.getSelection()
    if (!se || !se.anchorNode) return false

    if (se.anchorNode instanceof HTMLElement) {
      let parentElement = se.anchorNode
      let foundNode: HTMLElement | null = null

      while(!contenteditableDomRef.value.isEqualNode(parentElement)) {
        if (parentElement.getAttribute(mediaWrapperMarker) === 'true') {
          foundNode = parentElement
          break
        }
        parentElement = parentElement.parentElement as HTMLElement
      }

      if (foundNode) foundNode.focus()
    }
  }


  onMounted(() => {
    contenteditableDomRef.value.addEventListener('keyup', keyup)
  })
  onBeforeUnmount(() => {
    contenteditableDomRef.value.removeEventListener('keyup', keyup)
  })
}

export {
  useContenteditableMedia as default,
  useContenteditableMedia,
  makeMediaWrapper
}