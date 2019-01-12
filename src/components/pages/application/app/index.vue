<template>
    <section>
        <el-collapse v-model="activePart">
            <el-collapse-item title="查询" name="search">
                <el-form :model="form" ref="form" inline>
                    <el-form-item label="软件名称:">
                        <el-input v-model="form.softName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchTable">查询</el-button>
                        <el-button type="success" size="small">查询所有</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="应用链接列表" name="list">
                <el-datagrid :url="url" :params="form" :option="datagridOptions" :reload-event="loadName"
                 @toolbarClick ="toolbarClickHandle"></el-datagrid>
            </el-collapse-item>
        </el-collapse>
        <!-- 新增应用连接 -->
        <el-dialog title="新增应用链接" :visible.sync="appShow">
            <el-form :model="addForm" ref="addForm" lable-width="200px">
                <el-form-item label="链接名称:">
                    <el-input v-model="addForm.appLinkName" style="width:60%;"></el-input>
                </el-form-item>
                 <el-form-item label="服务器IP:">
                    <el-input v-model="addForm.ip" style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="首页地址:">
                    <el-input v-model="addForm.address" style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="测试文件地址:">
                    <el-input v-model="addForm.testAddress" style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="链接状态:">
                   <el-radio v-model="addForm.status" label="有效" ></el-radio>
                   <el-radio v-model="addForm.status" label="无效" ></el-radio>
                </el-form-item>
                <el-form-item label="默认浏览器:">
                    <el-radio v-model="addForm.browser" label="IE">IE</el-radio>
                    <el-radio v-model="addForm.browser" label="谷歌">谷歌</el-radio>
                    <el-radio v-model="addForm.browser" label="国产">国产</el-radio>
                </el-form-item>
                 <el-form-item label="是否在客户端显示:">
                    <el-radio v-model="addForm.flag" label="是">是</el-radio>
                    <el-radio v-model="addForm.flag" label="否">否</el-radio>
                </el-form-item>
                <el-form-item label="营业用户是否可见:">
                    <el-radio v-model="addForm.see" label="是">是</el-radio>
                    <el-radio v-model="addForm.see" label="否">否</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="danger" @click="appShow=false">取消</el-button>
                <el-button type="primary" @click="appShow=false">确定</el-button>
            </span>
        </el-dialog>
        <!-- 更新 -->
        <el-dialog title="修改应用链接" :visible.sync="renewShow">
          <el-form :model="renewForm">
            <el-form-item label="链接名称:">
              <el-input v-model="renewForm.name"></el-input>
            </el-form-item>
            <el-form-item label="服务器IP地址:">
              <el-input v-model="renewForm.ip"></el-input>
            </el-form-item>
            <el-form-item label="首页地址:">
              <el-input v-model="renewForm.address"></el-input>
            </el-form-item>
            <el-form-item label="测试文件地址:">
              <el-input v-model="renewForm.testAddress"></el-input>
            </el-form-item>
            <el-form-item label="链接状态:">
              <el-radio v-model="renewForm.status" label="有效"></el-radio>
              <el-radio v-model="renewForm.status" label="无效"></el-radio>
            </el-form-item>
            <el-form-item label="默认浏览器">
              <el-radio v-model="renewForm.browser" label="IE浏览器">IE</el-radio>
              <el-radio v-model="renewForm.browser" label="谷歌浏览器">谷歌</el-radio>
              <el-radio v-model="renewForm.browser" label="国产浏览器">国产</el-radio>
            </el-form-item>
            <el-form-item label="是否在客户端首页显示:">
              <el-radio v-model="renewForm.flag" label="是"></el-radio>
              <el-radio v-model="renewForm.flag" label="否"></el-radio>
            </el-form-item>
            <el-form-item label="营业用户是否可见:">
              <el-radio v-model="renewForm.see" label="是"></el-radio>
              <el-radio v-model="renewForm.see" label="否"></el-radio>
            </el-form-item>
          </el-form>
        </el-dialog>
    </section>
</template>
<script>
import ElDatagrid from "../../../ElDatagrid";
import bus from '../../../../utils/bus';
export default {
  data: function() {
    return {
      activePart: ["search", "list"],
      form: {
        softName: ""
      },
      //新增应用链接
      appShow: false,
      addForm: {
          appLinkName: "",
          appLinkAddress: "",
          appLinkIndex: "",
          appLinkDesc: "",
          appLinkLogo: "",
          appLinkFlag: "",
          defaultBrowser: "",
          defaultFlag: "",
          businessHallVisible: ""
      },
      //更新
      renewShow: false,
      renewForm: {},
      //软件列表
      url: "./appLinkList.do",
      loadName: "appListReload",
      datagridOptions: {
        toolbar: [
          {
            name: "新增",
            type: "success",
            icon: "upload",
            usable: true
          },
          {
            name: "更新",
            type: "warning",
            icon: "renew",
            usable: false
          },
          {
            name: "删除",
            type: "danger",
            icon: "delete",
            usable: false
          }
        ],
        columns: [
          {
            title: "应用链接名称",
            data: "link_name"
          },
          {
            title: "服务器IP",
            data: "link_address"
          },
          {
            title: "首页地址",
            data: "link_index"
          },
          {
            title: "当前状态",
            data: "link_flag"
          },
          {
            title: "是否在客户端首页显示",
            data: "default_flag"
          },
          {
            title: "默认浏览器",
            data: "default_browser"
          },
          {
            title: "营业用户是否可见",
            data: "business_hall_visible"
          }
        ],
        checkbox: true
      }
    };
  },
  components: {
    ElDatagrid
  },
  methods: {
    toolbarClickHandle: function(temp) {
      const [row, type] = temp;
      switch (type) {
        case "新增":
          this.appShow = true;
          this.Add();
          break;
        case '更新':
          this.renewShow = true;
          const data = JSON.parse(JSON.stringify(row[0]));
          this.renewForm = data;
          console.log(this.renewForm);
          this.renew();
          break;
        case '删除':
          this.delete(row[0]);
        default:
          break;    
      }
    },
    searchTable:function(){
      bus.$emit(this.loadName);
    },
    renew:function() {
      const params = this.renewForm;
      const callback = (Response) =>{
        if(Response.code == 0){
          this._alert('更新数据成功','success', this.searchTable);
        }
      };
      this._ajax('put','./appLinkModifyAction.do',callback,params);
    },
    //删除数据
    delete:function(data){
      const params = data.name;
      const callback = (Response)=>{
        if(Response.code == 0){
          this._alert('删除数据成功!','success',this.searchTable);
        }
      };
      this._ajax('delete','./appLinkDelete.do',callback,params);
    },
    Add:function() {
      const params = this.addForm;
      const callback = (Response)=>{
        if(Response.code == 0 ){
         this._alert('新增成功','success',this.searchTable());
        }
      };
      this._ajax('post','./appLinkAddAction.do',callback,params);
    },
  }
};
</script>

