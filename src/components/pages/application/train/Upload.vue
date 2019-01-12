<template>
    <div>
        <div class="title">
            <span>资料信息</span>
        </div>
        <div class="content">
            <el-form :model="form" ref="form" :rules="rule">
                <el-form-item label="资料名称：" prop="infoName">
                    <el-input v-model="form.infoName"></el-input>
                </el-form-item>
                <el-form-item label="资料类型:" prop="infoType">
                    <el-select v-model="form.infoType">
                        <el-option v-for="(item,index) in options" :key="index" :label="item.title" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级分类:">
                    <el-select v-model="form.typeOne">
                        <el-option v-for="(item,index) in classOne" :key="index" :label="item.title" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类:">
                    <el-select v-model="form.typeTwo">
                        <el-option v-for="(item,index) in classTwo" :key="index" :label="item.title" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类:">
                    <el-select v-model="form.typeThree">
                        <el-option v-for="(item,index) in classThree" :key="index" :label="item.title" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管辖渠道:" prop="areas">
                    <el-cascader :options="optiondata" :props="props" v-model="form.areas" change-on-select></el-cascader>
                </el-form-item>
                <el-form-item label="资料文件:" prop="trainFile">
                    <el-upload  ref="uploadFile" action="./TrainUpload.do" name="trainFile" :on-success="success" :auto-upload="false" :data="form"><el-button size="small" type="primary">选择文件</el-button></el-upload>
                </el-form-item>
                <el-form-item label="是否必阅;" prop="infoFlag">
                    <el-radio v-model="form.infoFlag" label="1">是</el-radio>
                    <el-radio v-model="form.infoFlag" label="0">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer">
               <el-button type="warning" @click="cancel">取消</el-button>
                <el-button type="primary" @click="upload">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '@/utils/bus.js';
    export default {
        data: function () {
            return {
                options: [
                    {
                        title: '操作手册',
                        value: '操作手册'
                    },
                    {
                        title: '软件使用',
                        value: '软件使用'
                    },
                    {
                        title: '操作录像',
                        value: '操作录像'
                    },
                    {
                        title: '其它',
                        value: '其它'
                    }
                ],
                classOne:[
                    {
                        title:'业管中心',
                        value:'业管中心'
                    },
                    {
                        title:'IT支撑',
                        value:'IT支撑',
                    },
                    {
                        title:'手册',
                        value:'手册'
                    },
                ],
                classTwo:[
                    {
                        title:'系统操作手册',
                        value:'系统操作手册'
                    },
                    {
                        title:'业务操作手册',
                        value:'业务操作手册'
                    },
                    {
                        title:'其他',
                        value:'其他'
                    }

                ],
                classThree:[
                    {
                        title:'PAD问题',
                        value:'PAD问题'
                    },
                    {
                        title:'拍照问题',
                        value:'拍照问题'
                    },
                    {
                        title:'小灵通',
                        value:'小灵通'
                    }
                ],

                form: {
                    infoName: '',
                    infoType: '',
                    typeOne: '',
                    typeTwo: '',
                    typeThree: '',
                    areas: [],
                    trainFile: '',
                    infoFlag: ''
                },
                rule: {
                    infoName:[ {required: true}],
                    infoType: [{required: true}],
                    areas: [{required: true}],
                    trainFile: [{required: true}],
                    infoFlag: [{required: true}]
                },
                optiondata: [],
                props: {
                    value: "id",
                    label: "text",
                    children: "children"
                },

            }
        },
        methods: {
            cancel(){
                this.$router.back();
            },
            upload(){
                this.form.areas.join(',');
                this.$refs.uploadFile.submit();
            },
            success(){
                this.$message('上传文件成功');
                this.$router.go(-1);
                bus.$emit('softListReload');
            },
            request:function(){
                let callback = (data)=>{
                    this.optiondata = JSON.parse(data);
                    console.log(this.optiondata);
                };
                this._ajax('get','./outOrganizationTreeQuery.do',callback,{});
            }
        },
       created(){
            this.request();
       }

    }
</script>

<style scoped>

</style>
