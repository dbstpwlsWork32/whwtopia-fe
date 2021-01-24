declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const any: any
  export default any
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    VUE_APP_API_URL: string;
    [key: string]: string;
  }
}