import Vue from 'vue'
import App from './App.vue'
import Modeler from '../app/modeler'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
