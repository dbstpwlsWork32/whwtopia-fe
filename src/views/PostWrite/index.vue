<template>
<div id="post-write" class="m_ct-width">
  <input type="file" tabindex="-1" multiple accept="image/*" ref="inputFileDomRef" @change="imageRegister" class="_file" />

  <input type="text" maxlength="40" placeholder="글 제목" v-mounted-focus class="_title s_ft-si-up-3" @keydown.enter="blurNextFocus" />

  <div contenteditable aria-label="/를 입력하면 삽입아이템들이 나옵니다." class="_content se_post-content-write" ref="contentDomRef"></div>

  <modal v-model:display="youtubeLinkPopup.display">
    <div class="post-write__youtube-popup">
      <input type="text" class="m_ct" v-mounted-focus placeholder="유튜브 링크" v-model="youtubeLinkPopup.href" />
      <button @click="youtubeRegister">등록</button>
    </div>
  </modal>

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
import { defineComponent, ref, reactive, watch } from 'vue'

import useCommandInput from './useCommandInput'
import { useContenteditableMedia, makeMediaWrapper } from './useContentiableMedia'

import Modal from '@/components/Modal.vue'
import { updateBottomAlert } from '@/hooks/bottomAlert'

const contentDomRef = ref<HTMLElement>() as Ref<HTMLElement>
const insertMenuDomRef = ref<HTMLElement>() as Ref<HTMLElement>
const inputFileDomRef = ref<HTMLInputElement>() as Ref<HTMLInputElement>
const youtubeLinkPopup = reactive({
  display: false,
  href: ''
})
const textModifyDisplay = ref(false)

function appendAndFocus(appendTag: HTMLElement | DocumentFragment) {
  contentDomRef.value.appendChild(appendTag)

  contentDomRef.value.focus()
  const range = document.createRange()
  range.setStart(appendTag, 0)
  const sl = window.getSelection() as Selection
  sl.removeAllRanges()
  sl.addRange(range)
}

function youtubeRegister() {
  if (
    !youtubeLinkPopup.href ||
    (!youtubeLinkPopup.href.match(/^https:\/\/((www\.)|(music\.))?youtube\.com/) && !youtubeLinkPopup.href.match(/^https:\/\/youtu\.be/))
  ) {
    updateBottomAlert('올바른 유튜브 링크를 입력해 주세요!')
    return false
  }

  const url = new URL(youtubeLinkPopup.href)
  const videoId = url.searchParams.get('v') || url.pathname
  if (!videoId) {
    updateBottomAlert('올바른 유튜브 링크를 입력해 주세요!')
    return false
  }

  const iframeParent = makeMediaWrapper('div')
  iframeParent.classList.add('se_post-content-base__youtube-max')
  const iframeWrap = document.createElement('div')
  iframeWrap.classList.add('m_youtube-wrap')

  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube.com/embed/${videoId}?feature=oembed&origin=http://example.com`

  iframeWrap.appendChild(iframe)
  iframeParent.appendChild(iframeWrap)
  contentDomRef.value.appendChild(iframeParent)

  const div = document.createElement('div')
  div.appendChild(document.createElement('br'))
  appendAndFocus(div)

  youtubeLinkPopup.display = false
}

function imageRegister(e: Event & { target: HTMLInputElement }) {
  if (e.target.files === null) return false

  function makeImageDom(file: File) {
    if (!file.type.match(/^image\//)) return false
    const thumbnailUrl = URL.createObjectURL(file)

    const imageDom = document.createElement('img')
    imageDom.src = thumbnailUrl
    return imageDom
  }

  const newImagesFragment = new DocumentFragment()

  for (const file of e.target.files) {
    const imageDom = makeImageDom(file)

    if (!imageDom) {
      updateBottomAlert('올바른 이미지파일을 업로드해주세요')
      return false
    }

    const imageWrapper = makeMediaWrapper('div')
    imageWrapper.appendChild(imageDom)
    newImagesFragment.appendChild(imageWrapper)
  }

  const nextNode = document.createElement('div')
  nextNode.appendChild(document.createElement('br'))

  contentDomRef.value.appendChild(newImagesFragment)
  appendAndFocus(nextNode)

  e.target.value = ''
}

const commandItem = [
  {
    title: '컨텐츠',
    items: [
      {
        text: '제목1',
        func() {
          const h3 = document.createElement('h3')
          h3.classList.add('s_ft-si-up-3')
          h3.setAttribute('aria-label', '제목1')
          appendAndFocus(h3)
        }
      },
      {
        text: '제목2',
        func() {
          const h3 = document.createElement('h4')
          h3.classList.add('s_ft-si-up-2')
          h3.setAttribute('aria-label', '제목2')
          appendAndFocus(h3)
        }
      },
      {
        text: '제목3',
        func() {
          const h3 = document.createElement('h5')
          h3.classList.add('s_ft-si-up-1')
          h3.setAttribute('aria-label', '제목3')
          appendAndFocus(h3)
        }
      }
    ]
  },
  {
    title: '임베디드',
    items: [
      {
        text: '이미지',
        func() {
          inputFileDomRef.value.click()
        }
      },
      {
        text: '유튜브영상',
        func() {
          youtubeLinkPopup.display = true
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
    useContenteditableMedia(contentDomRef)

    watch(() => youtubeLinkPopup.display, (display) => {
      if (!display) {
        youtubeLinkPopup.href = ''
        contentDomRef.value.focus()
      }
    })
    return {
      uiControl,
      matchedItems,
      contentDomRef,
      insertMenuDomRef,
      inputFileDomRef,
      youtubeLinkPopup,
      textModifyDisplay
    }
  },
  methods: {
    blurNextFocus(e: KeyboardEvent) {
      e.preventDefault()
      const nextEl = (e.target as HTMLElement).nextSibling as HTMLElement
      if (nextEl) nextEl.focus()
    },
    youtubeRegister,
    imageRegister
  },
  components: {
    Modal
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

.post-write__youtube-popup {
  background: var(--bg-sub-2);
  width: 500px;
  max-width: 100%;
  border: 2px solid var(--br-cl);
  input {
    background: var(--btn-bg-base);
    color: var(--btn-cl-base);
  }
  button {
    padding: .5em;
    width: 100%;
    display: block;
    text-align: center;
  }
}
</style>