<template>
    <div class="common">
        <el-row>
            <el-col :span="6">
                <div class="title">
                    <i class="el-icon-cqdx-team"></i>
                    <span>组织结构</span>
                </div>
                <div class="content">
                    <el-tree :data="treeData" :props="treeProps" :expand-on-click-node="false" @node-click="clickTree"></el-tree>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="title">
                    <i class="el-icon-cqdx-table"></i>
                    <span>组织机构信息</span>
                </div>
                <div class="content">
                    <el-datagrid :url="url" :params="search" :option="datagridOption" :reload-event="datagridName"
                        @toolbarClick="toolbarClick"></el-datagrid>
                </div>
            </el-col>
        </el-row>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :model="dialogData" :rules="rules" ref="dialogForm" label-width="80px">
                <el-form-item label="部门名称" prop="deptName">
                    <el-input v-model="dialogData.deptName"></el-input>
                </el-form-item>
                <el-form-item label="父部门" prop="treeId">
                    <el-cascader :props="treeProps" :options="treeData" v-model="dialogData.treeId" :show-all-levels="false"
                        change-on-select style="width: 100%;"></el-cascader>
                </el-form-item>
                <el-form-item label="部门地址" prop="deptAddress">
                    <el-input v-model="dialogData.deptAddress"></el-input>
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
        name: 'office',

        components: {
            ElDatagrid
        },
        data() {
            return {
                // 树的参数
                treeProps: {
                    value: 'id',
                    label: 'text',
                    children: 'children'
                },
                treeData: [],
                // 数据表格的参数
                search: {
                    deptId: ''
                },
                url: './officeOrgListQuery.do',
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
                            title: '部门编号',
                            data: 'deptId'
                        },
                        {
                            title: '部门名称',
                            data: 'deptName'
                        },
                        {
                            title: '上级部门',
                            data: 'parentDept'
                        }
                    ],
                    checkbox: true
                },
                // dialog 参数
                dialogTitle: '',
                dialogVisible: false,
                dialogData: {},
                rules: {
                    deptName: {
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
            getTree() {
                const callback = (data) => {
                    this.treeData = JSON.parse(data);
                };
                this._ajax('get', './officeOrganizationTreeQuery.do', callback, {}, 'unblock');
            },
            clickTree(data) {
                this.search.deptId = data.id;
                this.reload();
            },
            reload() {
                bus.$emit(this.datagridName);
            },
            reloadAll() {
                this.getTree();
                this.reload();
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
                            data.treeId.pop();
                            this.dialogData = data;
                            this.dialogTitle = '修改';
                            this.dialogShow('dialogVisible');
                        }
                        break;
                    case '删除':
                        if (rows.length > 1) {
                            this._alert('请选择一项', 'error')
                        } else {
                            this.delete(rows[0].deptId);
                        }
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
                    params.deptParent = params.treeId[params.treeId.length - 1];
                    if (this.dialogTitle == '新增') {
                        params.opType = '1';
                    } else {
                        params.opType = '0';
                    }
                    const callback = () => {
                        this.dialogHide('dialogVisible');
                        this._alert('操作成功！', 'success', this.reloadAll);
                    };
                    this._ajax('post', './officeOrganizationAdd.do', callback, params);
                };
                this._form('dialogForm', submitFn);
            },
            delete(id) {
                const sureFn = () => {
                    const params = {
                        deptId: id
                    };
                    const callback = () => {
                        this._alert('删除成功！', 'success', this.reloadAll);
                    };
                    this._ajax('delete', './officeOrgDelete.do', callback, params);
                };
                this._confirm('确定删除吗？', sureFn);
            }
        },
        created() {
            this.getTree();
        }
    }
</script>

<style scoped>
    .el-tree {
        border: 1px solid #ebeef5;
    }

    .el-col-6 {
        padding-right: 10px;
    }
</style>