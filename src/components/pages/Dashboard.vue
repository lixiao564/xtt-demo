<template>
    <el-container>
        <!-- 最上面的一栏 -->
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container>
            <!-- 左侧菜单 -->
            <el-aside width="250px">
                <v-aside></v-aside>
            </el-aside>
            <!-- 内容区域 -->
            <el-main>
                <!-- 选项卡 -->
                <v-tabs></v-tabs>
                <!-- 路由对应的内容 -->
                <transition name="fade" mode="out-in">
                    <keep-alive :include="tabs">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import vHeader from '../layout/Header.vue';
    import vAside from '../layout/Aside.vue';
    import vTabs from '../layout/Tabs.vue';
    import bus from '../../utils/bus.js';

    export default {
        components: {
            vHeader,
            vAside,
            vTabs
        },
        data() {
            return {
                tabs: []
            }
        },
        created() {
            bus.$on('tab', params => {
                let arr = [];
                for (let i = 0, len = params.length; i < len; i++) {
                    arr.push(params[i].vueName);
                }
                this.tabs = arr;
            });
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #242f42;
        color: white;
    }

    .el-container {
        height: 100%;
    }

    .el-main {
        padding: 10px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.4s ease;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>