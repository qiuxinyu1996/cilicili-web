<template>
    <div class="header">
        <div class="header-content">
            <div class="left">
                <div class="homepage" @click="to_homepage()">
                    <div class="homepage-icon"></div>
                    <div class="homepage-text">主页</div>
                </div>
                <div class="anime item">番剧</div>
                <div class="film item">电影</div>
                <div class="music item">音乐</div>
                <div class="comic item">漫画</div>
                <div class="vip item">会员</div>
            </div>
            <div class="middle">
                <div class="search">
                    <input type="text" class="search-input" placeholder="约会大作战">
                    <div class="search-tag">
                        <i class="el-icon-search"></i>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="user">
                    <div class="user-icon"></div>
                    <div class="user-detail">
                        <div class="user-info">
                            <div class="user-name">{{ $store.state.user?$store.state.user.nickname:'null' }}</div>
                            <div class="user-account">
                                <div class="user-level">Lv6</div>
                                <div class="user-coin">硬币:860</div>
                            </div>
                            <div class="user-other">
                                <div class="user-follow">
                                    <div class="user-follow-count">999</div>
                                    <div class="user-follow-text">关注</div>
                                </div>
                                <div class="user-fans">
                                    <div class="user-follow-count">999</div>
                                    <div class="user-follow-text">粉丝</div>
                                </div>
                                <div class="user-action">
                                    <div class="user-follow-count">999</div>
                                    <div class="user-follow-text">动态</div>
                                </div>
                            </div>
                        </div>
                        <div class="user-function">
                            <div class="user-center">
                                <div class="user-center-icon el-icon-user"></div>
                                <div class="user-center-text">个人中心</div>
                                <div class="to-right-icon el-icon-arrow-right"></div>
                            </div>
                            <div class="user-works-manage">
                                <div class="user-works-manage-icon el-icon-edit"></div>
                                <div class="user-works-manage-text">作品管理</div>
                                <div class="to-right-icon el-icon-arrow-right"></div>
                            </div>
                            <div class="recommended-service">
                                <div class="recommended-service-icon el-icon-edit"></div>
                                <div class="recommended-service-text">推荐服务</div>
                                <div class="to-right-icon el-icon-arrow-right"></div>
                            </div>
                        </div>
                        <div class="user-logout-wrapper">
                            <div class="user-logout" @click="logout()">
                                <div class="user-logout-icon el-icon-switch-button"></div>
                                <div class="user-logout-text">退出登录</div>
                                <div class="to-right-icon el-icon-arrow-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message item">消息</div>
                <div class="action item">动态</div>
                <div class="collect item">收藏</div>
                <div class="history item">历史</div>
                <div class="submit item" @click="submit()">投稿</div>
            </div>
        </div>
        <div class="header-other"></div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Header',
        methods: {
            to_homepage() {
                this.$router.push({name: 'index'})
            },
            logout() {
                axios.post('/api/user/logout', {
                    token: localStorage.getItem('token')
                })
                .then(
                    (resp) => {
                        if(!resp.data.success) {
                            this.$message.error('登出异常');
                        }
                        localStorage.removeItem('token')
                        localStorage.removeItem('userInfo')
                        localStorage.removeItem('player')
                        this.$router.push({name: 'login'})
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            },
            submit() {
                axios.post('/api/user/submit')
                .then(
                    (resp) => {
                        if(resp.data.success) {
                            this.$message.success('投稿成功')
                        }else {
                            this.$message.error('投稿失败');
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
    .header{
        width: 100%;
        height: 150px;
        background-image: url("../../assets/diancipao.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        z-index: 100;
    }
    .header-content{
        width: 100%;
        height: 50px;
        background-color: rgba(0, 0, 0, 0);

        position: relative;
    }
    .left{
        width: 400px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0);

        position: absolute;
        z-index: 19;
        display: inline-block;
        top: 0;
        left: 0;
        transform: translate(0,0)
    }
    .left div:hover{
        cursor: pointer;
    }
    .middle{
        width: 500px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 10px;

        position: absolute;
        z-index: 20;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    .search{
        width: 500px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0);

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    .search-input{
        width: 100%;
        height: 40px;
        outline: none;
        font-size: 15px;
        border-radius: 10px;
        background-color: #e3e5e7;
        padding-left: 15px;

        position: absolute;
        top: 0;
        right: 0;
    }
    .search-tag{
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 40px;
        background-color: rgba(0, 0, 0,0);
        border-radius: 10px;

        position: absolute;
        top: 50%;
        right: 5px;
        transform: translate(-1px,-45%)
    }
    .search-tag:hover{
        cursor: pointer;
        background-color: rgba(0, 0, 0, .2)
    }
    .right{
        width: 400px;
        height: 50px;

        position: absolute;
        z-index: 18;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0);
        transform: translate(0,0)
    }
    .right div:hover{
        cursor: pointer;
    }
    .user-icon{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-image: url("../../assets/user.webp");
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        z-index: 10;
        transition: all 0.4s ease;

    }
    .user-detail{
        width: 300px;
        height: 460px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 0 30px rgba(0, 0, 0, .1);
        position: relative;
        z-index: 9;
        transform: translate(-140px, 50px);
        display: none;
    }
    .user:hover .user-icon{
        transform: translate(-10px, 30px) scale(2, 2);
    }
    .user:hover .user-detail{
        display: block;
    }
    .message{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 70px;
        transform: translate(0,-50%);
    }
    .action{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 120px;
        transform: translate(0,-50%);
    }
    .collect{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 170px;
        transform: translate(0,-50%);
    }
    .history{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 220px;
        transform: translate(0,-50%);
    }
    .submit{
        width: 90px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;
        background-color: #fb7299;
        border-radius: 10px;

        position: absolute;
        top: 50%;
        right: 20px;
        transform: translate(0,-50%);
    }
    .homepage{
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(0,-50%);
    }
    .homepage-icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-image: url('../../assets/cilicili.png');
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
    }
    .homepage-text{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;

        position: absolute;
        top: 50%;
        right: 6px;
        transform: translate(0, -50%);
    }
    .anime{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 100px;
        transform: translate(0,-50%);
    }
    .film{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 146px;
        transform: translate(0,-50%);
    }
    .music{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 192px;
        transform: translate(0,-50%);
    }
    .comic{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 238px;
        transform: translate(0,-50%);
    }
    .vip{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: whitesmoke;

        position: absolute;
        top: 50%;
        left: 284px;
        transform: translate(0,-50%);
    }
    /* 文字抖动 */
    .item:hover{
        animation-delay: 0s;
        animation-name: shock;
        animation-duration: .3s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-timing-function: linear;
    }

    @keyframes shock {
    0% {
        margin-left: 0px;
        margin-right: 0px;
        margin-top: 0px;
    }
    100% {
        margin-left: 0px;
        margin-right: 0px;
        margin-top: -3px	;
    }
}
.user{
    height: 0;
}
.user-info{
    width: 300px;
    height: 200px;
    position: relative;
    border-bottom: #e3e5e7 2px solid;
}
.user-name{
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #18191c;

    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,0);
}
.user-account{
    width: 150px;
    height: 30px;
    line-height: 30px;
    color: #9499a0;

    position: absolute;
    top: 90px;
    left: 50%;
    transform: translate(-50%,0);
}
.user-level{
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    background-color: red;
    color: white;
    font-weight: bold;
    border-radius: 3px;

    position: absolute;
    top: 50%;
    left: 25px;
    transform: translate(0, -50%);
}
.user-coin{
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;

    position: absolute;
    top: 50%;
    left: 60px;
    transform: translate(0, -50%);
}
.user-other{
    width: 200px;
    height: 50px;

    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-follow{
    width: 40px;
    height: 40px;

    position: relative;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
}
.user-follow:hover div{
    color: #00aeec;
}
.user-fans{
    width: 40px;
    height: 40px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.user-fans:hover div{
    color: #00aeec;
}
.user-action{
    width: 40px;
    height: 40px;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
}
.user-action:hover div{
    color: #00aeec;
}
.user-follow-count,.user-fans-count,.user-action-count{
    width: 100%;
    height: 24px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    color: #18191c;
}
.user-follow-text,.user-fans-text,.user-action-text{
    width: 100%;
    height: 16px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #9499a0;
}
.user-follow-count:hover,.user-follow-text:hover,
.user-fans-count:hover,.user-fans-text:hover,
.user-action-count:hover,.user-action-text:hover{
    cursor: pointer;
    color: #00aeec;
}
.user-function{
    width: 300px;
    height: 180px;
    border-bottom: #e3e5e7 2px solid;

    position: absolute;
    top: 210px;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-center{
    width: 250px;
    height: 50px;
    line-height: 50px;
    border-radius: 7px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-center:hover{
    background-color: #e3e5e7;
}
.user-works-manage{
    width: 250px;
    height: 50px;
    border-radius: 7px;

    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-works-manage:hover{
    background-color: #e3e5e7;
}
.recommended-service{
    width: 250px;
    height: 50px;
    border-radius: 7px;

    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%, 0);
}
.recommended-service:hover{
    background-color: #e3e5e7;
}
.user-center-icon{
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}
.to-right-icon{
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
}
.user-center-text{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 40px;
    transform: translate(0, -55%);
}
.user-works-manage-icon{
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}
.recommended-service-icon{
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}
.user-works-manage-text{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 40px;
    transform: translate(0, -55%);
}
.recommended-service-text{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 40px;
    transform: translate(0, -55%);
}
.user-logout-wrapper{
    width: 300px;
    height: 60px;

    position: absolute;
    top: 400px;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-logout{
    width: 250px;
    height: 50px;
    border-radius: 7px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
.user-logout:hover{
    background-color: #e3e5e7;
}
.user-logout-icon{
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}
.user-logout-text{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #61666d;

    position: absolute;
    top: 50%;
    left: 40px;
    transform: translate(0, -55%); 
}
</style>