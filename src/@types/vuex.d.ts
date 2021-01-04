import type { ComponentCustomProperties } from 'vue'
import type { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    bottomAlertText: string
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}