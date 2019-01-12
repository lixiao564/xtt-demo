<template>
    <div class="common">
        <div>
            <div class="title">
                <i class="el-icon-cqdx-table"></i>
                <span>专家列表</span>
            </div>
            <div class="content">
                <el-datagrid :url="url" :params="{}" :option="datagridOption" :reload-event="datagridName"
                    @toolbarClick="toolbarClick"></el-datagrid>
            </div>
        </div>

        <!-- 新增 dialog -->
        <el-dialog title="新增" :visible.sync="addDialogVisible" :close-on-click-modal="false">
            <el-form :model="addData" :rules="rules" ref="addForm" label-width="90px">
                <el-form-item label="专家工号" prop="expert_id">
                    <el-input v-model="addData.expert_id"></el-input>
                </el-form-item>
                <el-form-item label="专家姓名" prop="expert_name">
                    <el-input v-model="addData.expert_name"></el-input>
                </el-form-item>
                <el-form-item label="一级分类" prop="expert_type">
                    <el-radio v-model="addData.expert_type" label="CRM专家">CRM专家</el-radio>
                    <el-radio v-model="addData.expert_type" label="系统专家">系统专家</el-radio>
                </el-form-item>
                <el-form-item label="二级分类" prop="type_two">
                    <el-input v-model="addData.type_two"></el-input>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="dialogHide('addDialogVisible')">取消</el-button>
                    <el-button type="primary" @click="addSure">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import ElDatagrid from '../../../ElDatagrid.vue';
    import bus from '../../../../utils/bus.js';

    export default {
        name: 'expert',

        components: {
            ElDatagrid
        },
        data() {
            return {

                // 数据表格
                url: './specialList.do',
                datagridName: this._random('datagrid'),
                datagridOption: {
                    toolbar: [{
                            name: '新增',
                            type: 'primary',
                            icon: 'plus',
                            usable: true
                        },
                        {
                            name: '删除',
                            type: 'danger',
                            icon: 'delete',
                            usable: false
                        }
                    ],
                    columns: [{
                            title: '专家工号',
                            data: 'expert_id'
                        },
                        {
                            title: '专家姓名',
                            data: 'expert_name'
                        },
                        {
                            title: '专家一级分类',
                            data: 'expert_type',
                            formatterFn: (...rest) => {
                                if (rest[2] == '1') {
                                    return 'CRM专家';
                                } else {
                                    return '系统专家';
                                }
                            }
                        },
                        {
                            title: '专家二级分类',
                            data: 'type_two'
                        },
                        {
                            title: '提名专家时间',
                            data: 'expert_date'
                        },
                        {
                            title: '是否在线',
                            data: 'online_flag',
                            formatterFn: (...rest) => {
                                if (rest[2] == 'no') {
                                    return '不在线';
                                } else {
                                    return '在线';
                                }
                            }
                        }
                    ],
                    checkbox: true
                },

                // 新增 dialog
                addDialogVisible: false,
                addData: {},

                rules: {
                    expert_id: {
                        required: true,
                        message: '请填写'
                    },
                    expert_name: {
                        required: true,
                        message: '请填写'
                    },
                    expert_type: {
                        required: true,
                        message: '请选择'
                    },
                    type_two: {
                        required: true,
                        message: '请填写'
                    }
                }
            }
        },
        methods: {
            reload() {
                bus.$emit(this.datagridName);
            },
            toolbarClick(params) {
                const [rows, type] = params;
                switch (type) {
                    case '新增':
                        this.dialogShow('addDialogVisible');
                        break;
                    case '删除':
                        const params = rows.map((row) => {
                            return row.expert_id;
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
            addSure() {
                const submitFn = () => {
                    const params = this.addData;
                    const callback = () => {
                        this.dialogHide('addDialogVisible');
                        this._alert('新增成功！', 'success', this.reload);
                    };
                    this._ajax('post', './addExpert.do', callback, params);
                };
                this._form('addForm', submitFn);
            },
            delete(ids) {
                const sureFn = () => {
                    const params = {
                        expertId: ids
                    };
                    const callback = () => {
                        this._alert('删除成功！', 'success', this.reload);
                    };
                    this._ajax('delete', './specialDelete.do', callback, params);
                };
                this._confirm('确定要删除吗？', sureFn);
            }
        }
    }
</script>

<style scoped>

</style>