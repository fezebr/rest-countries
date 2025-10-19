import CountryDetailsPage from '@/pages/CountryDetailsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
 
const routes = [
  { path: '/', component: HomePage },
  { path: '/country/:code', component: CountryDetailsPage, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
