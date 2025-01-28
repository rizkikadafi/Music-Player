import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import SongsView from './views/SongsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/songs', component: SongsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)

app
  .use(router)
  .mount('#app')
