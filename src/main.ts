import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { router } from './routes.ts'
import i18n from './i18n/i18n.ts'
import { configure } from 'vee-validate'
import { VueQueryPlugin } from '@tanstack/vue-query'

const piniaPersistedState = createPersistedState()
const pinia = createPinia()
pinia.use(piniaPersistedState)

configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
})

const app = createApp(App)

app.use(pinia)

app.use(ElementPlus)

app.use(VueQueryPlugin)

app.use(router)

app.use(i18n)

app.mount('#app')
