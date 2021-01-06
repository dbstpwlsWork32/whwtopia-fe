import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'
import store from './store'

// global custom modules
import RippleBtn from '@/globals/components/RippleBtn.vue'
import formatter from '@/globals/plugins/formatter'
import RippleEffect from '@/globals/directives/rippleEffect'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAlignJustify, faCog } from '@fortawesome/free-solid-svg-icons'
import { faStickyNote, faBookmark, faAddressBook, faPaperPlane, faNewspaper, faImages } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faAlignJustify, faStickyNote, faBookmark, faAddressBook, faCog, faPaperPlane, faNewspaper, faImages)

const app = createApp(App)
app.use(store).use(router).use(formatter)
// set directive 
RippleEffect(app)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')