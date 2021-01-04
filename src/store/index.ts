import type { MutationTree, Store as VuexStore, CommitOptions } from 'vuex' 
import { createStore } from 'vuex'

const state = {
  bottomAlertText: ''
}

type State = typeof state
type Mutations<S = State> = {
  bottomAlertText (s: S, p: string): void;
}

const mutations: MutationTree<State> & Mutations = {
  bottomAlertText(state: State, p: string) {
    if (state.bottomAlertText !== p) state.bottomAlertText = p
  }
} as const

const store = createStore({
  state,
  mutations
})

export default store

export type Store = Omit<
  VuexStore<State>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
}

export function useStore() {
  return store as Store
}