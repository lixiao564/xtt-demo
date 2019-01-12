const routes=[
    {
        path:'/system/office',
        meta:{
            title:'办公组织结构',
            name: 'office'
        },
        component: resolve=>require(['../components/pages/system/office/'],resolve)
    },
    {
        path:'/system/out',
        meta:{
            title:'外渠组织结构',
            name: 'out'
        },
        component:resolve=>require(['../components/pages/system/out/'],resolve)
    },
    {
        path: '/system/user',
        meta: {
            title: '用户管理',
            name: 'user'
        },
        component: resolve => require(['../components/pages/system/user/'], resolve)
    }
]
export default routes;