<template>
<section class="atom_ct-indent atom_user-section post-view__comment-sec">
  <h3 class="s_ft-si-up-2">댓글 <span class="s_ft-cl-sub s_ft-si-down-1">(1000)</span></h3>

  <div class="_write" role="article" aria-label="write comment section">
    <div class="atom_profile">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR65_ARqKLQleKu_6hTso1N96evuUKOUZrFDw&usqp=CAU" alt="my profile">
    </div>

    <div class="_wrap">
      <div
        contenteditable
        role="text"
        class="atom_user-section"
        ref="writeRef"
        aria-label="댓글 적기"
      ></div>

      <div class="_btn">
        <input type="file" @change="fileChange" id="image-register" ref="fileRef" accept="image/*" />
        <label class="s_btn-base" @click="imgRegister" for="image-register">이미지 등록</label>
        <button class="s_btn-base _do" :disabled="!commentTextNode">작성</button>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { updateBottomAlert } from '@/hooks/bottomAlert'

function useWriteCommentMutation(domRef: Ref<HTMLElement>, contentRef: Ref<string>) {
  function cb(m: MutationRecord) {
    if ((m.target as HTMLElement).querySelector('img')) {
      contentRef.value = '1'
    } else {
      contentRef.value = m.target.textContent || ''
    }
  }

  const observer = new MutationObserver(ms => {
    ms.forEach(m => {
      if (m.type === 'childList') cb(m)
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
  name: 'view_post-view-comments',
  setup() {
    const writeRef = ref<HTMLElement>()
    const commentTextNode = ref('')

    onMounted(() => {
      useWriteCommentMutation(writeRef as Ref<HTMLElement>, commentTextNode)
    })
    return {
      commentTextNode,
      writeRef,
      updateBottomAlert
    }
  },
  methods: {
    fileChange() {
      const writeComment = this.$refs.writeRef as HTMLElement
      const fileInput = this.$refs.fileRef as HTMLInputElement

      if (!fileInput.files) return false
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
  }
})
</script>

<style lang="scss">

.post-view__comment-sec {
  .atom_profile {
    width: 50px;
    height: 50px;
    @include media(until-m) {
      width: 40px;
      height: 40px;
    }
  }

  & > ._write {
    margin-top: var(--gap-20-10);
    display: flex;
    gap: 10px;
    & > .atom_profile {
      flex-shrink: 0;
    }
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
}
</style>