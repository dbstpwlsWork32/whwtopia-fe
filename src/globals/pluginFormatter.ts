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

function number (num: number) {
  console.log(num)
}

export default {
  install(app: App) {
    app.config.globalProperties.$formatDate = date
    app.config.globalProperties.$formatNumber = number
  }
}