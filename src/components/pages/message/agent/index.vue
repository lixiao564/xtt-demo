<template>
    <div>
        <div>
            <el-collapse v-model="activeName">
                <el-collapse-item title="查询" name="search">
                    <el-form :model="searchData" ref="form" inline>
                        <el-form-item label="区域筛选:">
                            <el-cascader placeholder="可搜索也可以查询" filterable v-model="array" :options="requestdata"
                                         :props="props"></el-cascader>
                        </el-form-item>
                        <el-form-item label="代理商:">
                            <el-input v-model="searchData.terminatorUser"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <el-input v-model="searchData.terminatorPhone"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="success" @click="examineAll">查看所有</el-button>

                </el-collapse-item>
                <el-collapse-item title="代理商列表" name="data">
                    <el-datagrid :url="url" :params="searchData" :option="datagridOption" :reload-event="reloadName"
                                 @toolbarClick="toolbarClickHandle"></el-datagrid>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 修改-->
        <el-dialog title="修改代理商" :visible.sync="modifyVisible">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="modifyData" ref="modifyForm" :rules="rules">
                            <el-form-item label="代理商姓名:">
                                <el-input v-model="modifyData.user_name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式:" prop="user_phone">
                                <el-input v-model="modifyData.user_phone"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyData.extend_word1"></el-input>
                            </el-form-item>
                            <el-form-item label="所属片区：">
                                <el-cascader placeholder="可搜索也可以查询" filterable v-model="modifyData.area" :options="requestdata"
                                             :props="props"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('modifyVisible')">取消</el-button>
                    <el-button @click="modifySure">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 增加 -->
        <el-dialog title="新增营业厅" :visible.sync="addAgentVisible">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="addAgentData" ref="addAgentForm" :rules="rules">
                            <el-form-item label="代理商姓名:" prop="agentName">
                                <el-input v-model="addAgentData.agentName"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式:" prop="phone">
                                <el-input v-model="addAgentData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="addAgentData.remark"></el-input>
                            </el-form-item>
                            <el-form-item label="所属区县：" prop="area">
                                <el-cascader placeholder="可搜索也可以查询" filterable v-model="addAgentData.area" :options="requestdata"
                                             :props="props"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('addAgentVisible')">取消</el-button>
                    <el-button @click="addSure">确定</el-button>
                </div>
            </div>
        </el-dialog>

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
                array: [],
                // 下拉框数据
                selects: [{
                    lable: '成都电信分公司',
                    value: '成都电信分公司'
                },
                    {
                        lable: '简阳电信分公司',
                        value: '简阳电信分公司'
                    },
                    {
                        lable: '高新电信分公司',
                        value: '高新电信分公司'
                    },
                    {
                        lable: '金牛电信分公司',
                        value: '金牛电信分公司'
                    }
                ],
                areas: [{
                    lable: '成都电信分公司',
                    value: '成都电信分公司'
                },
                    {
                        lable: '简阳电信分公司',
                        value: '简阳电信分公司'
                    },
                    {
                        lable: '高新电信分公司',
                        value: '高新电信分公司'
                    },
                    {
                        lable: '金牛电信分公司',
                        value: '金牛电信分公司'
                    }
                ],
                rules: {
                    user_phone: [{
                        required: true
                    }],
                    agentName: [{
                        required: true
                    }],
                    phone: [{
                        required: true
                    }],
                    area: [{
                        required: true
                    }]
                },
                //查询字段
                searchData: {
                    terminatorArea: [],
                    terminatorUser: '',
                    terminatorPhone: ''
                },
                //级联选择器数据
                requestdata: [],
                props: {
                    value: 'id',
                    label: 'text',
                    children: 'children'
                },
                // 表单元素
                formData: {},
                modifyData: {},
                addAgentData: {
                    agentName: '',
                    phone: '',
                    remark: '',
                    area: '',
                    opType: 'insert'
                },
                // 数据表格
                url: './terminatorUserList.do',
                reloadName: 'agentReload',
                datagridOption: {
                    toolbar: [{
                        name: '修改',
                        type: 'warning',
                        icon: 'edit',
                        usable: false
                    },
                        {
                            name: '删除',
                            type: 'danger',
                            icon: 'close',
                            usable: false
                        },
                        {
                            name: '增加',
                            type: 'success',
                            icon: 'circle-plus',
                            usable: true
                        },
                        {
                            name: '密码重置',
                            type: 'warning',
                            icon: 'circle-plus',
                            usable: false
                        }
                    ],
                    columns: [{
                        title: '代理商编号',
                        data: 'user_id'
                    },
                        {
                            title: '代理商姓名',
                            data: 'user_name'
                        },
                        {
                            title: '联系方式',
                            data: 'user_phone'
                        },
                        {
                            title: '注册时间',
                            data: 'user_time'
                        },
                        {
                            title: '所属区县',
                            data: 'dept_name'
                        },
                        {
                            title: '备注',
                            data: 'extend_word1'
                        }
                    ],
                    checkbox: true
                },

                // dialog
                modifyVisible: false,
                addAgentVisible: false
            }
        },
        methods: {
            searchTable: function () {
                bus.$emit(this.reloadName);
            },
            search: function () {
                this.searchData.terminatorArea = this.array.join(',');
                this.searchTable();
            },
            examineAll: function () {
                this.searchData.terminatorArea = '';
                this.searchData.terminatorPhone = '';
                this.searchData.terminatorUser = '';
                this.searchTable();
            },
            dialogHide: function (name) {
                this[name] = false;
            },
            dialogShow: function (name) {
                this[name] = true;
            },
            resetPwd: function (params) {
                const sureFn = () => {
                    const callback = (response) => {
                        this._alert('初始化用户密码成功！', 'success', this.searchTable());
                    };
                    this._ajax('put', './userPasswordReset.do', callback, params);
                };
                this._confirm('确定要初始化用户密码吗？', sureFn);
            },
            delete: function (params) {
                const sureFn = () => {
                    const callback = (response) => {
                        this._alert('删除成功！', 'success', this.searchTable());
                    };
                    this._ajax('delete', './terminatorUserDelete.do', callback, params);
                };
                this._confirm('确定要删除吗？', sureFn);
            },
            toolbarClickHandle: function (params) {
                const [rows, type] = params;
                switch (type) {
                    case '修改':
                        if (rows.length == 1) {
                            this.dialogShow('modifyVisible');

                            const data = JSON.parse(JSON.stringify(rows[0]));
                            this.modifyData = data;
                        } else {
                            this._alert('只能选择一行', 'error');
                        }
                        break;
                    case '删除':
                    {
                        const arr = rows.map((row) => {
                            return {
                                userName: row.user_name,
                                userPhone: row.user_phone,
                                userId: row.user_id
                            }
                        });
                        console.log("ARr:" + arr + arr[0].userPhone);
                        const params = {
                            userId: arr[0].userId,
                            userName: arr[0].userName,
                            userPhone: arr[0].userPhone
                        };
                        this.delete(params);
                    }
                        break;
                    case '增加':
                    {
                        this.dialogShow('addAgentVisible');
                    }
                        break;
                    case '密码重置':
                    {
                        if (rows.length == 1) {
                            const arr = rows.map((row) => {
                                return {
                                    userId: row.user_id
                                }
                            });
                            const params = {
                                terminatorUser: arr[0].userId,
                            };
                            this.resetPwd(params);
                        } else {
                            this._alert('只能选择一行', 'error');
                        }
                    }
                        break;
                    default:
                        break;
                }
            },
            modifySure: function () {
                const submitFn = () => {
                    const params = {
                        agentName: this.modifyData.user_name,
                        phone: this.modifyData.user_phone,
                        remark: this.modifyData.extend_word1,
                        area: this.modifyData.area,
                        userId: this.modifyData.user_id,
                        opType: 'update'
                    };
                    console.log(params);
                    const callback = (response) => {

                        this.dialogHide('modifyVisible');

                        this._alert('终端修改成功！', 'success', this.searchTable());
                    };
                    this._ajax('post', './terminatorUserModify.do', callback, params);
                };
                this._form('modifyForm', submitFn);
            },
            addSure: function () {
                const submitFn = () => {
                    const params = this.addAgentData;
                    const callback = (response) => {

                        this.dialogHide('addAgentVisible');

                        this._alert('增加代理商成功！', 'success', this.searchTable());

                    };
                    this._ajax('post', './terminatorUserAdd.do', callback, params);
                };
                this._form('addAgentForm', submitFn);
            },
            requestData: function () {
                let callback = (data) => {
                    this.requestdata = JSON.parse(data);
                    console.log(this.requestdata);
                };
                this._ajax('get', './outOrganizationTreeQuery.do', callback, {});
            },

        },
        created() {
            this.requestData();
        }
    }
</script>
