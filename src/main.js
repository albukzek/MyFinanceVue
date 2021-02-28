import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import messagePlugin from '@/utils/message.plugin'
import router from './router'
import store from './store'
import currencyFilter from '@/filter/currencyFilter'
import tooltipDirective from '@/directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(messagePlugin)
Vue.use(Vuelidate)
// Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirective )
Vue.component('Paginate', Paginate)


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


