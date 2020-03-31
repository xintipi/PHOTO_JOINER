import Vue from 'vue'
import App from './App.vue'

import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
