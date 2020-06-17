import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import vuetify from './plugins/vuetify';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js'
import router from './router'

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
