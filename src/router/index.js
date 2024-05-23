// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Register_Page from '../components/Register_Page.vue';
import Login_Page from '../components/Login_Page.vue';
import MapComponent from '../components/MapComponent.vue';
import Home_Page from '../components/Home_Page.vue';

// Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home_Page
    },
    { 
        path: '/register',
        name: 'Register',
        component: Register_Page
    },
    { 
        path: '/login',
        name: 'Login',
        component: Login_Page 
    },
    { 
        path: '/map',
        name: 'Map', 
        component: MapComponent,
        meta: { requiresAuth: true }
    }
];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });

const router = createRouter({
    history: createWebHistory(),
    routes
  });

router.beforeEach((to, from, next) => {
    // const isAuthenticated = !!localStorage.getItem('user'); // Simple authentication check
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });

export default router;