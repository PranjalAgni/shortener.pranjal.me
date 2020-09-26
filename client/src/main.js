import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
