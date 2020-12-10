import Vue from 'vue'
import App from './App.vue'
import WhellUi from './index.js'

Vue.use(WhellUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
