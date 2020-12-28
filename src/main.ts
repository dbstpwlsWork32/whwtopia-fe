import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faFire,
  faEye,
  faThumbsUp,
  faStopwatch,
  faCaretUp,
  faCaretDown,
  faBell
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faFire, faEye, faThumbsUp, faStopwatch, faCaretUp, faCaretDown, faBell)

const app = createApp(App)
app.use(store).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')