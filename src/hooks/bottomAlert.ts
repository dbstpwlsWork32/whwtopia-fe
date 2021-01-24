import { ref } from 'vue'

const bottomAlert = ref('')

const updateBottomAlert = (p: string) => {
  bottomAlert.value = p
}

export {
  bottomAlert as default,
  bottomAlert,
  updateBottomAlert
}