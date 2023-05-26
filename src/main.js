import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {
  db
} from './firebaseConfig'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  db,
  render: h => h(App)
}).$mount('#app')
