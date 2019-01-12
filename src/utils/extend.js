import 'es6-promise';
import axios from 'axios';

axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};
axios.defaults.transformRequest = [function (data) {
    let newData = '';
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    };
    newData = newData.slice(0, newData.length - 1);
    return newData;
}];

function extend(obj) {
    obj._alert = function (content, type = 'success', callback = () => {}) {
        this.$message({
            type: type,
            message: content,
            showClose: true,
            duration: 1500,
            onClose: callback
        });
    };

    obj._confirm = function (content, sureFn) {
        this.$confirm(content, '提示', {
            type: 'warning'
        }).then(() => {
            sureFn();
        }).catch(() => {

        });
    };

    obj._loading = function (content = '拼命加载中......') {
        return this.$loading({
            text: content,
            spinner: 'el-icon-loading'
        });
    };

    obj._ajax = function (type, url, callback, params, noblock) {
        if (arguments.length == 2) {
            callback = () => {};
            params = {};
        }
        const loading = this._loading();
        switch (type) {
            case 'get':
                axios.get(url, {
                    params
                }).then(res => {
                    if (noblock != 'unblock') {
                        // 时间短的 get 请求不关闭 block 界面
                        loading.close();
                    }
                    if (res.data.code == 0) {
                        callback(res.data.data);
                    } else {
                        this._alert(res.data.msg, 'error');
                    }
                }).catch(err => {
                    console.error(err);
                });
                break;
            case 'post':
                axios.post(url, params).then(res => {
                    loading.close();
                    if (res.data.code == 0) {
                        callback(res.data.data);
                    } else {
                        this._alert(res.data.msg, 'error');
                    }
                }).catch(err => {
                    console.error(err);
                });
                break;
            case 'put':
                axios.put(url, params).then(res => {
                    loading.close();
                    if (res.data.code == 0) {
                        callback(res.data.data);
                    } else {
                        this._alert(res.data.msg, 'error');
                    }
                }).catch(err => {
                    console.error(err);
                });
                break;
            case 'delete':
                axios.delete(url, {
                    params
                }).then(res => {
                    loading.close();
                    if (res.data.code == 0) {
                        callback(res.data.data);
                    } else {
                        this._alert(res.data.msg, 'error');
                    }
                }).catch(err => {
                    console.error(err);
                });
                break;
            default:
                break;
        }
    };

    obj._random = function (str) {
        return str + '_' + parseInt(Math.random() * 100000000);
    };

    /**
     * 快捷使用 element-ui 提供的表单校验功能
     * 
     * @param {String} formName 需要进行校验的表单的 ref 属性值
     * @param {Function} submitFn 校验通过之后执行的函数
     */
    obj._form = function (formName, submitFn) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                submitFn();
            } else {
                this._alert('请填写必要信息！', 'error');
                return false;
            }
        });
    };
    obj._resetForm = function(formName) {
        this.$refs[formName].resetFields();
    };
    obj._formatTime = function (timestamp) {
        var date = new Date(timestamp), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
}

export default extend;