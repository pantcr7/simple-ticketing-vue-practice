import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import {
    FrappeUI,
    setConfig,
    frappeRequest,
} from 'frappe-ui'


const routes = [
    {
        path: '/',
        redirect: '/tickets'
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: import('./components/ListView.vue')
    },
    {
        path: '/tickets/:name',
        name: 'detailpage',
        component: import('./components/TicketDetails.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


const app = createApp(App)
app.use(FrappeUI)
app.use(router)
setConfig('resourceFetcher', frappeRequest)
app.mount('#app')