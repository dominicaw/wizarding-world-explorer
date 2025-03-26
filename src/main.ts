import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import './assets/main.css'
import { CustomTheme } from './theme'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.use(PrimeVue, {
  theme: {
    preset: CustomTheme,
  },
  options: {
    darkModeSelector: false,
  },
})

app.mount('#app')
