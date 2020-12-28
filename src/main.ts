import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import RippleBtn from '@/globalComponents/RippleBtn.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFire,
  faEye,
  faThumbsUp,
  faStopwatch,
  faCaretUp,
  faCaretDown,
  faBell,
  faArrowLeft,
  faSearch,
  faCompass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faEye, faThumbsUp, faStopwatch, faCaretUp, faCaretDown, faBell, faArrowLeft, faSearch, faCompass)

const app = createApp(App)
app.use(store).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ripple-btn', RippleBtn)
app.mount('#app')