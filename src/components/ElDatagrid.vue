<template>
    <div>
        <div class="toolbar">
            <el-button size="small" v-for="tool in option.toolbar" :key="tool.name" :type="tool.type" :icon="'el-icon-' + tool.icon"
                :disabled="tool.usable ? false : toolUsable" @click="toolbarClick(tool.name)">{{ tool.name }}</el-button>
        </div>

        <el-table :data="showRows" stripe border @selection-change="tableSelect">
            <!-- 多选 -->
            <el-table-column v-if="option.checkbox" type="selection"></el-table-column>
            <!-- 序号 -->
            <el-table-column type="index" :index="index"></el-table-column>
            <!-- 数据展示列 -->
            <el-table-column v-for="col in contentColumns" :key="col.title" :label="col.title" :prop="col.data"
                :formatter="col.formatterFn || formatterFn"></el-table-column>
            <!-- 可以对每行操作的按钮 -->
            <template v-if="Object.keys(actionColumn).length">
                <el-table-column :label="actionColumn.title">
                    <template slot-scope="scope">
                        <el-button v-for="action in actionColumn.actions" :key="action.name" :type="action.type" @click="rowClick(scope.row, action.name)">
                            {{ action.name }}
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 20, 50]" :total="total"
            :page-size="option.pageSize ? option.pageSize : 5" :current-page.sync="currentPage" @current-change="currentPageChange"
            @size-change="pageSizeChange"></el-pagination>
    </div>
</template>

<script>
    import bus from '../utils/bus.js';

    export default {
        props: {
            // 配置项
            option: {
                type: Object
            },
            // 用来发送 ajax 获取数据
            url: {
                type: String,
                default: ''
            },
            params: {
                type: Object
            },
            reloadEvent: String
        },
        data: function () {
            let contentColumns = [],
                actionColumn = {};
            for (const col of this.option.columns) {
                if (col.data) {
                    contentColumns.push(col);
                } else {
                    actionColumn = col;
                }
            }
            return {
                // 列
                contentColumns,
                actionColumn,
                // 多选
                selectRows: [],
                // toolbar 是否需要选择一行才可用
                toolUsable: true,
                // 分页相关
                rows: [],
                total: 0,
                showRows: [],
                index: 1,
                size: this.option.pageSize ? this.option.pageSize : 5,
                currentPage: 1
            }
        },
        methods: {
            // 点击每行，向父组件传递这一行的数据和被点击按钮的名称
            rowClick: function (row, name) {
                this.$emit('rowClick', [row, name]);
            },
            tableSelect: function (cur) {
                // 选中的行
                this.selectRows = cur;
                if (cur.length > 0) {
                    this.toolUsable = false;
                } else {
                    this.toolUsable = true;
                }
            },
            // 点击 toolbar，向父组件传递选中的所有行和被点击按钮的名称
            toolbarClick: function (name) {
                this.$emit('toolbarClick', [this.selectRows, name]);
            },
            // 切换页数，改变显示的数据和序号
            currentPageChange: function (page) {
                this.showRows = this.rows.slice(0 + (page - 1) * this.size, page * this.size);
                this.index = this.size * (page - 1) + 1;
            },
            // 切换每页多少条之后，回到第一页,序号重置（简单处理）
            pageSizeChange: function (size) {
                this.index = 1;
                this.currentPage = 1;
                this.size = size;
                this.showRows = this.rows.slice(0, size);
            },
            // 请求数据
            getData: function () {
                const callback = (data) => {
                    this.total = data.total;
                    this.rows = data.rows;
                    this.showRows = this.rows.slice(0, this.size);
                }
                this._ajax('get', this.url, callback, this.params)
            },
            formatterFn: function (row, column, cellValue, index) {
                return cellValue;
            }
        },
        beforeMount: function () {
            this.getData();
        },
        created: function () {
            bus.$on(this.reloadEvent, () => {
                this.getData();
            });
        }
    }
</script>

<style scoped>
    .toolbar {
        border: 1px solid #ebeef5;
        border-bottom: none;
        padding: 5px;
        background-color: rgb(250, 250, 250);
    }

    .el-pagination {
        border: 1px solid #ebeef5;
        border-top: none;
        padding: 5px;
    }
</style>