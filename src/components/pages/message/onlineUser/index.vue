<template>
    <div>
        <div>
            <el-collapse v-model="activeName">
                <el-collapse-item title="查询" name="search">
                    <el-form :model="formData" ref="form" inline>
                        <el-form-item label="工号:">
                            <el-input v-model="formData.number"></el-input>
                        </el-form-item>
                        <el-form-item label="唯一标识符:">
                            <el-input v-model="formData.identifier"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="searchTable">查询</el-button>
                        <el-button type="success" @click="examineAll">查看所有</el-button>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="在线用户列表" name="data">
                    <el-datagrid :url="url" :params="formData" :option="datagridOption" :reload-event="reloadName"></el-datagrid>
                </el-collapse-item>
            </el-collapse>
        </div>

    </div>
</template>

<script>
    import ElDatagrid from '../../../ElDatagrid.vue';
    import bus from '../../../../utils/bus.js';

    export default {
        components: {
            ElDatagrid
        },
        data: function () {
            return {
                // 两个面板默认展开
                activeName: ['search', 'data'],
                // 查询参数
                formData: {
                    number: '',
                    identifier: ''
                },

                // 数据表格
                url: '/onlineUserList.do',
                reloadName: 'onlineUserReload',
                datagridOption: {
                    columns: [{
                            title: '用户工号',
                            data: 'userNumber'
                        },
                        {
                            title: '客户端ip',
                            data: 'clientIp'
                        },
                        {
                            title: '唯一标识符',
                            data: 'identifier'
                        },
                        {
                            title: '在线时间',
                            data: 'onlineTime'
                        }
                    ],
                    checkbox: true
                },
            }
        },
        methods: {
            searchTable: function () {
                bus.$emit(this.reloadName);
            },
            examineAll: function () {
                for (const key of Object.keys(this.formData)) {
                    this.formData[key] = '';
                }
            }
        }

    }
</script>