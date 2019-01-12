<template>
    <section>
        <el-collapse v-model="activePart">
            <el-collapse-item title="查询软件" name="search">
                <el-form :model="form" ref="form" inline>
                    <el-form-item label="培训资料名称:">
                        <el-input v-model="form.softName"></el-input>
                    </el-form-item>
                    <el-form-item label="培训资料类型:">
                        <el-select v-model="form.softType">
                            <el-option v-for="item in groups" :key="item.value" :lable="item.lable" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small">查询</el-button>
                        <el-button type="success" size="small">查询所有</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="培训列表" name="list">
                <el-datagrid :url="url" :params="form" :option="datagridOptions" :reload-event="loadName" @toolbarClick ="toolbarClickHandle"></el-datagrid>
            </el-collapse-item>
        </el-collapse>
        <!-- 修改资料 -->
        <el-dialog title="培训资料信息" :visible.sync="isSee">
            <el-form ref="resetForm">
                <el-form-item label="资料名称:">
                    <el-input v-model="resetForm.infoName"></el-input>
                </el-form-item>
                <el-form-item label="资料类型:">
                    <el-select v-model="resetForm.infoType">
                        <el-option label="1" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否必阅:">
                    <el-radio v-model="resetForm.infoFlag" label="1">是</el-radio>
                    <el-radio v-model="resetForm.infoFlag" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="一级分类:">
                    <el-input v-model="resetForm.typeOne"></el-input>
                </el-form-item>
                <el-form-item label="二级分类:">
                    <el-input v-model="resetForm.typeTwo"></el-input>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-input v-model="resetForm.typeThree"></el-input>
                </el-form-item>
            </el-form>
             <span slot="footer">
                <el-button type="warning" @click="isSee=false">取消</el-button>  
                <el-button type="primary" @click="renew">确定</el-button>
            </span>
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
        softName: "",
        softType: ""
      },
      //更新资料信息
      isSee: false,
      resetForm: {},
      groups: [
        {
          lable: "所有",
          value: "所有"
        },
        {
          lable: "操作录像",
          value: "操作录像"
        },
        {
          lable: "操作手册",
          value: "操作手册"
        },
        {
          lable: "软件使用",
          value: "软件使用"
        },
        {
          lable: "其他",
          value: "其他"
        }
      ],
      //软件列表
      url: "./trainList.do",
      loadName: "softListReload",
      datagridOptions: {
        toolbar: [
          {
            name: "上传",
            type: "primary",
            icon: "upload",
            usable: true
          },
          {
            name: "删除",
            type: "danger",
            icon: "delete",
            usable: false
          },
          {
            name: "更新",
            type: "warning",
            icon: "renew",
            usable: false
          },
          {
            name: "下载",
            type: "info",
            icon: "download",
            usable: true
          }
        ],
        columns: [
          {
            title: "资料名称",
            data: "info_name"
          },
          {
            title: "资料类型",
            data: "info_type"
          },
          {
            title: "一级分类",
            data: "type_one"
          },
          {
            title: "二级分类",
            data: "type_two"
          },
          {
            title: "三级级分类",
            data: "type_three"
          },
          {
            title: "文件大小",
            data: "file_size"
          },
          {
            title: "点击量",
            data: "info_click"
          },
          {
            title: "上传者",
            data: "emp_id"
          },
          {
            title: "上传时间",
            data: "info_date"
          },
          {
            title: "必阅标记",
            data: "info_flag"
          }
        ],
        checkbox: true
      }
    };
  },
  components: {
    ElDatagrid,
  },
  methods: {
    //总的方法：功能分类
    toolbarClickHandle: function(temp) {
      const [col, type] = temp;
      switch (type) {
        case "上传":
          this.$router.push("/application/info");
          break;
        case'删除':
            {
                const params = col.map((row)=>{
                    return row.info_id;
                });
                this.delete(params.join(','));
            }
            break;
        case "更新":
          this.isSee = true;
          const form = JSON.parse(JSON.stringify(col[0]));
          this.resetForm = form;
          case '下载':
              let id = col[0].info_id;
              this.download(id);
        default:
          break;
      }
    },
    //总的方法：刷新表格
    searchTable:function(){
      bus.$emit(this.loadName);
    },

    //功能一：上传见Upload.vue

    //功能二：删除
    delete:function(data) {
     const sureFn =()=>{
            const params = { trainID: data};
            const callback = ()=>{
                this._alert('删除成功','success',this.searchTable);

            };
            this._ajax('delete','./trainDelete.do',callback,params);
        };
        this._confirm('确定删除！', sureFn);
     },


    //功能三：更新
    renew:function(){
      const params = this.resetForm;
      const callback = (Response)=>{
          this.isSee = false ;
          this._alert ('更新信息成功！','success',this.searchTable);
        };
      this._ajax('put', './TrainModify.do', callback , params);
    },
    //功能四：下载
    download(id){
        window.open(`./trainDownloads.do?trainID=${id}`);
    },
  }
};
</script>

