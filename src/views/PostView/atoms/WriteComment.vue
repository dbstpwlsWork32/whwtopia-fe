<template>
  <div class="post-view__write-comment" role="article" aria-label="write comment section">
    <div class="atom_profile">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU" alt="my profile">
    </div>

    <div class="_wrap">
      <div
        contenteditable
        role="text"
        class="s_user-write-word se_user-section"
        ref="writeRef"
        aria-label="댓글 적기"
      ></div>

      <div class="_btn">
        <input type="file" @change="fileChange" :id="fileId" ref="fileRef" accept="image/*" />
        <label class="s_btn-base" v-click-touch-start="imgRegister" :for="fileId">이미지 등록</label>
        <button class="s_btn-base _do" :disabled="!commentTextNode">작성</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, onBeforeUnmount, onMounted, ref, h } from 'vue'
import { updateBottomAlert } from '@/hooks/bottomAlert'
import makeUniqueKey from '@/utils/makeUniqueKey'
import isMobile from '@/utils/isMobile'

function useWriteCommentMutation(domRef: Ref<HTMLElement>, contentRef: Ref<string>) {
  function imageClick(e: Event) {
    console.log(e)
  }
  function childListTypeCallback(m: MutationRecord) {
    const parentNode = m.target as HTMLElement
    for (const removeNode of m.removedNodes.values()) {
      if (removeNode.nodeName.toLocaleLowerCase() === 'img') removeNode.removeEventListener('click', imageClick)
    }
    for (const addNode of m.addedNodes.values()) {
      if (addNode.nodeName.toLocaleLowerCase() === 'img') {
        (addNode as HTMLElement).classList.add('s_cursor-pointer')
        addNode.addEventListener('click', imageClick)

        const newDiv = document.createElement('div')
        newDiv.appendChild(document.createElement('br'))
        parentNode.appendChild(newDiv)

        const range = new Range()
        range.setStart(newDiv, 0)
        range.setEnd(newDiv, 0)

        const sel = window.getSelection()
        sel!.removeAllRanges()
        sel!.addRange(range)
      }
    }

    if (parentNode.querySelector('img')) {
      contentRef.value = '1'
    } else {
      contentRef.value = m.target.textContent || ''
    }
  }

  const observer = new MutationObserver(ms => {
    ms.forEach(m => {
      if (m.type === 'childList') childListTypeCallback(m)
    })
  })

  observer.observe(domRef.value, {
    characterData: false,
    attributes: false,
    childList: true
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
}


export default defineComponent({
  name: 'view_post-atom_write-comment',
  setup() {
    const writeRef = ref<HTMLElement>()
    const commentTextNode = ref('')

    const fileId = makeUniqueKey('writeFile')

    onMounted(() => {
      useWriteCommentMutation(writeRef as Ref<HTMLElement>, commentTextNode)
    })
    return {
      commentTextNode,
      writeRef,
      updateBottomAlert,
      fileId
    }
  },
  methods: {
    fileChange() {
      const writeComment = this.$refs.writeRef as HTMLElement
      const fileInput = this.$refs.fileRef as HTMLInputElement

      if (!fileInput.files || !fileInput.files.length) return false
      if (!fileInput.files[0].type.match(/^image\//)) {
        this.updateBottomAlert('이미지 파일만 첨부해주세요!')
        return false
      }

      const thumbnailUrl = URL.createObjectURL(fileInput.files[0])
      const img = document.createElement('img')
      img.src = thumbnailUrl

      writeComment.appendChild(img)
    },
    imgRegister(e: Event) {
      const writeComment = this.$refs.writeRef as HTMLElement
      const fileInput = this.$refs.fileRef as HTMLInputElement

      if (writeComment.querySelector('img')) {
        this.updateBottomAlert('댓글작성시 이미지는 최대 1개까지 올릴수 있습니다!')
        e.preventDefault()
      } else {
        fileInput.value = ''
      }
    }
  },
  directives: {
    clickTouchStart: {
      mounted(el: HTMLElement, binding) {
        const evName = isMobile()? 'touchstart' : 'click'
        el.addEventListener(evName, binding.value)
      },
      beforeUnmount(el: HTMLElement, binding) {
        const evName = isMobile()? 'touchstart' : 'click'
        el.removeEventListener(evName, binding.value)
      }
    }
  }
})
</script>

<style lang="scss">

$grid-gap: 10px;
.post-view__write-comment {
  display: flex;
  gap: $grid-gap;
  & > ._wrap {
    flex-grow: 1;
    align-self: center;
    & > [contenteditable] {
      padding: 5px;
      border-bottom: 1px solid var(--br-cl);
      margin-bottom: 10px;
      position: relative;
      &::after {
        transition: width var(--ani-2);
        content: '';
        display: block;
        position: absolute;
        bottom: -1px;
        height: 1px;
        width: 0;
        left: 0;
        background: #000;
      }
      &:focus::after {
        width: 100%;
      }
    }
    & > ._btn {
      @include media(until-m) {
        font-size: var(--ft-si-down-1);
      }
      & > ._do {
        margin-left: 10px;
      }
      input[type=file] {
        z-index: -2;
        opacity: 0;
        width: 0;
        height: 0;
      }
    }
  }
}
</style>