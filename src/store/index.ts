import { createStore } from 'vuex'

export default createStore({
  state: {
    bottomAlert: ''
  },
  mutations: {
    bottomAlert (state, p) {
      if (state.bottomAlert !== p) state.bottomAlert = p
    }
  },
  actions: {
  },
  modules: {
  }
})
