import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket-io'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'

import { store } from './store'

Vue.use(Vuetify);
Vue.use(VueSocketIO, 'ws://localhost:5000');
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  vuetify,
  store,
  render: h => h(App)
})