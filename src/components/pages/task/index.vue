<template>
    <div class="common">
        <div>
            <div class="title">
                <i class="el-icon-search"></i>
                <span>查询</span>
            </div>
            <div class="content">
                <el-form :inline="true" :model="search">
                    <el-form-item label="事务名称">
                        <el-input v-model="search.affairsName"></el-input>
                    </el-form-item>
                    <el-form-item label="事务类型">
                        <el-select v-model="search.affairsType">
                            <el-option v-for="item in types" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
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
                <span>事务列表</span>
            </div>
            <div class="content">
                <el-datagrid :url="url" :params="search" :option="datagridOption" :reload-event="datagridName"
                    @toolbarClick="toolbarClick"></el-datagrid>
            </div>
        </div>

        <el-dialog title="事务发布" :visible.sync="addDialogVisible" :close-on-click-modal="false">
            <el-form :model="addDialogData" :rules="rules" ref="addDialogForm" label-width="60px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="affairsName">
                            <el-input v-model="addDialogData.affairsName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="affairType">
                            <el-select v-model="addDialogData.affairType" style="width: 100%;">
                                <el-option v-for="item in types" :key="item.label" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="内容" prop="affairsContent">
                    <el-input type="textarea" v-model="addDialogData.affairsContent" :autosize="{ minRows: 10}"></el-input>
                </el-form-item>
                <el-form-item label="附件" prop="">
                    <el-upload :limit="1" name="files" ref="upload" action="./affairsWrite.do" :data="addDialogData"
                        :auto-upload="false" :on-change="fileChange" :on-remove="fileChange" :before-upload="beforeUpload"
                        :on-success="onSuccess">
                        <el-button size="small" type="primary">选择文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能选择上传一个文件！</div>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button @click="dialogHide('addDialogVisible')">取消</el-button>
                    <el-button type="primary" @click="addDialogSure">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="事务阅读" :visible.sync="detailDialogVisible" :close-on-click-modal="false">
            <div class="content">
                <div class="row">
                    <span>{{ detailDialogData.affairsName }}</span>
                </div>
                <div class="row">
                    <span>发布时间：</span>
                    <span class="col">{{ detailDialogData.affairsDate }}</span>
                    <span>发布人：</span>
                    <span class="col">{{ detailDialogData.empName }}</span>
                    <span>类型：</span>
                    <span>{{ detailDialogData.affairsType }}</span>
                </div>
                <div class="">
                    <pre>{{ detailDialogData.affairsContent }}</pre>
                </div>
            </div>
            <div slot="footer">
                <el-button @click="dialogHide('detailDialogVisible')">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElDatagrid from '../../ElDatagrid.vue';
    import bus from '../../../utils/bus.js';

    export default {
        name: 'task',

        components: {
            ElDatagrid
        },
        data() {
            return {

                types: [{
                        label: '紧急通知',
                        value: '紧急通知'
                    },
                    {
                        label: '放假通知',
                        value: '放假通知'
                    },
                    {
                        label: '开会通知',
                        value: '开会通知'
                    },
                    {
                        label: '人事事务',
                        value: '人事事务'
                    },
                    {
                        label: '时事事务',
                        value: '时事事务'
                    }
                ],

                search: {},
                url: './affairsList.do',
                datagridName: this._random('datagrid'),
                datagridOption: {
                    toolbar: [{
                            name: '新增',
                            type: 'primary',
                            icon: 'plus',
                            usable: true
                        },
                        {
                            name: '查看',
                            type: 'success',
                            icon: 'document',
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
                            title: '事务名称',
                            data: 'affairsName'
                        },
                        {
                            title: '事务类型',
                            data: 'affairsType'
                        },
                        {
                            title: '发布者',
                            data: 'empId'
                        },
                        {
                            title: '发布日期时间',
                            data: 'affairsDate'
                        },
                    ],
                    checkbox: true
                },

                addDialogVisible: false,
                addDialogData: {},
                rules: {
                    affairsName: {
                        required: true,
                        message: '请填写'
                    },
                    affairsContent: {
                        required: true,
                        message: '请填写'
                    },
                    affairType: {
                        required: true,
                        message: '请选择'
                    }
                },
                fileLength: 0,

                detailDialogVisible: false,
                detailDialogData: {}
            }
        },
        methods: {
            searchTable() {
                bus.$emit(this.datagridName);
            },
            reset() {
                this.search = {};
            },
            toolbarClick(params) {
                const [rows, type] = params;
                switch (type) {
                    case '新增':
                        this.dialogShow('addDialogVisible');
                        break;
                    case '查看':
                        if (rows.length > 1) {
                            this._alert('请选择一项', 'error')
                        } else {
                            const params = {
                                affairsId: rows[0].affairsId
                            };
                            const callback = (data) => {
                                this.detailDialogData = data[0];
                                this.dialogShow('detailDialogVisible');
                            };
                            this._ajax('get', './affairsView.do', callback, params);
                        }
                        break;
                    case '删除':
                        const params = rows.map((row) => {
                            return row.affairsId;
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
            addDialogSure() {
                const submitFn = () => {
                    if (this.fileLength > 0) {
                        this.$refs['upload'].submit();
                    } else {
                        this._ajax('post', './affairsWrite.do', this.addCallback, this.addDialogData);
                    }
                };
                this._form('addDialogForm', submitFn);
            },
            fileChange(file, list) {
                this.fileLength = list.length;
                this.addDialogData.testFile = file.raw;
            },
            beforeUpload() {
                this.loadingInstance = this._loading();
            },
            addCallback() {
                this._resetForm('addDialogForm');
                // this.addDialogData = {};
                // 关闭dialog
                this.dialogHide('addDialogVisible');
                // 提示用户
                this._alert('发布成功！', 'success', this.searchTable);
            },
            onSuccess(res) {
                this.loadingInstance.close();
                // 清空文件队列
                this.$refs['upload'].clearFiles();
                if (res.code == 0) {
                    this.addCallback();
                }
            },
            delete(ids) {
                const sureFn = () => {
                    const params = {
                        affairsId: ids
                    };
                    const callback = () => {
                        this._alert('删除成功！', 'success', this.searchTable);
                    };
                    this._ajax('delete', './affairsDelete.do', callback, params);
                };
                this._confirm('确定要删除吗？', sureFn);
            }
        }
    }
</script>

<style scoped>
    .row {
        text-align: center;
        margin: 10px 0;
    }

    .col {
        margin-right: 20px;
    }
</style>