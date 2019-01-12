<template>
    <div>
        <el-button type="primary" @click="loadingTest">loading</el-button>

        <el-button type="success" @click="alertTest">alert</el-button>

        <el-button type="warning" @click="confirmTest">confirm</el-button>

        <el-button type="info" @click="getAjax">get</el-button>
        <el-button type="info" @click="postAjax">post</el-button>
        <el-button type="info" @click="putAjax">put</el-button>
        <el-button type="info" @click="deleteAjax">delete</el-button>

        <el-tree :data="treeData" :props="treeProps" :expand-on-click-node="false" @node-click="clickTree"></el-tree>
        <el-cascader :props="treeProps" :options="treeData">

        </el-cascader>
    </div>
</template>

<script>
    export default {
        components: {
            
        },
        data: function () {
            return {
                dialogVisible: false,
                clickModal: false,
                treeData: [],
                treeProps: {
                    label: 'text',
                    value: 'id',
                    children: 'children'
                }
            }
        },
        methods: {
            loadingTest: function () {
                const loading = this._loading('自定义提示内容');
                setTimeout(() => {
                    loading.close();
                }, 2000);
            },
            alertTest: function () {
                this._alert('alert的提示内容...');
            },
            confirmTest: function () {
                const callback = () => {
                    this._alert('点击了 confirm 的确定按钮')
                };
                const content = '确定删除......吗？';
                this._confirm(content, callback);
            },
            getAjax: function() {
                const callback = (res) => {
                    console.log(res);
                };
                const params = {
                    name: 'lixiao'
                };
                this._ajax('get', '/axios', callback, params);
            },
            postAjax: function() {
                const callback = () => {
                    console.log('success');
                };
                const params = {
                    name: 'lixiao'
                };
                this._ajax('post', '/axios', callback, params);
            },
            putAjax: function() {
                const callback = () => {
                    console.log('success');
                };
                const params = {
                    name: 'lixiao'
                };
                this._ajax('put', '/axios', callback, params);
            },
            deleteAjax: function() {
                const callback = () => {
                    console.log('success');
                };
                const params = {
                    name: 'lixiao'
                };
                this._ajax('delete', '/axios', callback, params);
            },
            getTree() {
                const callback = (res) => {
                    if (res.code == 0) {
                        this.treeData = JSON.parse(res.data);
                    }
                };
                // this._ajax('get', './officeOrganizationTreeQuery.do', callback, {});
            },
            clickTree: function(data) {
                console.log(data.id);
            }
        },
        created: function() {
            this.getTree();
        }
    }

</script>
