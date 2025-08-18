import { createApp } from 'vue'
import App from './App.vue'
import AnimateOnVisible from "./components/AnimateOnVisible.vue"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopyright, faCode } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCopyright, faCode, faFacebookSquare, faInstagramSquare, faLinkedin, faGithubSquare)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('AnimateOnVisible', AnimateOnVisible)

app.mount('#app')

import 'bootstrap/dist/css/bootstrap.css'
import './styles/global.scss'
