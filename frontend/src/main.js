import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

if (!localStorage.getItem('user')) {
    localStorage.setItem('isLoggedIn', false);
}

app.use(router);
app.mount('#app');

// Vue.config.productionTip = false;

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app');