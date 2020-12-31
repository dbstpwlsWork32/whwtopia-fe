import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import RippleBtn from '@/globals/RippleBtn.vue'
import formatter from '@/globals/pluginFormatter'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFire,
  faEye,
  faStopwatch,
  faCaretUp,
  faCaretDown,
  faBell,
  faArrowLeft,
  faSearch,
  faCompass,
  faHeart,
  faFlag,
  faSave,
  faLungs,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFire, faEye, faStopwatch, faCaretUp, faCaretDown, faBell, faArrowLeft, faSearch, faCompass, faHeart, faFlag, faSave, faLungs, faUser)

const app = createApp(App)
app.use(store).use(router).use(formatter)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ripple-btn', RippleBtn)
app.mount('#app')