<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3">
                <el-tree :data="navData" :props="navProps" accordion @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :span="17">
                <div class="page">
                    <span style="margin-top: 30px;margin-bottom: 30px">查询</span>
                    <el-form :model="formData"  ref="form" label-width="110px" :label-position="right">
                        <el-row :gutter="20">
                            <el-col :span="8" >
                        <el-form-item label="机器名称：">
                            <el-input v-model="formData.resourcename"></el-input>
                        </el-form-item>
                        <el-form-item label="所属人：">
                            <el-input v-model="formData.terminatoruser"></el-input>
                        </el-form-item>
                            </el-col>

                            <el-col :span="8" >
                                <el-form-item label="营业厅名：">
                                    <el-input v-model="formData.hall"></el-input>
                                </el-form-item>
                        <el-form-item label="机器类型：">
                            <el-select v-model="formData.resourcetype">
                                <el-option v-for="item in resourcetypes" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                            </el-col>

                            <el-col :span="8" >
                        <el-form-item label="唯一标识符：">
                            <el-input v-model="formData.terminatorUniqueIdentifier"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="searchTable" style="margin-left: 20px">查询</el-button>
                        <el-button type="success" @click="examineAll">查看所有</el-button>
                            </el-col>

                        </el-row>
                    </el-form>
                </div>

        <div style="margin-top: 30px">
            <span >机器列表</span>
            <el-datagrid :url="url" :params="formData" :option="datagridOption" :reload-event="reloadName"
                         @toolbarClick="toolbarClickHandle"></el-datagrid>
        </div>


        <!--增加终端服务器-->
        <el-dialog title="新增服务器" :visible.sync="serverVisible" :close-on-click-modal="false">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="serverData" :rules="rules" ref="serverForm">
                            <el-form-item label="MAC地址:">
                                <el-input v-model="serverData.terminatorname"></el-input>
                            </el-form-item>
                            <el-form-item label="机器类型:">
                                <el-input v-model="serverData.terminatortype" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="所属片区：" prop="terminatorarea">
                                <el-cascader :options="optiondata" v-model="serverData.terminatorarea" :props="cascaderProps"
                                             change-on-select></el-cascader>
                            </el-form-item>
                            <el-form-item label="IP 地址：" prop="terminatoruser">
                                <el-input v-model="serverData.terminatoruser"></el-input>
                            </el-form-item>
                            <el-form-item label="登录工号:" prop="phonenum">
                                <el-input v-model="serverData.phonenum"></el-input>
                            </el-form-item>
                            <el-form-item label="U盘禁用：">
                                <el-radio-group v-model="serverData.terminatorusb">
                                    <el-radio label='0'>关闭</el-radio>
                                    <el-radio label='1'>开启</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="资源监控：">
                                <el-radio-group v-model="serverData.terminatormonitor">
                                    <el-radio label='0'>关闭</el-radio>
                                    <el-radio label='1'>开启</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('serverVisible')">取消</el-button>
                    <el-button @click="serverSure">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 增加Win终端 -->
        <el-dialog title="新增机器" :visible.sync="winVisible" :close-on-click-modal="false">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="winData" ref="winForm" :rules="rules">
                            <el-form-item label="机器类型:">
                                <el-input v-model="winData.terminatortype" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="认证账号:" prop="terminatoruser">
                                <el-input v-model="winData.terminatoruser"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅简称:" prop="bussinesshall">
                                <el-input v-model="winData.bussinesshall"></el-input>
                            </el-form-item>
                            <el-form-item label="所属片区：">
                                <el-cascader :options="optiondata" v-model="winData.terminatorarea" :props="cascaderProps"
                                             change-on-select></el-cascader>
                            </el-form-item>
                            <el-form-item label="网点地址：">
                                <el-input v-model="winData.address"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅全称:">
                                <el-input v-model="winData.fullName"></el-input>
                            </el-form-item>
                            <el-form-item label="U盘禁用：">
                                <el-radio-group v-model="winData.ban">
                                    <el-radio label='0'>关闭</el-radio>
                                    <el-radio label='1'>开启</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="资源监控：">
                                <el-radio-group v-model="winData.control">
                                    <el-radio label="0">关闭</el-radio>
                                    <el-radio label="1">开启</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('winVisible')">取消</el-button>
                    <el-button @click="winSure">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <!-- 终端修改 -->
        <el-dialog title="修改机器" :visible.sync="modifyVisible">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="modifyData" ref="modifyForm">
                            <el-form-item label="机器名称:">
                                <el-input v-model="modifyData.terminator_name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属人:">
                                <el-input v-model="modifyData.terminator_user"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅简称:">
                                <el-input v-model="modifyData.busyness_hall"></el-input>
                            </el-form-item>
                            <el-form-item label="网点地址：">
                                <el-input v-model="modifyData.hall_address"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式:">
                                <el-input v-model="modifyData.phone_num"></el-input>
                            </el-form-item>
                            <el-form-item label="机器类型：" readonly>
                                <el-input v-model="modifyData.terminator_type"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅全称:">
                                <el-input v-model="modifyData.terminator_partner"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="所属片区：" prop="terminator_area">-->
                                <!--<el-cascader v-model="modifyData.terminator_area" :options="optiondata" :props="cascaderProps"-->
                                             <!--change-on-select>-->
                                <!--</el-cascader>-->
                            <!--</el-form-item>-->
                            <el-form-item label="所属片区：" prop="terminatorarea">
                                <el-cascader :options="optiondata" v-model="modifyData.full_name_of_area" :props="cascaderProps"
                                             change-on-select></el-cascader>
                            </el-form-item>
                            <el-form-item label="U盘禁用：">
                                <el-radio-group v-model="modifyData.terminator_usb">
                                    <el-radio :label="0">关闭</el-radio>
                                    <el-radio :label="1">开启</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="资源监控：">
                                <el-radio-group v-model="modifyData.terminator_monitor">
                                    <el-radio :label="0">关闭</el-radio>
                                    <el-radio :label="1">开启</el-radio>
                                </el-radio-group>
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
            </el-col>
        </el-row>
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
                ban: '1',
                control: '0',
                resourcetypes: [{
                    value: "PC",
                    label: "营业终端"
                },
                    {
                        value: "瘦终端",
                        label: "win终端"
                    },
                    {
                        value: "PC SERVER",
                        label: "终端服务器"
                    }
                ],
                navData:[],
                formData:{
                    deptId: ''
                },
                navProps: {
                    value:'id',
                    label: 'text',
                    children: 'children'
                },
                optiondata:[],
                cascaderProps: {
                    value: "id",
                    label: "text",
                    children: "children"
                },

                rules: {
                    terminatorarea: [{
                        required: true
                    }],
                    terminatoruser: [{
                        required: true,
                        message: '请输入所属片区'
                    }],
                    phonenum: [{
                        required: true,
                        message: '请输入登录工号'
                    }],
                    terminatoruser: [{
                        required: true,
                        message: '请输入账号'
                    }],
                    bussinesshall: [{
                        required: true,
                        message: '请输入营业厅简称'
                    }]

                },
                // 查询参数，数组表单中的元素变量
                formData: {},
                serverData: {},
                winData: {},
                modifyData: {},
                // 数据表格
                url: './terminatorListQuery.do',
                reloadName: this._random('datagrid'),
                datagridOption: {
                    toolbar: [{
                        name: '增加终端服务器',
                        type: 'primary',
                        icon: 'circle-plus',
                        usable: true
                    },
                        {
                            name: '增加Win终端',
                            type: 'success',
                            icon: 'circle-plus',
                            usable: true
                        },
                        {
                            name: '修改机器',
                            type: 'warning',
                            icon: 'edit',
                            usable: false
                        },
                        {
                            name: '删除机器',
                            type: 'danger',
                            icon: 'close',
                            usable: false
                        },
                        // {
                        //     name: '密码重置',
                        //     type: 'warning',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // }
                        // {
                        //     name: '导入Win终端',
                        //     type: 'success',
                        //     icon: 'upload',
                        //     usable: true
                        // },
                        // {
                        //     name: '导入终端服务器',
                        //     type: 'success',
                        //     icon: 'upload',
                        //     usable: true
                        // },
                        // {
                        //     name: '导入终端营业厅',
                        //     type: 'success',
                        //     icon: 'upload',
                        //     usable: true
                        // },
                        // {
                        //     name: '导出注册用户',
                        //     type: 'warning',
                        //     icon: 'download',
                        //     usable: true
                        // },
                    ],
                    columns: [{
                        title: '机器标识',
                        data: 'terminator_name'
                        },
                        {
                            title: '所属人',
                            data: 'terminator_user'
                        },
                        {
                            title: '联系电话',
                            data: 'phone_num'
                        },
                        {
                            title: '在线',
                            data: 'isOnline',
                            formatterFn:(...rest)=>{
                                switch (rest[2]) {
                                    case 'yes':
                                        return "是";
                                        break;
                                    case 'no':
                                        return "否";
                                        break;
                                }
            }
                        },
                        {
                            title: '上次响应时间',
                            data: 'last_heart_beat'
                        },
                        {
                            title: '机器类型',
                            data: 'terminator_type'
                        },
                        {
                            title: '注册时间',
                            data: 'extend_word1'
                        },
                        {
                            title: '营业厅名',
                            data: 'busyness_hall'
                        },
                        {
                            title: '网点地址',
                            data: 'hall_address'
                        },
                        {
                            title: '唯一标识符',
                            data: 'terminator_unique_identifier'
                        }
                    ],
                    checkbox: true
                },

                // dialog
                serverVisible: false,
                winVisible: false,
                modifyVisible: false
            }
        },
        methods: {
            getTree() {
                const callback = (data) => {
                    this.navData = JSON.parse(data);
                };
                this._ajax('get', './outOrganizationTreeQuery.do', callback, {}, 'unblock');
            },
            handleNodeClick(data) {
                this.formData.deptId = data.id;
                this.searchTable();
            },
            searchTable: function () {
                bus.$emit(this.reloadName);
            },
            reloadAll(){
                this.getTree();
                this.searchTable();
            },
            examineAll: function () {
                this.formData.resourcename = '';
                 this.formData.terminatoruser ='';
                 this.formData.hall ='';
                 this.formData.resourcetype ='';
                 this.formData.terminatorUniqueIdentifier ='';
                this.searchTable();
            },
            optionData: function () {
                let callback = (data)=>
                {
                    this.optiondata = JSON.parse(data);
                }
                ;
                this._ajax('get', './outOrganizationTreeQuery.do', callback, {});
            },
            dialogHide: function (name) {
                this[name] = false;
            },
            dialogShow: function (name) {
                this[name] = true;
            },
            delete: function (params) {
                const sureFn = ()=>
                {
                    const callback = (response)=>
                    {
                            this._alert('删除成功！', 'success', this.reloadAll);
                    }
                    ;
                    this._ajax('delete', './terminatorDelete.do', callback, params);
                }
                ;
                this._confirm('确定要删除吗？', sureFn);
            },
            toolbarClickHandle: function (params) {
                const [rows, type] = params;
                switch (type) {
                    case '增加终端服务器': {
                        this.dialogShow('serverVisible');
                        this.serverData.terminatortype = '终端服务器';
                    }
                        break;
                    case '增加Win终端': {
                        this.dialogShow('winVisible');
                        this.winData.terminatortype='WIN终端';
                    }
                        break;
                    case '修改机器':
                        if (rows.length == 1) {
                            this.dialogShow('modifyVisible');
                            // 先深拷贝一份，避免修改引用数据类型出现问题
                            const data = JSON.parse(JSON.stringify(rows[0]));
                            this.modifyData = data;
                            this.modifyData.full_name_of_area = data.full_name_of_area.split(',');
                        } else {
                            this._alert('只能选择一行', 'error');
                        }
                        break;
                    case '删除机器': {
                        const arr = rows.map((row)=> {
                            return row.terminator_id;
                    });
                        const params = {
                            terminatorId: arr.join(',')
                        }
                        this.delete(params);
                    }
                        break;
                    // case '密码重置':
                    // {
                    //     if (rows.length == 1) {
                    //         const arr = rows.map((row) => {
                    //             return {
                    //                 terminatorId: row.terminator_id
                    //             }
                    //         });
                    //         const params = {
                    //             terminatoruser: arr[0].terminatorId,
                    //         };
                    //         this.resetPwd(params);
                    //     } else {
                    //         this._alert('只能选择一行', 'error');
                    //     }
                    // }
                    //     break;
                    default:
                        break;
                }
            },
            serverSure: function () {
                const submitFn = ()=>
                {
                    const params = this.serverData;
                    const callback = (response)=>
                    {
                            this.dialogHide('serverVisible');
                            this._alert('新增终端服务器成功！', 'success', this.reloadAll);
                    };
                    this._ajax('post', './terminatorAdd.do', callback, params);
                }
                ;
                this._form('serverForm', submitFn);
            },
            winSure: function () {
                const submitFn = ()=>
                {
                    const params = this.winData;
                    const callback = (response)=>
                    {
                            this.dialogHide('winVisible');
                            this._alert('增加Win终端成功！', 'success', this.reloadAll);
                    }
                    ;
                    this._ajax('post', './terminatorWinAdd.do', callback, params);
                }
                ;
                this._form('winForm', submitFn);
            },
            modifySure: function () {
                const submitFn = ()=>
                {
                    const params = this.modifyData;
                    const callback = (response)=>
                    {
                        this.dialogHide('modifyVisible');
                        this._alert('终端修改成功！', 'success', this.reloadAll);
                    }
                    ;
                    this._ajax('put', './terminatorModify.do', callback, params);
                }
                ;
                this._form('modifyForm', submitFn);
            },
        },
        created(){
            this.optionData();
            this.getTree();
        }

    }
</script>
