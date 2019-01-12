<template>
    <div>
        <el-datagrid :url="url" :reload-event="reloadTest" :option="datagridOption" @rowClick="rowClickHandle" @toolbarClick="toolbarClickHandle"></el-datagrid>
    </div>
</template>

<script>
    import ElDatagrid from '../ElDatagrid.vue';
    import bus from '../../utils/bus.js';

    export default {
        components: {
            ElDatagrid
        },
        data: function () {
            return {
                url: '/test',
                reloadTest: 'datagridReload',
                datagridOption: {
                    toolbar: [{
                            name: '刷新',
                            type: 'primary',
                            icon: 'refresh',
                            usable: true
                        },
                        {
                            name: '增加',
                            type: 'success',
                            icon: 'plus',
                            usable: true
                        },
                        {
                            name: '修改',
                            type: 'warning',
                            icon: 'edit',
                            usable: false
                        }
                    ],
                    columns: [{
                            title: '姓名',
                            data: 'name'
                        },
                        {
                            title: '开学了',
                            data: 'age'
                        },
                        {
                            title: '操作',
                            data: '',
                            actions: [{
                                    name: '详情',
                                    type: 'info'
                                },
                                {
                                    name: '删除',
                                    type: 'danger'
                                }
                            ]
                        }
                    ],
                    checkbox: true
                    // pageSize: 5 默认为每页5条数据
                }
            }
        },
        methods: {
            rowClickHandle: function (params) {
                const [row, type] = params;
            },
            toolbarClickHandle: function(params) {
                const [rows, type] = params;
                if (type == '刷新') {
                    bus.$emit(this.reloadTest);
                }
            }
        }
    }

</script>
