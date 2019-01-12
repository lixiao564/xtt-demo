<template>
    <div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <!-- @keyup.enter.native 绑定回车事件 -->
                <el-input type="password" v-model="loginForm.password" @keyup.enter.native="loginCheck('loginForm')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginCheck('loginForm')" style="width: 100%">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                loginForm: {},
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码'
                    }]
                }
            }
        },
        methods: {
            loginCheck: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const callback = () => {
                            // 暂时通过sessionStorage来保存登录信息
                            sessionStorage.setItem('state', 'admin');
                            // 43200000秒之后需要重新登录
                            let clear = setTimeout(() => {
                                sessionStorage.clear();
                            }, 43200000);
                            // 跳转到首页
                            this.$router.push('/home');
                        };
                        const params = {
                            staffCode: this.loginForm.username,
                            userSec: this.loginForm.password,
                            identify: '123456'
                        };
                        this._ajax('post', './login/in.do', callback, params);
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>