import { ref } from 'vue'

const title = ref('홈')

function updateByRoute(path: string) {
  title.value = path
}
function update(p: string) {
  title.value = p
}

export {
  title as default,
  title
}