const routes = [{
        path: '/security/configure',
        meta: {
            title: '配置文件',
            name: 'config'
        },
        component: resolve => require(['../components/pages/security/configure/'], resolve)
    }, {
        path: '/security/expert',
        meta: {
            title: '专家管理',
            name: 'expert'
        },
        component: resolve => require(['../components/pages/security/expert/'], resolve)
    }
];

export default routes;