<template>
    <section>
        <el-collapse v-model="activeName">
            <el-collapse-item title="查询" name="search">
                <el-form :model="form" ref="form" inline>
                    <el-form-item label="分发用户组">
                        <el-select v-model="form.group">
                            <el-option v-for="(item, index) in assignGroup" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="安装类型">
                        <el-select v-model="form.type">
                            <el-option v-for="(item, index) in typeGroup" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">确定</el-button>
                        <el-button type="danger">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="任务列表" name="list">
                <el-datagrid :url="url" :parms="form" :option="datagridOptions" :reload-event="loadName" @toolbarClick ="toolbarClickHandle"></el-datagrid>
            </el-collapse-item>
        </el-collapse>
    </section>
</template>

<script>
import ElDatagrid from "../../../ElDatagrid";
export default {
  data: function() {
    return {
      activeName: ["search", "list"],
      assignGroup: ["普通pc端", "win7系统", "中断服务器"],
      typeGroup: ["定时", "立即"],
      form: {
        group: "",
        type: ""
      },
      //任务列表
      url: "/assignlist",
      loadName: "assignListReload",
      datagridOptions: {
        toolbar: [
          {
            name: "删除",
            type: "danger",
            icon: "delete",
            usable: false
          }
         
        ],
        columns: [
          {
            title: "发布软件",
            data: "name"
          },
          {
            title: "分发用户组",
            data: "group"
          },
          {
            title: "软件安装时间",
            data: "time"
          },
          {
            title:'安装类型',
            data:'type'
          },
         
        ],
        checkbox: true
      }
    };
  },
  components: {
    ElDatagrid
  },
  methods:{
      toolbarClickHandle: function(temp) {
          console.log('hello world');
      }

  }
};
</script>

