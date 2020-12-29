import { reactive } from 'vue'

export default () => {
  const userActive = reactive({
    isLiked: false,
    isReported: false,
    isSaved: false
  })
  
  const toggleLike = () => {
    userActive.isLiked = !userActive.isLiked
  }
  const toggleSave = () => {
    userActive.isSaved = !userActive.isSaved
  }
  const toggleReport = () => {
    userActive.isReported = !userActive.isReported
  }
  return {
    userActive,
    toggleLike,
    toggleReport,
    toggleSave
  }
}