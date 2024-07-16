import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import userResource from './state/userData'

import {
    FrappeUI,
    setConfig,
    frappeRequest,
} from 'frappe-ui'

function sessionUser() {
    const cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
    let _sessionUser = cookies.get('user_id')
    if (_sessionUser === 'Guest') {
      _sessionUser = null
    }
    return _sessionUser
  }


const routes = [
    {
        path: '/',
        redirect: '/tickets'
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: () => import('./components/ListView.vue')
    },
    {
        path: '/tickets/:name',
        name: 'detailpage',
        component: () => import('./components/TicketDetails.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach(async (to, from, next) =>  {
    const isUserLoggedIn = Boolean(sessionUser()) // the part to figure out

    if (isUserLoggedIn) {
        await userResource.promise
        next()
    } else {
        // redirect them to Frappe's login page
        window.location.href = "/login?redirect-to=/tickets"
    }
})




const app = createApp(App)
app.use(FrappeUI)
app.use(router)
app.provide('userResource', userResource)

setConfig('resourceFetcher', frappeRequest)
app.mount('#app')