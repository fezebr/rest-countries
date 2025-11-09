import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faArrowLeft, faChevronDown, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { VueQueryPlugin } from '@tanstack/vue-query'

library.add(faSearch, faArrowLeft, faChevronDown, faMoon, faSun);

const app = createApp(App);
const vueQueryOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    },
  }
  
  
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(VueQueryPlugin, vueQueryOptions)

app.mount('#app');
