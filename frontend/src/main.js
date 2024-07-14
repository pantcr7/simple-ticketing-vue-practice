import './main.css'
import { createApp } from 'vue'
import App from './App.vue'

import {
    FrappeUI,
    setConfig,
    frappeRequest,
} from 'frappe-ui'

const app = createApp(App)
app.use(FrappeUI)
setConfig('resourceFetcher', frappeRequest)
app.mount('#app')