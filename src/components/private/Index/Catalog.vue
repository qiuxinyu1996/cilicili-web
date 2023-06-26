<template>
    <div class="catalog">
        <div class="catalog-header">
            <div class="hot">
            <div class="hot-icon-wrapper">
                <div class="hot-icon el-icon-magic-stick"></div>
            </div>
            <div class="hot-text">热 门</div>
        </div>
        <div class="channel">
            <div class="channel-icon-wrapper">
                <div class="channel-icon el-icon-video-camera"></div>
            </div>
            <div class="channel-text">频 道</div>
        </div>
        <div class="community">
            <div class="community-icon-wrapper">
                <div class="community-icon el-icon-house"></div>
            </div>
            <div class="community-text">社 区</div>
        </div>
        </div>
        <div class="classify">
            <div class="classify-anime">番 剧</div>
            <div class="classify-film">电 影</div>
            <div class="classify-variety">综 艺</div>
            <div class="classify-series">连续剧</div>
            <div class="classify-documentary">纪录片</div>
            <div class="classify-music">音 乐</div>
            <div class="classify-foods">美 食</div>
            <div class="classify-dance">舞 蹈</div>
            <div class="classify-knowledge">知 识</div>
            <div class="classify-news">新 闻</div>
            <div class="classify-technology">科 技</div>
            <div class="classify-games">游 戏</div>
            <div class="classify-entertainment">娱 乐</div>
            <div class="classify-sports">运 动</div>
            <div class="classify-fashion">时 尚</div>
            <div class="classify-fitness">健 身</div>
            <div class="classify-u1">?</div>
            <div class="classify-u2">?</div>
            <div class="classify-u3">?</div>
            <div class="classify-u4">?</div>
        </div>
        <div class="catalog-other">
            <div class="catalog-other-volume"><i class="el-icon-s-cooperation"></i> 专 栏</div>
            <div class="catalog-other-activity"><i class="el-icon-s-flag"></i> 活 动</div>
            <div class="catalog-other-notice"><i class="el-icon-message-solid"></i> 公 告</div>
            <div class="catalog-other-hot-song"><i class="el-icon-s-data"></i> 热 歌</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Catalog'
    }
</script>

<style>
.catalog{
    width: 100%;
    height: 110px;
    background-color: #ffffff;

    position: relative;
    z-index: 99;
}
.catalog-header{
    width: 160px;
    height: 65px;
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% - 520px), -50%);
}
.hot{
    width: 40px;
    height: 65px;

    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0,-50%);
}
.channel{
    width: 40px;
    height: 65px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.community{
    width: 40px;
    height: 65px;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0,-50%);
}
.hot:hover,.channel:hover,.community:hover{
    cursor: pointer;
}
.hot-icon-wrapper,.channel-icon-wrapper,.community-icon-wrapper{
    width: 40px;
    height: 40px;
    font-size: 40px;
    border-radius: 20px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
.hot-icon-wrapper{
    background-color: #f07775;
}
.channel-icon-wrapper{
    background-color: #0066ff;
}
.community-icon-wrapper{
    background-color: #59CA73;
}
.hot-icon-wrapper:hover{
    background-color: #f38e8c;
}
.channel-icon-wrapper:hover{
    background-color: #5599ff;
}
.community-icon-wrapper:hover{
    background-color: #6CD083;
}
.hot-icon,.channel-icon,.community-icon{
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #ffffff;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.hot-text,.channel-text,.community-text{
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
.classify{
    width: 800px;
    height: 65px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.classify > div{
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background-color: #f6f7f8;
    font-size: 13px;
    color: #18191c;
}
.classify > div:hover{
    cursor: pointer;
    background-color: #e3e5e7;
}
.classify-anime{
    position: absolute;
    top: 0;
    left: 0;
}
.classify-film{
    position: absolute;
    bottom: 0;
    left: 0;
}
.classify-variety{
    position: absolute;
    top: 0;
    left: 80px;
}
.classify-series{
    position: absolute;
    bottom: 0;
    left: 80px;
}
.classify-documentary{
    position: absolute;
    top: 0;
    left: 160px;
}
.classify-music{
    position: absolute;
    bottom: 0;
    left: 160px;
}
.classify-foods{
    position: absolute;
    top: 0;
    left: 240px;
}
.classify-dance{
    position: absolute;
    bottom: 0;
    left: 240px;
}
.classify-knowledge{
    position: absolute;
    top: 0;
    left: 320px;
}
.classify-news{
    position: absolute;
    bottom: 0;
    left: 320px;
}
.classify-technology{
    position: absolute;
    top: 0;
    left: 400px;
}
.classify-games{
    position: absolute;
    bottom: 0;
    left: 400px;
}
.classify-entertainment{
    position: absolute;
    top: 0;
    left: 480px;
}
.classify-sports{
    position: absolute;
    bottom: 0;
    left: 480px;
}
.classify-fashion{
    position: absolute;
    top: 0;
    left: 560px;
}
.classify-fitness{
    position: absolute;
    bottom: 0;
    left: 560px;
}
.classify-u1{
    position: absolute;
    top: 0;
    left: 640px;
}
.classify-u2{
    position: absolute;
    bottom: 0;
    left: 640px;
}
.classify-u3{
    position: absolute;
    top: 0;
    left: 720px;
}
.classify-u4{
    position: absolute;
    bottom: 0;
    left: 720px;
}
.catalog-other{
    width: 180px;
    height: 65px;
    border-left: #e3e5e7 2px solid;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% + 520px), -50%);
}
.catalog-other > div{
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #61666d;
    font-size: 15px;
    font-weight: bold;

    position: absolute;
}
.catalog-other > div:hover{
    cursor: pointer;
    color: #00aeec;
}
.catalog-other-volume{
    top: 0;
    left: 20px;
}
.catalog-other-activity{
    top: 0;
    right: 0;
}
.catalog-other-notice{
    bottom: 0;
    left: 20px;
}
.catalog-other-hot-song{
    bottom: 0;
    right: 0;
}
</style>