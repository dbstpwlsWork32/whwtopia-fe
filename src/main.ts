import { createApp } from 'vue'
import App from './App/index.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'
import store from './store'

import RippleBtn from '@/globals/RippleBtn.vue'
import formatter from '@/globals/formatter'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAlignJustify)

const app = createApp(App)
app.use(store).use(router).use(formatter)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('ripple-btn', RippleBtn)
app.mount('#app')