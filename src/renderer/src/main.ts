import '@renderer/styles/reset.css'
import '@renderer/styles/tailwind.css'

import installElement from './utils/element'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import App from './App.vue'

const app= createApp(App)

installElement(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.mount('#app')