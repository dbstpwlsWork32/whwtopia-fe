declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const any: any
  export default any
}

import type { ComponentCustomProperties } from 'vue'
import type { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    bottomAlert: string
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}