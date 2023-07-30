<template>
    <div class="upper-info" v-if="upperInfo">
        <div class="upper-icon" :style="{'background-image':`url(${upperInfo.userIcon})`}"></div>
        <div class="upper-name">
            {{ upperInfo.nickname }}
        </div>
        <div class="upper-sign">
            {{ upperInfo.sign }}
        </div>
        <div class="upper-follow-btn">
            + 关注
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UpperInfo',
        props: [
            'upperInfo'
        ]
    }
</script>

<style>
    .upper-info {
        width: 350px;
        height: 100px;

        position: relative;
    }
    .upper-icon {
        width:60px;
        height: 60px;
        border-radius: 30px;
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
    }
    .upper-name {
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        color: #18191c;

        position: absolute;
        top: 5px;
        left: 70px;
    }
    .upper-sign {
        width: 300px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #9499a0;

        position: absolute;
        top: 35px;
        left: 70px;
    }
    .upper-follow-btn {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        background-color: #00AEEC;
        color: #ffffff;

        position: absolute;
        top: 60px;
        left: 70px;
    }
    .upper-follow-btn:hover {
        cursor: pointer;
        background-color: #40C5F1;
    }
    .upper-icon:hover,.upper-name:hover {
        cursor: pointer;
    }
</style>