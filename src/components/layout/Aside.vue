<template>
    <el-menu :collapse=false router :default-active="onRoute" unique-opened>
        <template v-for="item in items">
            <template v-if="item.children.length">
                <el-submenu :index="item.name" :key="item.name">
                    <template slot="title">
                        {{ item.name }}
                    </template>
                    <el-menu-item v-for="i in item.children" :key="i.name" :index="i.path">
                        {{ i.name }}
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.path" :key="item.name">
                    {{ item.name }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
    export default {
        data: function () {
            return {
                items: []
            }
        },
        computed: {
            // 当前路由对应的菜单
            onRoute: function () {
                return this.$route.path;
            }
        },
        created: function () {
            // 可以通过 ajax 获取不同的菜单
            this.items = [{
                    name: '首页',
                    path: '/home',
                    children: []
                },
                {
                    name: '安全管理',
                    path: '/',
                    children: [{
                            name: '配置文件',
                            path: '/security/configure'
                        },
                        {
                            name: '专家管理',
                            path: '/security/expert'
                        }
                    ]
                },
                {
                    name: '信息管理',
                    path: '/',
                    children: [{
                            name: '终端管理',
                            path: '/message/terminal'
                        },
                        {
                            name: '营业厅管理',
                            path: '/message/bussinessHall'
                        },
                        {
                            name: '代理商管理',
                            path: '/message/agent'
                        },
                        {
                            name: '办公用户管理',
                            path: '/message/officeUser'
                        },
                        {
                            name: '在线用户管理',
                            path: '/message/onlineUser'
                        },
                        {
                            name: '最近使用系统',
                            path: '/message/recentUse'
                        }
                    ]
                },
                {
                    name: '应用管理',
                    path: '/',
                    children: [{
                            name: '软件管理',
                            path: '/application/soft'
                        },
                        {
                            name: '培训管理',
                            path: '/application/train'
                        },
                        {
                            name: '应用链接管理',
                            path: '/application/app'
                        }
                    ]
                },
                {
                    name: '系统管理',
                    path: '/',
                    children: [{
                            name: '用户管理',
                            path: '/system/user'
                        },
                        {
                            name: '外渠组织架构',
                            path: '/system/out'
                        },
                        {
                            name: '办公组织架构',
                            path: '/system/office'
                        }
                    ]
                },
                {
                    name: '事务管理',
                    path: '/task',
                    children: []
                }
            ];
        }
    }
</script>

<style scoped>
    .el-menu {
        border: none;
    }
</style>