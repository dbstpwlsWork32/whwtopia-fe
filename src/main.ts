import { createApp } from 'vue'
import App from './App/index.vue'

import 'normalize.css'
import '@assets/styles/main.scss'
// import './registerServiceWorker'
import router from './router'

// global custom modules
import formatter from '@/globals/plugins/formatter'
import useRippleEffect from '@/globals/directives/rippleEffect'
import useClickSync from '@/globals/directives/clickSync'
import useMountedFocus from '@/globals/directives/mountedFocus'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faCog, faHeart as farHeart, faComment, faEye } from '@fortawesome/free-solid-svg-icons'
import { faStickyNote, faBookmark, faAddressBook, faPaperPlane, faNewspaper, faImages, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBars, faStickyNote, faBookmark, faAddressBook, faCog, faPaperPlane, faNewspaper, faImages, faHeart, faComment, faEye, farHeart)

const app = createApp(App)
app.use(router).use(formatter)

// set directive
useRippleEffect(app)
useClickSync(app)
useMountedFocus(app)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')