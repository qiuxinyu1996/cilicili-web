<template>
    <div class="userCard">
        <div class="user-space-cover" :style="{'background-image':`url(${userInfo.spaceCover})`}"></div>
        <div class="user-icon" :style="{'background-image':`url(${userInfo.userIcon})`}"></div>
        <div class="user-name">
            {{ userInfo.username }}
        </div>
        <div class="user-info">
            <div class="follow">{{ userInfo.follow }} <span>关注</span></div>
            <div class="fans">{{ userInfo.fans }} <span>粉丝</span></div>
            <div class="action">{{ userInfo.action }} <span>动态</span></div>
        </div>
        <div class="user-sign">
            {{ userInfo.sign }}
        </div>
        <div class="follow-btn">
            + 关注
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserCard',
        props: [
            'userInfo'
        ]
    }
</script>

<style scoped>
    .userCard {
        width: 370px;
        height: 220px;

        position: absolute;
    }
    .user-space-cover {
        width: 370px;
        height: 85px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #9499a0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position-y: 50%;

        position: absolute;
        left: 0;
    }
    .user-icon {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #9499a0;
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        top: 100px;
        left: 10px;
    }
    .user-name {
        width: 100px;
        height: 25px;
        line-height: 25px;
        color: #18191c;
        font-size: 16px;

        position: absolute;
        top: 100px;
        left: 70px;
    }
    .user-info {
        width: 200px;
        height: 20px;

        position: absolute;
        top: 130px;
        left: 70px;
    }
    .follow,.fans,.action {
        width: 50px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #18191c;

        position: absolute;
    }
    .follow {
        left: 0;
    }
    .fans {
        left: 60px;
    }
    .action {
        left: 120px;
    }
    .user-info span {
        color: #9499a0;
    }
    .user-sign {
        width: 200px;
        height: 20px;
        line-height: 20px;
        color: #9499a0;
        font-size: 12px;

        position: absolute;
        top: 152px;
        left: 70px;
    }
    .follow-btn {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        background-color: #00aeec;
        color: #ffffff;
        font-size: 14px;

        position: absolute;
        top: 175px;
        left: 70px;
    }
    .follow-btn {
        cursor: pointer;
    }
</style>