import type { App } from 'vue'

function date (date: Date) {
  function getLength(num: number, length = 2) {
    if (num === 0) return '0'.repeat(length)
  
    const needNum = length - num.toString().length
    if (needNum < 0) throw new Error(`date.getLength function: length is smaller then toString num length ${num}, ${length}`)
  
    return `${'0'.repeat(needNum)}${num}`
  }

  return `${date.getFullYear()}.${getLength(date.getMonth() + 1)}.${getLength(date.getDate())} ${getLength(date.getHours())}:${getLength(date.getMinutes())}`
}

function numberWithCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberFlag (num: number): string {
  if (num < 10000) return numberWithCommas(num)
  const flag = [
    { length: 9, text: '억' },
    { length: 5, text: '만' }
  ]

  
  const numToString = num.toString()
  let result = ''
  for (const item of flag) {
    if (numToString.length < item.length) continue

    const getIndex = numToString.length - item.length
    if (getIndex < 1) {
      result = (numToString[1] !== '0')
        ? `${numToString[0]}.${numToString[1]}${item.text}`
        : `${numToString[0]}${item.text}`
    } else {
      result = numberWithCommas(numToString.slice(0, getIndex + 1)) + item.text
    }
    break
  }

  return result
}

function install (app: App) {
  app.config.globalProperties.$formatDate = date
  app.config.globalProperties.$formatNumber = numberWithCommas
  app.config.globalProperties.$formatNumberFlag = numberFlag
}
export {
  install as default,
  numberFlag
}