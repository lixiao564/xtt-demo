<template>
    <div>
        <div>
            <el-collapse v-model="activeName">
                <el-collapse-item title="查询" name="search">
                    <el-form :model="formData" ref="form" inline>
                        <el-form-item label="查询时间:">
                            <el-date-picker v-model="formData.time" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="账号:">
                            <el-input v-model="formData.account"></el-input>
                        </el-form-item>
                        <el-form-item label="营业厅名:">
                            <el-input v-model="formData.hallName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属区县:">
                            <el-select v-model="formData.area">
                                <el-option v-for="item in areas" :key="item.label" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="唯一标识符:">
                            <el-input v-model="formData.identifier"></el-input>
                        </el-form-item>
                        <el-form-item label="版本号:">
                            <el-input v-model="formData.versionNumber"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="searchTable">查询</el-button>
                        <el-button type="success" @click="examineAll">查看所有</el-button>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="机器列表" name="data">
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
                //下拉框数据
                areas: [{
                        lable: '中国电信',
                        value: '中国电信'
                    },
                    {
                        lable: '四川电信',
                        value: '四川电信'
                    }
                ],
                // 表单元素
                formData: {},

                // 数据表格
                url: '/recentList',
                reloadName: 'recentUseReload',
                datagridOption: {
                    toobar: [{
                        name: '导出',
                        type: 'primary',
                        icon: 'search',
                        usable: false
                    }],
                    columns: [{
                            title: '联系电话',
                            data: 'phone'
                        },
                        {
                            title: '代理商',
                            data: 'agent'
                        },
                        {
                            title: 'MAC地址',
                            data: 'macAddress'
                        },
                        {
                            title: 'IP',
                            data: 'ip'
                        },
                        {
                            title: '唯一标识符',
                            data: 'identifierNum'
                        },
                        {
                            title: '营业厅名',
                            data: 'agentName'
                        },
                        {
                            title: '网点地址',
                            data: 'netAddress'
                        },
                        {
                            title: '所属区县',
                            data: 'belongArea'
                        },
                        {
                            title: '最后上线时间',
                            data: 'onlineTime'
                        },
                        {
                            title: '版本号',
                            data: 'versionNum'
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
            },
            toolbarClickHandle: function (params) {
                const [rows, type] = params;
                switch (type) {
                    case '导出':
                        {;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>