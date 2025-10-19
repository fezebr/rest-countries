import CountryDetailsPage from '@/pages/CountryDetailsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/country/:code', name: 'country-details', component: CountryDetailsPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
