const routes = [{
    path: '/message/terminal',
    meta: {
        title: '终端管理'
    },
    component: resolve => require(['../components/pages/message/terminal/'], resolve)
},
{
    path: '/message/bussinessHall',
    meta: {
        title: '营业厅管理'
    },
    component: resolve => require(['../components/pages/message/bussinessHall/'], resolve)
},
{
    path: '/message/agent',
    meta: {
        title: '代理商管理'
    },
    component: resolve => require(['../components/pages/message/agent/'], resolve)
},
{
    path: '/message/officeUser',
    meta: {
        title: '办公用户管理'
    },
    component: resolve => require(['../components/pages/message/officeUser/'], resolve)
},
{
    path: '/message/recentUse',
    meta: {
        title: '最近使用系统'
    },
    component: resolve => require(['../components/pages/message/recentUse/'], resolve)
},
{
    path: '/message/onlineUser',
    meta: {
        title: '在线用户管理'
    },
    component: resolve => require(['../components/pages/message/onlineUser/'], resolve)
}
];

export default routes;