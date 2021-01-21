const CHO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
  'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
  'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ',
  'ㅍ', 'ㅎ'
]
const JUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
  'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
  'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
  'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
]
const JONG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ',
  'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ',
  'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]

// const getChoCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x1100 + (takeOutStartedHangleCharCode / 588))
// const getJungCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x1161 + (takeOutStartedHangleCharCode % 588) / 28)
// const getJongCharCode = (takeOutStartedHangleCharCode: number) => Math.floor(0x11A7 + takeOutStartedHangleCharCode % 28)

const getCho = (takeOutStartedHangleCharCode: number) => CHO[Math.floor(takeOutStartedHangleCharCode / 588)]
const getJung = (takeOutStartedHangleCharCode: number) => JUNG[Math.floor(takeOutStartedHangleCharCode % 588 / 28)]
const getJong = (takeOutStartedHangleCharCode: number) => JONG[Math.floor(takeOutStartedHangleCharCode % 28)]

const resolveAll = (s: string): ResolveHangle => {
  const takeOutStartedHangleCharCode = s.charCodeAt(0) - 0xAC00
  if (takeOutStartedHangleCharCode < 0) { return { cho: s, jung: '', jong: '' } }

  return {
    cho: getCho(takeOutStartedHangleCharCode),
    jung: getJung(takeOutStartedHangleCharCode),
    jong: getJong(takeOutStartedHangleCharCode)
  }
}

export {
  resolveAll as default,
  resolveAll,
  getCho,
  getJung,
  getJong
}

/*
  출처
    https://blog.ddoong2.com/2019/01/29/%EC%B4%88%EC%84%B1-%EC%A4%91%EC%84%B1-%EC%A2%85%EC%84%B1%EC%9D%84-%EB%B6%84%EB%A6%AC%ED%95%98%EB%8A%94-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4/#
    https://github.com/e-/Hangul.js/blob/master/hangul.js

  <= 감사합니다!!
*/