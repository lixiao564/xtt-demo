<template>
    <div class="tabs">
        <el-tag v-for="tab in this.tabs" :key="tab.name" :closable="tab.closable" @close="closeTab((tab.name))" :class="{ 'active': isActive(tab.path) }">
            <router-link :to="tab.path">{{ tab.name }}</router-link>
        </el-tag>
    </div>
</template>

<script>
    import bus from '../../utils/bus.js';

    export default {
        data: function () {
            return {
                tabs: [{
                        name: '首页',
                        path: '/home',
                        closable: false
                    }
                ]
            }
        },
        computed: {
            tabsName: function() {
                let names = [];
                for (let tab of this.tabs) {
                    names.push(tab.name);
                }
                return names;
            }
        },
        methods: {
            setTab: function(route) {
                let name = route.meta.title;
                let vueName = route.meta.name;
                if (this.tabsName.indexOf(name) == -1) {
                    let tab = {
                        name,
                        vueName,
                        path: route.path,
                        closable: true
                    }
                    this.tabs.push(tab);
                };
                bus.$emit('tab', this.tabs);
            },
            closeTab: function(name) {
                let index = this.tabsName.indexOf(name);
                let removeTab = this.tabs.splice(index, 1);
                // 删除的是最后一个标签
                if (index == this.tabs.length) {
                    this.$router.push(this.tabs[index-1].path);
                } else if (removeTab[0].path == this.$route.path) {
                    this.$router.push(this.tabs[index].path);
                }
                bus.$emit('tab', this.tabs);
            },
            isActive: function(path) {
                return path == this.$route.path
            }
        },
        watch:{
            // 不知道为什么 vue-cli 构建的项目，直接F5刷新不会触发这个事件
            $route(newValue, oldValue){
                this.setTab(newValue);
            }
        },
        created: function() {
            this.setTab(this.$route);
        }
    }

</script>

<style scoped>
    .tabs {
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        box-shadow: 0px 2px 1px #666;
    }
    .tabs span {
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        margin-right: 5px;
    }
    .tabs a {
        text-decoration: none;
    }
    .el-tag {
        background-color: white;
    }
    .el-tag a {
        color: #666;
    }
    .el-tag.active {
        background-color: #409eff;
    }
    .el-tag.active a {
        color: white;
    }
</style>