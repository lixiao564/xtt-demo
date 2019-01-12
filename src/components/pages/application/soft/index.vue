<template>
    <section>
        <el-collapse v-model="activePart">
            <el-collapse-item title="查询软件" name="search">
                <el-form :model="form" ref="form" inline>
                    <el-form-item label="软件名称:">
                        <el-input v-model="form.softName"></el-input>
                    </el-form-item>
                    <el-form-item label="软件类型:">
                        <el-select v-model="form.softType">
                            <el-option v-for="item in groups" :key="item.value" :lable="item.lable" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                        <el-button type="success" size="small" @click="searchAll">查询所有</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="软件列表" name="list">
                <el-datagrid :url="url" :params="form" :option="datagridOptions" :reload-event="loadName" @toolbarClick ="toolbarClickHandle"></el-datagrid>
            </el-collapse-item>
        </el-collapse>
        <!-- 简易上传软件 -->
       <el-dialog title="简易软件上传" :visible.sync="uploadSee">
         <el-collapse v-model="activePart2">
          <el-form :model="uploadForm" ref="uploadForm" :rules="uploadFormRules">
            <el-collapse-item title="软件信息" name="Info">
              <el-form-item label="软件名称" prop="name">
                <el-input v-model="uploadForm.softName"></el-input>
              </el-form-item>
              <el-form-item label="软件类型" prop="type">
                <el-select v-model="uploadForm.softType">
                  <el-option v-for="item in groups" :key="item.lable" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="安装文件" name="File">
              <el-form-item label="安装文件" prop="file">
                <el-upload ref="upload" action="./upload/file.do" name="file"  :on-success="success"
                 :auto-upload="false"  :before-upload="beforeUpload"><el-button size="small" type="primary">上传</el-button> </el-upload>
              </el-form-item>
            </el-collapse-item>
          </el-form>
         </el-collapse>
         <span slot="footer">
          <el-button type="danger" @click="uploadSee=false">取消</el-button>
          <el-button type="success" @click="upload">确定</el-button>
         </span>
       </el-dialog>

        <!-- 软件更新 -->
        <el-dialog title="软件修改" :visible.sync="softReset">
          <el-form :model="resetForm" ref="resetForm">
            <el-form-item label="软件名称">
              <el-input v-model="resetForm.softName"></el-input>
            </el-form-item>
            <el-form-item label="软件版本">
              <el-input v-model="resetForm.softVersion"></el-input>
            </el-form-item>
            <el-form-item label="注册表名称">
              <el-input v-model="resetForm.registryName"></el-input>
            </el-form-item>
            <el-form-item label="软件类型">
                 <el-select v-model="resetForm.softType">
                   <el-option v-for="item of groups" :key="item.label" :label="item.label" :value="item.value"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="resetForm.softInfo"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button type="danger" @click='softReset = false'>取消</el-button>
            <el-button type='primary' @click="Renew">确定</el-button>
          </div>
        </el-dialog>

        <!-- 软件分发 -->
        <el-dialog title="软件分发" :visible.sync="softAssign">
          <el-collapse v-model="activeArea">
            <el-collapse-item title="软件列表" name="list">
              <span>{{assignForm.softName}}</span>
            </el-collapse-item>
            <el-collapse-item title="分发对象" name="object">
                <el-checkbox-group v-model="assignForm.areas">
                    <el-checkbox label="中断服务器"></el-checkbox>
                    <el-checkbox label="普通PC端"></el-checkbox>
                    <el-checkbox label="win7系统"></el-checkbox>
                </el-checkbox-group>
            </el-collapse-item>
            <el-collapse-item title="分发渠道/部门" name="section">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="营业用户"></el-checkbox>
                    <el-cascader change-on-select :options="jjj   " :props="props" v-model="assignForm.privateVal"></el-cascader>
                <el-checkbox label="办公用户"> </el-checkbox>
                    <el-cascader change-on-select :options="dataTree" :props="props" v-model="assignForm.publickVal"></el-cascader>
              </el-checkbox-group>
            </el-collapse-item>
            <el-collapse-item title="安装时间" name="time">
                <el-radio-group v-model="assignForm.installWay">
                    <el-radio :label="0">立即安装</el-radio>
                    <el-radio :label="1">稍后安装</el-radio>
                </el-radio-group>
             <el-date-picker v-model="time2" type="datetime" placeholder="请选择安装时间" @change="pickTime"></el-date-picker>

            </el-collapse-item>
          </el-collapse>
          <div slot="footer">
            <el-button type="danger" @click='softReset = false'>取消</el-button>
            <el-button type='primary' @click="assign">确定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import ElDatagrid from "../../../ElDatagrid";
import DialogForm from "../../../DialogForm";
import bus from '../../../../utils/bus';
export default {
  data: function() {
    return {
      activePart: ["search", "list"],
      form: {
        softName: "",
        softType: ""
      },
      groups: [
        {
          lable: "所有",
          value: "所有"
        },
        {
          lable: "插件",
          value: "插件"
        },
        {
          lable: "浏览器",
          value: "浏览器"
        },
        {
          lable: "办公软件",
          value: "办公软件"
        },
        {
          lable: "聊天工具",
          value: "聊天工具"
        },
        {
          lable: "其他",
          value: "其他"
        }
      ],
      //软件列表
      url: "./softListQuery.do",
      loadName: "softListReload",
      datagridOptions: {
        toolbar: [
          {
            name: "简易上传软件",
            type: "primary",
            icon: "upload",
            usable: true
          },
          {
            name: "新增上传软件",
            type: "success",
            icon: "upload",
            usable: true
          },
          {
            name: "软件信息更新",
            type: "warning",
            icon: "renew",
            usable: false
          },
          {
            name: "删除",
            type: "danger",
            icon: "delete",
            usable: false
          },
          {
            name: "软件分发",
            type: "warning",
            icon: "upload",
            usable: false
          },
          {
            name: "软件发布任务管理",
            type: "info",
            icon: "info",
            usable: true
          }
        ],
        columns: [
          {
            title: "软件名称",
            data: "softName"
          },
          {
            title: "软件版本",
            data: "softVersion"
          },
          {
            title: "软件类型",
            data: "softType"
          },
          {
            title: "下载次数",
            data: "softDowntimes"
          },
          {
            title: "软件大小",
            data: "softSize"
          },
          {
            title: "上传者",
            data: "empId"
          },
          {
            title: "上传时间",
            data: "softDate"
          }
        ],
        checkbox: true
      },
      //简易软件上传
      uploadSee:false,
      activePart2:["Info","File"],
      uploadForm:{
          softType:'',
          softName:'',
          softFile:''
      },
      uploadFormRules:{
          softType:{required:true},
          softName:{required:true},
          softFile:{required:true}
      },
      //软件信息更新
      softReset: false,
      resetForm: {},
      //软件分发
      softAssign: false,
        dataTree:[],
        userData:[],
        props:{
            value: 'id',
            label: 'text',
            children: 'children'
        },
        checkList: ["营业用户", "办公用户"],
      time2: "",
      activeArea: ["list", "object", "section", "time"],
      assignForm: {
          softName:'',
          softId: 1,
        areas: [],
        privateVal: "",
        publickVal: "",
        section: "",
        installWay: 0,
          installTime:'',
      }
    };
  },
  components: {
    ElDatagrid,
    DialogForm
  },
  methods: {
   //总的方法
   //1.选择功能
    toolbarClickHandle: function(temp) {
      const [col, type] = temp;
      switch (type) {
        case "简易上传软件":
          this.uploadSee=true;
          break;
        case "新增上传软件":
          this.$router.push("/application/upload");
          break;
        case "软件信息更新":
          this.softReset = true;
          const data = JSON.parse(JSON.stringify(col[0]));
          this.resetForm = data;
          break;
        case "软件分发":
          this.softAssign = true;
          let assignData = JSON.parse(JSON.stringify(col[0]));
          console.log(assignData);
          this.assignForm.softName = assignData.softName;
          this.assignForm.softId = assignData.softId;
          break;
        case "软件发布任务管理":
          this.$router.push("./application/assign");
          break;
        case '删除':
          const deleteData = JSON.parse(JSON.stringify(col[0]));
          this.delete(deleteData);
          break;
        default:
          break;
      }
    },
    //2. 数据加载
    searchTable:function(){
      bus.$emit(this.loadName);
    },
    //查询所有
     searchAll(){
        this.form.softName='';
        this.form.softType ='';
        this.searchTable();
     },
    //功能1:简易文件上传
      beforeUpload:function(file){
        this.uploadForm.softFile = file.name;
        console.log(file);
      },
      success:function(Response) {
        let data = Response.data;
        let params={
            softName:this.uploadForm.softName,
            softType:this.uploadForm.softType,
            softFileSize : data.size,
            softFilePath : data.path
      };
        let callback = ()=>{};
        this._ajax('post','./upload.do',callback,params);
        },
    upload:function(){
        this.$refs.upload.submit();
        this.uploadSee = false;
        this._alert('上传文件成功!','success',this.searchTable());
    },
    //请求办公用户级联数据
      getDataTree:function(){
          let callback = (data)=>{
              this.dataTree = JSON.parse(data);
          };
          this._ajax('get', './officeOrganizationAddTree.do',callback,{});
    },
      //请求渠道用户级联数据
      getUserData:function () {
        let callback = (data)=>{
            this.userData = JSON.parse(data);
          } ;
        this._ajax('get','./outOrganizationTreeQuery.do',callback,{});
      },
    //功能:删除
    delete: function(data) {
     console.log(data);
     let params = {softId:data.softId};
     const callback = (res)=>{
         this._alert('删除数据成功!','success',this.searchTable());
        };
     this._ajax('delete','./softDelete.do',callback,params);
    },

    //软件信息更新
    Renew:function(){
      const params = this.resetForm;
      const callback = (Response)=>{
          this.softReset = false;
            this._alert('信息更新成功','success',this.searchTable);
        };
      this._ajax('put','./softUpdate.do',callback,params);
    },
    //软件分发
      pickTime:function(){
        this.assignForm.installTime = this.time2.getTime();
      },
    assign:function(){
      const params = this.assignForm;
      const callback = (Response)=>{
        if(Response.code == 0 ){
          this._alert('软件分发成功','success',this.searchTable);
        }
      };
      this._ajax('post','./softSend.do',callback,params);
    },
  },
    created(){
      this.getDataTree();
      this.getUserData();
    }
};
</script>

