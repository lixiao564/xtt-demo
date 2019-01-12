<template>
    <div class="common">
        <div>
            <div class="title">
                <i class="el-icon-search"></i>
                <span>查询</span>
            </div>
            <div class="content">
                <el-form :inline="true" :model="search">
                    <el-form-item label="用户组">
                        <el-select v-model="search.safeCfggroup">
                            <el-option v-for="item in groups" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生成日期">
                        <el-date-picker v-model="search.dateTimeBegin" :editable=false value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker v-model="search.dateTimeEnd" :editable=false value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="searchTable">查询</el-button>
                        <el-button type="info" icon="el-icon-cqdx-redo" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div>
            <div class="title">
                <i class="el-icon-cqdx-table"></i>
                <span>配置文件列表</span>
            </div>
            <div class="content">
                <el-datagrid :url="url" :params="search" :option="datagridOption" :reload-event="datagridName"
                    @toolbarClick="toolbarClick"></el-datagrid>
            </div>
        </div>

        <el-dialog title="重新生成" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-steps :active="active" finish-status="success">
                <el-step title="用户组" icon="el-icon-edit"></el-step>
                <el-step title="业务系统" icon="el-icon-edit"></el-step>
                <el-step title="软件" icon="el-icon-edit"></el-step>
                <el-step title="环境配置" icon="el-icon-edit"></el-step>
            </el-steps>
            <div class="content">
                <div v-show="active == 0 ? true : false">
                    <el-radio-group v-model="add.userGroup">
                        <el-radio label="winpc">终端服务器</el-radio>
                        <el-radio label="normalpc">PC终端</el-radio>
                        <el-radio label="winseven">win7系统</el-radio>
                    </el-radio-group>
                </div>
                <div v-show="active == 1 ? true : false">
                    <el-transfer v-model="add.businessSystem" :data="businessTransfer" :titles="['待选系统', '已选系统']"
                        :button-texts="['移出', '选择']"></el-transfer>
                </div>
                <div v-show="active == 2 ? true : false">
                    <el-transfer v-model="add.listId" :data="objectTransfer" :titles="['待选软件', '已选软件']" :button-texts="['移出', '选择']"></el-transfer>
                </div>
                <div v-show="active == 3 ? true : false">
                    <el-upload :limit="1" ref="upload" action="./safeConfig.do" name="enFile" :data="add" :auto-upload="false"
                        :on-change="fileChange" :on-remove="fileChange" :before-upload="beforeUpload" :on-success="onSuccess">
                        <el-button size="small" type="primary">选择文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能选择上传一个文件！</div>
                    </el-upload>
                </div>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="previous" :disabled="!this.active">上一步</el-button>
                <el-button type="primary" @click="next">{{ active != 3 ? '下一步' : '确定' }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElDatagrid from '../../../ElDatagrid.vue';
    import bus from '../../../../utils/bus.js';

    export default {
        name: 'config',

        components: {
            ElDatagrid
        },
        data: function () {
            return {
                // 下拉框数据
                groups: [{
                        label: '终端服务器',
                        value: 'winpc'
                    },
                    {
                        label: 'PC终端',
                        value: 'normalpc'
                    },
                    {
                        label: 'win7系统',
                        value: 'winseven'
                    }
                ],
                types: [{
                        lable: '插件配置文件',
                        value: '插件配置文件'
                    },
                    {
                        lable: '软件配置文件',
                        value: '软件配置文件'
                    },
                    {
                        lable: '环境配置文件',
                        value: '环境配置文件'
                    },
                    {
                        lable: '业务系统配置',
                        value: '业务系统配置'
                    }
                ],
                // 查询参数
                search: {},

                // 数据表格
                url: './affairsList.do',
                datagridName: this._random('datagrid'),
                datagridOption: {
                    toolbar: [{
                            name: '重新生成',
                            type: 'primary',
                            icon: 'plus',
                            usable: true
                        },
                        {
                            name: '删除',
                            type: 'danger',
                            icon: 'delete',
                            usable: false
                        },
                    ],
                    columns: [{
                            title: '配置文件编号',
                            data: 'safe_cfg_id'
                        },
                        {
                            title: '配置文件名称',
                            data: 'safe_cfg_name'
                        },
                        {
                            title: '配置文件类型',
                            data: 'safe_cfg_type'
                        },
                        {
                            title: '用户组',
                            data: 'safe_cfg_group',
                            formatterFn: (...rest) => {
                                switch (rest[2]) {
                                    case 'normalpc':
                                        return 'PC终端';
                                        break;
                                    case 'winpc':
                                        return '终端服务器';
                                        break;
                                    case 'winseven':
                                        return 'win7系统';
                                        break;
                                    default:
                                        break;
                                }
                            }
                        },
                        {
                            title: '生成时间',
                            data: 'date_time',
                            formatterFn: (...rest) => {
                                return this._formatTime(rest[2]);
                            }
                        },
                        {
                            title: '有效性',
                            data: 'valid_flag',
                            formatterFn: (...rest) => {
                                if (rest[2] == '1') {
                                    return '有效';
                                } else {
                                    return '无效';
                                }
                            }
                        }
                    ],
                    checkbox: true
                },

                dialogVisible: false,
                active: 0,
                add: {},
                businessTransfer: [],
                objectTransfer: [],
                fileLength: 0
            }
        },
        methods: {
            searchTable: function () {
                bus.$emit(this.datagridName);
            },
            reset: function () {
                this.search = {};
            },
            toolbarClick: function (params) {
                const [rows, type] = params;
                switch (type) {
                    case '重新生成':
                        this.dialogShow('dialogVisible');
                        break;
                    case '删除':
                        const params = rows.map((row) => {
                            return row.safe_cfg_id;
                        });
                        this.delete(params.join(','));
                        break;
                    default:
                        break;
                }
            },

            delete: function (ids) {
                const sureFn = () => {
                    const params = {
                        safeCfgId: ids
                    };
                    const callback = () => {
                        this._alert('删除成功！', 'success', this.searchTable);
                    };
                    this._ajax('delete', './cfgDelete.do', callback, params);
                };
                this._confirm('确定要删除吗？', sureFn);
            },

            getBusinessTransfer: function () {
                const callback = (data) => {
                    this.businessTransfer = data.rows.map((row) => {
                        return {
                            key: row.link_name,
                            label: row.link_name
                        }
                    });
                };
                this._ajax('get', './appLinkList.do', callback, {}, 'unblock');
            },
            getObjectTransfer: function () {
                const callback = (data) => {
                    this.objectTransfer = data.rows.map((row) => {
                        return {
                            key: row.softId,
                            label: row.softName
                        }
                    });
                };
                this._ajax('get', './softListQuery.do', callback, {}, 'unblock');
            },

            next: function () {
                switch (this.active) {
                    case 0:
                        if (this.add.userGroup) {
                            this.active = this.active + 1;
                        } else {
                            this._alert('请选择用户组！', 'error');
                        }
                        break;
                    case 1:
                        if (Array.isArray(this.add.businessSystem)) {
                            // 是数组
                            if (this.add.businessSystem.length > 0) {
                                this.active = this.active + 1;
                            } else {
                                this._alert('请选择业务系统！', 'error');
                            }
                        }
                        break;
                    case 2:
                        if (Array.isArray(this.add.listId)) {
                            if (this.add.listId.length > 0) {
                                this.active = this.active + 1;
                            } else {
                                this._alert('请选择软件！', 'error');
                            }
                        }
                        break;
                    case 3:
                        if (this.fileLength > 0) {
                            this.$refs['upload'].submit();
                        } else {
                            this._alert('请选择文件', 'error');
                        }
                        break;
                    default:
                        break;
                }
            },
            previous: function () {
                if (this.active > 0) {
                    this.active = this.active - 1;
                }
            },

            dialogHide: function (name) {
                this[name] = false;
            },
            dialogShow: function (name) {
                this[name] = true;
            },
            fileChange(file, list) {
                this.fileLength = list.length;
            },
            beforeUpload(file) {
                this.add.enFileFileName = file.name;
                this.loadingInstance = this._loading();
            },
            onSuccess: function (response) {
                this.loadingInstance.close();
                // 清空文件队列
                this.$refs['upload'].clearFiles();
                this.add = {};
                this.active = 0;
                if (response.code == 0) {
                    // 关闭dialog
                    this.dialogHide('dialogVisible');
                    // 提示用户
                    this._alert('生成成功！', 'success', this.searchTable);
                } else {

                    this._alert('生成失败！', 'error');
                }
            }
        },
        created: function () {
            this.getBusinessTransfer();
            this.getObjectTransfer();
        }
    }
</script>

<style scoped>

</style>