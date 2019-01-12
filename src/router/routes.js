import security from './security';
import application from './application';
import system from './system';
import message from './message';
import task from './task';

const index = [{
        path: '/home',
        meta: {
            title: '首页'
        },
        component: resolve => require(['../components/pages/Home.vue'], resolve)
    }
];

// 配置路由
const childrenRoutes = index.concat(security, application, system, message, task);

const routes = [{
        path: '/',
        meta: {
            title: '前端界面'
        },
        redirect: '/home',
        // 实现路由懒加载
        component: resolve => require(['../components/pages/Dashboard.vue'], resolve),
        children: childrenRoutes
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: resolve => require(['../components/pages/Login.vue'], resolve)
    },
    {
        path: '/404',
        meta: {
            title: '404'
        },
        component: resolve => require(['../components/pages/404.vue'], resolve)
    },
    // 没有匹配的路由都去 404
    {
        path: '/*',
        redirect: '/404'
    }

];

export default routes;