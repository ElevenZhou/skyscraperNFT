import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3Component from './web3'

createApp(<App />).use(Web3Component).use(store).use(router).mount('#app')
