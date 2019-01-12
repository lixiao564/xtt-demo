<template>
    <div>
        <div>
            <span style="margin-top: 50px;margin-bottom: 50px">查询</span>
            <el-form :model="formData" ref="form" inline>
                <el-form-item label="区域筛选：" >
                    <el-cascader :options="optiondata" v-model="formData.terminatorarea" :props="props"
                                 filterable></el-cascader>
                </el-form-item>
                <el-form-item label="代理商:">
                    <el-input v-model="formData.terminatoruser"></el-input>
                </el-form-item>
                <el-form-item label="电话:">
                    <el-input v-model="formData.queryPhone"></el-input>
                </el-form-item>
                <el-form-item label="营业厅:">
                    <el-input v-model="formData.queryHall"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="success" @click="examineAll">查看所有</el-button>


            <div style="margin-top: 50px">
                <span>营业厅列表</span>
                <el-datagrid :url="url" :params="formData" :option="datagridOption" :reload-event="reloadName"
                             @toolbarClick="toolbarClickHandle"></el-datagrid>
            </div>

        </div>

        <!-- 修改 -->
        <el-dialog title="修改营业厅" :visible.sync="modifyVisible" :close-on-click-modal="false">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="modifyData" ref="modifyForm" :rules="rules">
                            <el-form-item label="营业厅名:">
                                <el-input v-model="modifyData.busyness_hall"></el-input>
                            </el-form-item>
                            <el-form-item label="代理商姓名:" >
                                <el-input v-model="modifyData.terminator_user" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式:">
                                <el-input v-model="modifyData.phone_num"  readonly></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅地址：">
                                <el-input v-model="modifyData.hall_address"></el-input>
                            </el-form-item>
                            <el-form-item label="合作伙伴:">
                                <el-input v-model="modifyData.terminator_partner"></el-input>
                            </el-form-item>
                            <el-form-item label="所属片区：">
                                <el-cascader :options="optiondata" v-model="modifyData.terminatorarea" :props="props"
                                             change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="modifyData.extend_word2"></el-input>
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
        <el-dialog title="新增营业厅" :visible.sync="addHallVisible">
            <div>
                <el-row>
                    <el-col :span="8">
                        <el-form :model="addHallData" ref="addHallForm" :rules="rules">
                            <el-form-item label="代理商姓名:" prop="terminatoruser">
                                <el-input v-model="addHallData.terminatoruser" ></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式:" prop="phonenum">
                                <el-input v-model="addHallData.phonenum"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅简称：" prop="bussinesshall">
                                <el-input v-model="addHallData.bussinesshall" placeholder="最多支持9个汉字!!"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅地址：">
                                <el-input v-model="addHallData.hallAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="营业厅全称：" prop="partner">
                                <el-input v-model="addHallData.partner"></el-input>
                            </el-form-item>
                            <el-form-item label="所属区县：" prop="terminatorarea">
                                <el-cascader :options="optiondata" v-model="addHallData.terminatorarea" :props="props"
                                             change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="addHallData.extendWord2"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <!-- 下面的按钮 -->
                <div slot="footer">
                    <el-button @click="dialogHide('addHallVisible')">取消</el-button>
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
                //级联数据
                props:{
                    value: "id",
                    label: "text",
                    children: "children"
                },
                optiondata:[],
                // 查询列表
                formData: {},
                modifyData: {},
                addHallData: {},
                //验证
                rules:{

                    terminatoruser:[{
                        required:true
                    }],
                    bussinesshall:[{
                        required:true
                    }],
                    partner:[{
                        required:true
                    }],
                    terminatorarea:[{
                        required:true
                    }]
                },
                // 数据表格
                url: './hallList.do',
                reloadName: this._random('datagrid'),
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
                        // {
                        //     name: '密码重置',
                        //     type: 'warning',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // }
                        // {
                        //     name: '导入营业厅',
                        //     type: 'success',
                        //     icon: 'circle-plus',
                        //     usable: true
                        // },
                        // {
                        //     name: '导出营业厅',
                        //     type: 'info',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // },
                        // {
                        //     name: '批量修改营业厅简称',
                        //     type: 'danger',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // },
                        // {
                        //     name: '导出统计信息',
                        //     type: 'success',
                        //     icon: 'circle-plus',
                        //     usable: false
                        // }
                    ],
                    columns: [{
                        title: '营业厅简称',
                        data: 'busyness_hall'
                    },
                        {
                            title: '营业厅全称',
                            data: 'terminator_partner'
                        },
                        {
                            title: '拥有机器数',
                            data: 'terminatorCount'
                        },
                        {
                            title: '在线用户数',
                            data: 'terminatorOnlineCount'
                        },
                        {
                            title: '所属区县',
                            data: 'textOfArea'
                        },
                        {
                            title: '代理商姓名',
                            data: 'terminator_user'
                        },
                        {
                            title: '联系方式',
                            data: 'phone_num'
                        },
                        {
                            title: '加入时间',
                            data: 'extend_word1'
                        },
                        {
                            title: '营业厅地址',
                            data: 'hall_address'
                        },
                        {
                            title: '备注',
                            data: 'extend_word2'
                        }
                    ],
                    checkbox: true
                },

                // dialog
                modifyVisible: false,
                addHallVisible: false
            }
        },
        methods: {
            optionData: function () {
                let callback = (data)=>
                {
                    this.optiondata = JSON.parse(data);
                    console.log(this.optiondata);
                };
                this._ajax('get', './outOrganizationTreeQuery.do', callback, {});
            },
            searchTable: function () {
                bus.$emit(this.reloadName);
            },
            search(){
                console.log(this.formData.terminatorarea);
                this.formData.terminatorarea = this.formData.terminatorarea.join(',');
                this.searchTable();
            },
            examineAll: function () {
                for (const key of Object.keys(this.formData)) {
                    this.formData[key] = '';
                }
                this.searchTable();
            },
            dialogHide: function (name) {
                this[name] = false;
            },
            dialogShow: function (name) {
                this[name] = true;
            },
            delete: function (params) {
                const sureFn = () =>{
                    const callback = (response) =>{
                        this._alert('删除成功！', 'success', this.searchTable());
                    }
                    this._ajax('delete', './hallDelete.do', callback, params);
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
                            return row.terminator_id
                        }).join(',');
                        let arr2 = rows.map((row) => {
                            return row.busyness_hall
                        }).join(',');

                        const params = {
                            terminatorId: arr,
                            terminatorHall: arr2
                        };
                        console.log(params);
                        this.delete(params);
                    }
                        break;
                    case '增加':
                    {
                        this.dialogShow('addHallVisible');
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
            // resetPwd: function (params) {
            //     const sureFn = () => {
            //         const callback = (response) => {
            //             this._alert('初始化用户密码成功！', 'success', this.searchTable());
            //         };
            //         this._ajax('put', './userPasswordReset.do', callback, params);
            //     };
            //     this._confirm('确定要初始化用户密码吗？', sureFn);
            // },
            modifySure: function () {
                const submitFn = () => {
                    const params = this.modifyData;
                    const callback = (response) => {
                        this.dialogHide('modifyVisible');
                        this._alert('终端修改成功！', 'success', this.searchTable());
                    };
                    this._ajax('put', './hallModify.do', callback, params);
                };
                this._form('modifyForm', submitFn);
            },
            addSure: function () {
                const submitFn = () => {
                    const params = this.addHallData;
                    const callback = (response) => {
                        this.dialogHide('addHallVisible');
                        this._alert('增加营业厅成功！', 'success', this.searchTable());
                    };
                    this._ajax('post', './hallAdd.do', callback, params);
                };
                this._form('addHallForm', submitFn);
            }
        },
        created(){
            this.optionData();
        }
    }
</script>
