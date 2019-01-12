<template>
    <div class="header">
        <span class="title">重庆电信终端一键式服务平台</span>
        <el-button type="danger" @click="loginOut" class="login-out">退出登录</el-button>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {

            }
        },
        methods: {
            loginOut: function () {
                const callback = () => {
                    const callback = () => {
                        sessionStorage.clear();
                        this.$router.push('/login');
                    };
                    const params = {};
                    this._ajax('get', './login/out.do', callback, params);
                };
                this._confirm('确定退出登录吗？', callback);
            }
        }
    }
</script>

<style scoped>
    .header {
        overflow: hidden;
        position: relative;
        margin: 0 auto;
        top: 50%;
        transform: translate(0, -50%);
        line-height: 40px;
    }

    .login-out {
        float: right;
    }

    .title {
        font-size: 22px;
    }
</style>