declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const any: any
  export default any
}

declare module 'vue/types/vue' {
  interface Vue {
    $formatDate: (a: Date) => string;
    $formatNumber: (a: number) => string
  }
}