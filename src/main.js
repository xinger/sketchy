import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/global.styl';
import themes from '@/themes';

Vue.config.productionTip = false;

themes.set('dark');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
