import Vuex, { Store } from 'vuex';
import Vue from 'vue';
import shortener from './modules/shortener';

Vue.use(Vuex);

export default new Store({
  modules: {
    shortener,
  },
});
