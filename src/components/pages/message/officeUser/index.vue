<template>
    <div>
        <div>
            <el-collapse v-model="activeName">
                <el-collapse-item title="查询" name="search">
                    <el-form :model="searchData" ref="form" inline>
                        <el-form-item label="所属部门:">
                            <el-cascader v-model="array" :props="props" :options="optiondata"></el-cascader>
                        </el-form-item>
                        <el-form-item label="用户姓名:">
                            <el-input v-model="searchData.terminatoruser"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:">
                            <el-input v-model="searchData.terminatorphone"></el-input>
                        </el-form-item>
                    </el-form>


                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="success" @click="examineAll">查看所有</el-button>

                </el-collapse-item>
                <el-collapse-item title="办公用户列表" name="data">
                    <el-datagrid :url="url" :params="searchData" :option="datagridOption" :reload-event="reloadName"
                                 @toolbarClick="toolbarClickHandle"></el-datagrid>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 办公用户修改 -->
        <el-dialog title="办公用户修改" :visible.sync="modifyVisible">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="modifyData" ref="modifyForm" :rules="rules">
                            <el-form-item label="用户姓名:" prop="terminator_user">
                                <el-input v-model="modifyData.terminator_user"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码:" prop="phone_num">
                                <el-input v-model="modifyData.phone_num"></el-input>
                            </el-form-item>
                            <el-form-item label="办公电话:">
                                <el-input v-model="modifyData.terminator_partner"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:">
                                <el-input v-model="modifyData.hall_address"></el-input>
                            </el-form-item>
                            <el-form-item label="机器MAC:">
                                <el-input v-model="modifyData.terminator_name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门：" prop="department">
                                <el-cascader v-model="modifyData.department" :props="props" :options="optiondata"></el-cascader>
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

        <!--新增办公用户-->
        <el-dialog title="新增办公用户" :visible.sync="addUserVisible">
            <div>
                <el-row :gutter='10'>
                    <el-col :span="8">
                        <el-form :model="addUserData" ref="addUserForm"  :rules="rules">
                            <el-form-item label="用户姓名:" prop="userName">
                                <el-input v-model="addUserData.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码:" prop="phone">
                                <el-input v-model="addUserData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="办公电话:">
                                <el-input v-model="addUserData.officePhone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:">
                                <el-input v-model="addUserData.emailBox"></el-input>
                            </el-form-item>
                            <el-form-item label="机器MAC:">
                                <el-input v-model="addUserData.macAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门：" prop="department">
                                <el-cascader v-model="addUserData.department" :props="props" :options="optiondata"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('addUserVisible')">取消</el-button>
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
                // 下拉框数据
                departments: [{
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
                //验证
                rules:{
                    terminator_user:[{
                        required : true
                    }],
                    phone_num:[{
                        required : true
                    }],
                    department:[{
                        required : true
                    }],
                    userName:[{
                        required : true
                    }],
                    phone :[{
                        required : true
                    }]
                },

                //选择数据
                searchData:{
                    userDepartment:[],
                    terminatoruser:'',
                    terminatorphone:''
                },
                //级联选择
                props:{
                    value:'id',
                    label:'text',
                    children:'children'
                },
                optiondata:[],
                array:[],
                // 表单元素
                formData: {},
                modifyData:{
                    userName:'',
                    phone:'',
                    officePhone:'',
                    emailBox:'',
                    macAddress:'',
                    department:''
                },
                addUserData:{
                    userName:'',
                    phone:'',
                    officePhone:'',
                    emailBox:'',
                    macAddress:'',
                    department:''
                },
                // 数据表格
                url: './officeUserList.do',
                reloadName: 'officeUserReload',
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
                        },
                        // {
                        //     name: '导入办公用户',
                        //     type: 'success',
                        //     icon: 'circle-plus',
                        //     usable: true
                        // },
                        // {
                        //     name: '导出办公用户',
                        //     type: 'info',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // }
                    ],
                    columns: [{
                        title: '用户姓名',
                        data: 'terminator_user'
                    },
                        {
                            title: '手机号码',
                            data: 'phone_num'
                        },
                        {
                            title: '办公号码',
                            data: 'terminator_partner'
                        },
                        {
                            title: '部门',
                            data: 'dept_name'
                        },
                        {
                            title: '机器MAC',
                            data: 'terminator_name'
                        },
                        {
                            title: '邮箱',
                            data: 'hall_address'
                        }
                    ],
                    checkbox: true
                },

                // dialog
                modifyVisible: false,
                addUserVisible:false,

            }
        },
        methods: {
            searchTable: function () {
                bus.$emit(this.reloadName);
            },
            search:function(){
                this.searchData.userDepartment =  this.array.join(',');
                this.searchTable();
            },
            examineAll: function () {
                this.searchData.userDepartment = '';
                this.searchData.terminatorphone ='';
                this.searchData.terminatoruser ='';
                this.searchTable();
            },
            dialogHide: function (name) {
                this[name] = false;
            },
            dialogShow: function (name) {
                this[name] = true;
            },
            resetPwd: function (params) {
                const sureFn = () =>
                {
                    const callback = (response) =>
                    {
                        this._alert('初始化用户密码成功！', 'success', this.searchTable());
                    };
                    this._ajax('put', './officeUserPasswdReset.do', callback, params);
                }
                ;
                this._confirm('确定要初始化用户密码吗？', sureFn);
            },
            delete: function (params) {
                const sureFn = () =>
                {
                    const callback = (response) =>
                    {
                        this._alert('删除成功！', 'success', this.searchTable());
                    };
                    this._ajax('delete', './officeUserDeleteAction.do', callback, params);
                }
                ;
                this._confirm('确定要删除吗？', sureFn);
            },
            toolbarClickHandle: function (params) {
                const [rows, type] = params;
                switch (type) {
                    case '修改':
                        if (rows.length == 1) {
                            this.dialogShow('modifyVisible');
                            // 先深拷贝一份，避免修改引用数据类型出现问题
                            const data = JSON.parse(JSON.stringify(rows[0]));

                            this.modifyData = data;
                            this.modifyData.department = ['0','14'];

                        } else {
                            this._alert('只能选择一行', 'error');
                        }
                        break;
                    case '删除': {

                        const arr = rows.map((row) => {
                            return row.terminator_id;
                    });
                        const params = {
                            terminatorId: arr.join(',')
                        };
                        this.delete(params);
                    }
                        break;
                    case '增加': {
                        this.dialogShow('addUserVisible');
                    }
                        break;
                    case '密码重置':{
                        if (rows.length == 1) {
                            const arr = rows.map((row) => {
                                return row.terminator_id;
                        });
                            const params = {
                                terminatorId: arr.join(',')
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
                const submitFn = () =>
                {
                    const params = this.modifyData;
                    const callback = (response) =>
                    {
                        this.dialogHide('modifyVisible');
                        this._alert('终端修改成功！', 'success', this.searchTable());
                    };
                    this._ajax('put', './officeUserModify.do', callback, params);
                }
                ;
                this._form('modifyForm', submitFn);
            },
            addSure: function () {
                const submitFn = () =>                {
                    const params = this.addUserData;
                    const callback = (response) =>
                    {
                        this.dialogHide('addUserVisible');
                        this._alert('增加代理商成功！', 'success', this.searchTable());
                    };
                    this._ajax('post', './officeUserAdd.do', callback, params);
                }
                this._form('addUserForm', submitFn);
            },
            requestData:function(){
                let callback = (data)=>{
                    this.optiondata = JSON.parse(data);
                };
                this._ajax('get','./officeOrganizationAddTree.do',callback,{});
            }

        },
        created(){
            this.requestData();
        }
    }

</script>
