import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import messagePlugin from '@/utils/message.plugin'
import router from './router'
import store from './store'
import currencyFilter from '@/filter/currencyFilter'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Loader', Loader)
Vue.filter('currency', currencyFilter)


firebase.initializeApp({
  apiKey: "AIzaSyAYkZjpVJsTq9ZiR2rvlWvIjT0ffG7yYHE",
  authDomain: "vue-tregubenko.firebaseapp.com",
  projectId: "vue-tregubenko",
  storageBucket: "vue-tregubenko.appspot.com",
  messagingSenderId: "52355143363",
  appId: "1:52355143363:web:53d238173e34e4da86f476",
  measurementId: "G-X4NT09YZB1"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


