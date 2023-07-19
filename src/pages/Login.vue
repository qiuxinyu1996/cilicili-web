<template>
    <div class="login">
        <div class="advertisement"></div>
        <div class="login-wrapper">
            <div class="login-title">登录</div>
            <div class="login-user-info">
                <div class="login-username">
                    <div class="username-text">账号</div>
                    <div class="username-input">
                        <el-input placeholder="请输入内容" v-model="user.username" size="mini" style="width: 250px; height: 30px; outline: none;"></el-input>
                    </div>
                </div>
                <div class="login-password">
                    <div class="password-text">密码</div>
                    <div class="password-input">
                        <el-input placeholder="请输入内容" v-model="user.password" size="mini" style="width: 250px; height: 30px; outline: none;"></el-input>
                    </div>
                </div>
            </div>
            <div class="other">
                <el-button type="primary" @click="login()">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                console.log('login')
                axios.post('/api/user/login',{
                    username: this.user.username,
                    password: this.user.password
                }).then((resp) => {
                    console.log(resp.data);
                    if(resp.data.success) {
                        localStorage.setItem('token', resp.data.data.token)
                        localStorage.setItem('userInfo',JSON.stringify(resp.data.data.userVo))
                        this.$store.commit('setUser', resp.data.data.userVo)
                        this.$router.push({name: 'index'})
                    } else {
                        this.$message.error('用户名或密码错误');
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$router.push({name: 'login'})
                    this.$message.error('服务器连接异常');
                });
            }
        },
        mounted() {
            if(localStorage.getItem('token')) {
                axios.post("/api/user/check",{
                    token: localStorage.getItem('token')
                }).then(
                    (resp) => {
                        console.log('login?')
                        console.log(resp)
                        if(resp.data.success) {
                            this.$router.push({name: 'index'})
                            this.$message.success('您已登录，欢迎回来');
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        background-image: url('@/assets/yuezhan.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .login-wrapper {
        width: 500px;
        height: 500px;
        background-color: rgba(255, 255, 255, .9);
        border-radius: 30px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 450px), -50%);
    }
    .login-title {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 100px));
    }
    .login-user-info {
        width: 350px;
        height: 110px;
        background-color: whitesmoke;
        border-radius: 10px;
        border: #e3e5e7 1px solid;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .login-username {
        width: 350px;
        height: 55px;
        border-bottom: #e3e5e7 1px solid;
        box-sizing: border-box;

        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);

    }
    .login-password {
        width: 350px;
        height: 55px;
        box-sizing: border-box;

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .username-text,.password-text {
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #212121;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% - 140px), calc(-50% - 1px));
    }
    .username-input,.password-input{
        width: 250px;
        height: 28px;
        outline: none;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 20px), -50%);
    }
    .username-input>>>.el-input__inner, .password-input>>>.el-input__inner {
        border: 0;
    }
    .other {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 80px), calc(-50% + 100px));
    }
</style>