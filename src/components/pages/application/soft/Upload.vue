<template>
    <section>
        <el-collapse v-model="activeName">
            <el-collapse-item title="软件信息" name="softInfo">
                <el-row :gutte="20">
                    <el-col :span="6">
                        <el-form :model="form" ref="form" :rules="formRules">
                            <el-form-item label="软件类型">
                                <el-select v-model="form.type" prop="type">
                                    <el-option v-for="item in groups" :key="item.label" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="注册表名称" prop="registerName">
                                <el-input v-model="form.registerName"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.text"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <el-form :model="form">
                            <el-form-item label="软件名称" prop="softName">
                                <el-input v-model='form.softName'></el-input>
                            </el-form-item>
                            <el-form-item label="软件版本" prop="version">
                                <el-input v-model="form.version"></el-input>
                            </el-form-item>
                            <el-form-item label="安装路径">
                                <el-input v-model="form.path"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="安装文件" name="installSoft">
                <el-row :gutter="20">
                    <el-col :span="6" :offset="6">
                        <el-form :model="form">
                            <el-form-item label="安装文件">
                                <el-input type="file" v-model="form.installfile"></el-input>
                            </el-form-item>
                            <el-form-item label="安装脚本">
                                <el-input type="file" v-model="form.installfooter"></el-input>
                            </el-form-item>
                            <el-form-item label="配置脚本">
                                <el-input type="file" v-model="form.footer"></el-input> 
                            </el-form-item>
                            <el-form-item label="安装说明"> 
                                <el-input type="file" v-model="form.installtext"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <div>
                            <a href="#">在线编辑脚本</a>
                        </div>
                         <div>
                            <a href="#">在线编辑脚本</a>
                        </div>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
        <div slot="footer">
            <el-button type="danger" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
    </section>
</template>
<script>
import bus from '../../../../utils/bus';
export default {
    data: function() {
        return {
            activeName:['softInfo','installSoft'],
            form:{
                type:'',
                softName:'',
                registerName:'',
                version:'',
                text:'',
                path:'',
                installfile:'',
                installfooter:'',
                footer:'',
                installtext:''
            },
            formRules:{
                type:{required:true},
                softName:{required:true},
                registerName:{required:true},
                version:{required:true}
            },
            groups:[
                {
                    label:'插件',
                    value:'插件'
                },
                 {
                    label:'浏览器',
                    value:'浏览器'
                },
                 {
                    label:'办公软件',
                    value:'办公软件'
                },
                 {
                    label:'聊天工具',
                    value:'聊天工具'
                },
                {
                    label:'客户端安装包',
                    value:'客户端安装包'
                },
                 {
                    label:'其它',
                    value:'其它'
                }
            ]

        }
    },
    methods:{
        handleCancel:function() {
            this.$routers.push('/application/soft');
        },
        handleConfirm:function() {
            const params = this.form;
            const callback = (Response)=>{
                if(Response.code == 0 ){
                    this._alert('新增上传软件成功','succsee', bus.$emit('softListReload'));
                }
            };
            this._ajax('get','/softuploadaction.do',callback,params);
        }
    }
};
</script>

