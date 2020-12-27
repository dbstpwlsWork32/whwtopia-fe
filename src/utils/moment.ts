function getLength(num: number, length = 2) {
  if (num === 0) return '0'.repeat(length)

  const needNum = length - num.toString().length
  if (needNum < 0) throw new Error(`date.getLength function: length is smaller then toString num length ${num}, ${length}`)

  return `${'0'.repeat(needNum)}${num}`
}

function formatDate (date: Date): string {
  return `${date.getFullYear()}-${getLength(date.getMonth() + 1)}-${getLength(date.getDate())} ${getLength(date.getHours())}:${getLength(date.getMinutes())}`
}

export {
  getLength,
  formatDate
}