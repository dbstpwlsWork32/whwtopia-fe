<template>
  <article id="or_nav__setting">
    <h2 class="s_ft-si-up-3">페이지 설정</h2>

    <h3 class="s_ft-si-up-2">글자 크기</h3>
    <div class="_range" role="application" aria-label="값이 작을수록 글자가 작고 값이 클수록 글자가 커집니다.">
      <p>작음</p>
      <input type="range" min="1" max="5" step="1" list="steplist" v-model="changeFont">
      <datalist id="steplist">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </datalist>
      <p>큼</p>
    </div>

    <h3 class="s_ft-si-up-2">배경</h3>
    <div role="radiogroup" class="or_nav__setting__radio-wrap">
      <div>
        <input type="radio" name="background-mode" value="dark" id="user-dark-mode" v-model="backgroundFlag" />
        <label for="user-dark-mode">
          DARK
        </label>
      </div>
      <div>
        <input type="radio" name="background-mode" value="light" id="user-light-mode" v-model="backgroundFlag" />
        <label for="user-light-mode">
          LIGHT
        </label>
      </div>
    </div>

    <h3>애니매이션</h3>
    <div class="_range">
      <p>빠름</p>
      <input type="range" min="0" max="4" step="1" list="steplist" v-model="changeAnimation">
      <datalist id="steplist">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </datalist>
      <p>느림</p>
    </div>
  </article>
</template>
;
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

type BackgroundFlag = 'dark' | 'light'

// input value is string
const changeFont = ref('3')
const changeAnimation = ref('2')
const backgroundFlag = ref<BackgroundFlag>('dark')

function useSizeChange(originValue: number, standardValue: number) {
  return (changeValue: number) => originValue + changeValue - standardValue
}

// [2] so define Effect this section
const getRootFontSize = useSizeChange(
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '')),
  3
)
watch(changeFont, changeFont => {
  document.documentElement.style.fontSize = getRootFontSize(parseInt(changeFont)) + 'px'
})

// takeout flag * 100ms, if flag is 0 apply as 0s
const getAnis = ['6', '4', '3', '2'].map(flag => 
  ({
    _func: useSizeChange(
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ani-' + flag).replace(/s\./g, '')) * 10,
      2
    ),
    flag: '--ani-' + flag
  })
)
watch(changeAnimation, changeFlag => {
  getAnis.forEach(({ _func, flag }) => {
    const newPropValue = changeFlag === '0'? '0s' : '.' + _func(parseInt(changeFlag)) * 100 + 's'
    document.documentElement.style.setProperty(flag, newPropValue)
  })
})

watch(backgroundFlag, backgroundFlag => {
  const reverseFlag: BackgroundFlag = backgroundFlag === 'dark'? 'light' : 'dark'
  const classList = document.documentElement.classList

  if (classList.contains(reverseFlag)) classList.remove(reverseFlag)
  classList.add(backgroundFlag)
})

export default defineComponent({
  name: 'app_nav__setting',
  setup() {
    // [1] this section called every v-if = true
    return {
      changeFont,
      changeAnimation,
      backgroundFlag
    }
  }
})
</script>

<style lang="scss">
#or_nav__setting {
  border-radius: 5px;
  background: var(--bg-sub-2);
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
  padding: var(--ct-indent) var(--gap-20-10);
  & > .h2 {
    margin-bottom: 1em;
  }

  & > h3 {
    margin-top: 2em;
    margin-bottom: .7em;
  }

  & > ._range {
    gap: 10px;
    p {
      flex-shrink: 0;
      font-size: var(--ft-si-down-1);
    }
    display: flex;
  }

  .or_nav__setting__radio-wrap {
    & > div {
      contain: layout paint;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid var(--br-cl);
      margin-top: 10px;
      input {
        width: 10px;
        display: inline;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        &:checked + label {
          background: var(--btn-bg-base);
        }
      }
      label {
        padding-top: 10px;
        padding-bottom: 10px;
        cursor: pointer;
        display: block;
        width: 100%;
        padding-left: 30px;
        transition: background var(--ani-2);
      }
    }
  }
}
</style>