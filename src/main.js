import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/md-dark-indigo/theme.css"
import "primevue/resources/primevue.min.css"               
import "primeicons/primeicons.css"             
import ToastService from 'primevue/toastservice'; 


createApp(App).use(PrimeVue).use(ToastService).use(store).use(router).mount('#app')


