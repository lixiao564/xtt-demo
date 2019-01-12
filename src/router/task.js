const routes = [{
        path: '/task',
        meta: {
            title: '事务管理',
            name: 'task'
        },
        component: resolve => require(['../components/pages/task/'], resolve)
    }
];

export default routes;