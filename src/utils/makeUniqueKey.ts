let counter = 0

export default function (prefix = '') {
  counter++
  let rs = ''
  
  const tsSplit2Dig = (new Date().getTime() + counter).toString().split(/\d{2}/g)
  if (tsSplit2Dig) tsSplit2Dig.forEach((t: string) => rs += Number(t).toString(36))
  else throw new Error(`something is wrong: makeUniqueKey ${tsSplit2Dig}`)

  return prefix + rs
}