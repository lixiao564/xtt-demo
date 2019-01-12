const routes=[
    {
        path:'/application/soft',
        meta:{
            title:'软件管理'
        },
        component:resolve=> require(['../components/pages/application/soft/'],resolve)
    },
    {
        path:'/application/train',
        meta:{
            title:'培训管理'
        },
        component:resolve=>require(['../components/pages/application/train/'],resolve)
    },
    {
        path:'/application/app',
        meta:{
            title:'应用链接管理'
        },
        component:resolve=>require(['../components/pages/application/app/'],resolve)
    },
    {
        path:'/application/assign',
        meta:{
            title:'软件发布任务管理'
        },
        component: resolve=>require(['../components/pages/application/soft/Assign.vue'],resolve)
    },
    {
        path:'/application/upload',
        meta:{
            title:'新增上传软件'
        },
        component: resolve=>require(['../components/pages/application/soft/Upload.vue'],resolve)
    },
    {
        path:'/application/info',
        meta:{
            title:'上传资料'
        },
        component:resolve=>require(['../components/pages/application/train/Upload.vue'],resolve)
    }
]

export default routes;