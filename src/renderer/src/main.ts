import '@renderer/styles/reset.css'
import '@renderer/styles/tailwind.css'

import installElement from './utils/element'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const app= createApp(App)

installElement(app)

const pinia = createPinia()
app.use(pinia)


app.mount('#app')