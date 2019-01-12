import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes';

Vue.use(Router)

const router = new Router({
    routes
});

// 前端做的判断是否登录
router.beforeEach((to, from, next) => {
    if (to.path != '/login') {
        if (sessionStorage.getItem('state') == 'admin') {
            next();
        } else {
            next('/login');
        }
    } else {
        if (sessionStorage.getItem('state') == 'admin') {
            next('/home');
        } else {
            next();
        }
    }
});

export default router;