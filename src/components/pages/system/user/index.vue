<template>
    <div class="common">
        <div>
            <div class="title">
                <i class="el-icon-search"></i>
                <span>查询</span>
            </div>
            <div class="content">
                <el-form :inline="true" :model="search">
                    <el-form-item label="用户名称">
                        <el-input v-model="search.empName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户所属部门">
                        <el-cascader :props="treeProps" :options="treeData" v-model="search.treeId" :show-all-levels="false"
                            change-on-select clearable @change="cascaderChange"></el-cascader>
                        <div style="display: none;">
                            <el-input v-model="search.empDept"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="searchTable">查询</el-button>
                        <el-button type="info" icon="el-icon-cqdx-redo" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div>
            <div class="title">
                <i class="el-icon-cqdx-table"></i>
                <span>用户列表</span>
            </div>
            <div class="content">
                <el-datagrid :url="url" :params="search" :option="datagridOption" :reload-event="datagridName"
                    @toolbarClick="toolbarClick"></el-datagrid>
            </div>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :model="dialogData" :rules="rules" ref="dialogForm" label-width="80px">
                <el-form-item label="用户姓名" prop="empName">
                    <el-input v-model="dialogData.empName"></el-input>
                </el-form-item>
                <el-form-item label="用户工号" prop="empId">
                    <el-input v-model="dialogData.empId"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="treeId">
                    <el-cascader :props="treeProps" :options="treeData" v-model="dialogData.treeId" :show-all-levels="false"
                        change-on-select style="width: 100%;"></el-cascader>
                </el-form-item>
                <el-form-item label="邮箱" prop="empEmail">
                    <el-input v-model="dialogData.empEmail"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="empPhone">
                    <el-input v-model="dialogData.empPhone"></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="dialogHide('dialogVisible')">取消</el-button>
                    <el-button type="primary" @click="dialogSure">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import ElDatagrid from '../../../ElDatagrid.vue';
    import bus from '../../../../utils/bus.js';

    export default {
        name: 'user',

        components: {
            ElDatagrid
        },
        data() {
            return {

                treeProps: {
                    value: 'id',
                    label: 'text',
                    children: 'children'
                },
                treeData: [],

                search: {},
                url: './userListQuery.do',
                datagridName: this._random('datagrid'),
                datagridOption: {
                    toolbar: [{
                            name: '新增',
                            type: 'primary',
                            icon: 'plus',
                            usable: true
                        },
                        {
                            name: '修改',
                            type: 'warning',
                            icon: 'edit',
                            usable: false
                        },
                        {
                            name: '删除',
                            type: 'danger',
                            icon: 'delete',
                            usable: false
                        }
                    ],
                    columns: [{
                            title: '用户工号',
                            data: 'empId'
                        },
                        {
                            title: '用户姓名',
                            data: 'empName'
                        },
                        {
                            title: '所属部门',
                            data: 'deptName'
                        },
                        {
                            title: '邮箱',
                            data: 'empEmail'
                        },
                        {
                            title: '联系方式',
                            data: 'empPhone'
                        }
                    ],
                    checkbox: true
                },

                dialogTitle: '',
                dialogVisible: false,
                dialogData: {},
                rules: {
                    empName: {
                        required: true,
                        message: '请填写'
                    },
                    empId: {
                        required: true,
                        message: '请填写'
                    },
                    treeId: {
                        required: true,
                        message: '请选择'
                    }
                }
            }
        },
        methods: {
            searchTable() {
                bus.$emit(this.datagridName);
            },
            reset() {
                this.search = {};
            },
            cascaderChange(value) {
                this.search.empDept = value[value.length - 1];
            },
            toolbarClick(params) {
                const [rows, type] = params;
                switch (type) {
                    case '新增':
                        this.dialogData = {};
                        this.dialogTitle = '新增';
                        this.dialogShow('dialogVisible');
                        break;
                    case '修改':
                        if (rows.length > 1) {
                            this._alert('请选择一项', 'error')
                        } else {
                            const data = JSON.parse(JSON.stringify(rows[0]));
                            if (!data.treeId) {
                                data.treeId = '';
                            }
                            data.treeId = data.treeId.split(',');
                            this.dialogData = data;
                            this.dialogTitle = '修改';
                            this.dialogShow('dialogVisible');
                        }
                        break;
                    case '删除':
                        const params = rows.map((row) => {
                            return row.empId;
                        }).join(',');
                        this.delete(params);
                        break;
                    default:
                        break;
                }
            },
            dialogHide(name) {
                this[name] = false;
            },
            dialogShow(name) {
                this[name] = true;
            },
            dialogSure() {
                const submitFn = () => {
                    const params = JSON.parse(JSON.stringify(this.dialogData));
                    params.deptName = params.treeId[params.treeId.length - 1];
                    if (this.dialogTitle == '新增') {
                        params.opType = '1';
                    } else {
                        params.opType = '0';
                    }
                    const callback = () => {
                        this.dialogHide('dialogVisible');
                        this.dialogData = {};
                        this._alert('操作成功！', 'success', this.searchTable);
                    };
                    this._ajax('post', './userAdd.do', callback, params);
                };
                this._form('dialogForm', submitFn);
            },
            delete(ids) {
                const sureFn = () => {
                    const params = {
                        empId: ids
                    };
                    const callback = () => {
                        this._alert('删除成功！', 'success', this.searchTable);
                    };
                    this._ajax('delete', './userDelete.do', callback, params);
                };
                this._confirm('确定要删除吗？', sureFn);
            },
            getTree() {
                const callback = (data) => {
                    this.treeData = JSON.parse(data);
                };
                this._ajax('get', './officeOrganizationTreeQuery.do', callback, {}, 'unblock');
            }
        },
        created() {
            this.getTree();
        }
    }
</script>

<style scoped>

</style>