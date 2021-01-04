import { createStore } from 'vuex'

export default createStore({
  state: {
    bottomAlertText: ''
  },
  mutations: {
    bottomAlertText (state, p) {
      if (state.bottomAlertText !== p) state.bottomAlertText = p
    }
  },
  actions: {
  },
  modules: {
  }
})
