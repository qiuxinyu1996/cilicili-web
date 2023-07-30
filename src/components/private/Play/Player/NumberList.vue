<template>
    <div class="number-list" :key="this.selected">
        <div class="list-header">
            <div class="list-header-text">正片({{ $store.state.videoList.current }}/{{ $store.state.videoList.listDetail.length }})</div>
        </div>
        <div class="list-content">
            <div class="list-content-number-wrapper" v-for="item in $store.state.videoList.listDetail.length">
                <div v-if="item == selected" class="selected">
                    {{ item }}
                </div>
                <div v-else class="unselected" @click="changeSelected(item)">
                    {{ item }}
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NumberList',
        computed: {
            selected() {
                return this.$route.query.p
            }
        },
        methods: {
            /**
             * 视频
             *  视频源
             * 按钮
             *  p
             * 评论区
             *  vid
             *
             * @param {*} item 
             */
            changeSelected(item){
                this.selected = item
                var videoList = JSON.parse(localStorage.getItem('videoList')) 
                videoList.current = item
                localStorage.setItem('videoList', JSON.stringify(videoList))
                this.$store.state.videoList = videoList
                this.$router.push({
                    name: 'play',
                    query: {
                        vid: videoList.listDetail[videoList.current-1].id,
                        p: item,
                    }
                })
            }
        },
    }
</script>
    
<style scoped>
    .number-list{
        width: 350px;
        height: 320px;
        position: relative;
        background-color: #f1f2f3;
        border-radius: 10px;
    }
    .list-header{
        width: 350px;
        height: 45px;
        
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0)
    }
    .list-header-text{
        width: 100px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 16px;

        position: absolute;
        top: 0;
        left: 5px;
    }
    .list-content{
        width: 350px;
        height: 270px;
        padding: 0 10px;
        box-sizing: border-box;
        display: inline-block;
        flex-wrap: wrap;
        overflow: auto;

        position: absolute;
        top: 45px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .list-content::-webkit-scrollbar { width: 0 !important }
    .selected{
        width: 54px;
        height: 54px;
        margin: 6px 6px;
        line-height: 54px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        background-color: #00a1d6;
        border-radius: 10px;
    }
    .selected:hover{
        cursor: pointer;
    }
    .unselected{
        width: 54px;
        height: 54px;
        margin: 6px 6px;
        line-height: 54px;
        text-align: center;
        color: black;
        font-size: 16px;
        background-color: white;
        border-radius: 10px;
    }
    .unselected:hover{
        cursor: pointer;
        border: blue;
        background-color: #dff6fd;
        outline: #00aeec 1px solid;
    }
    .list-content-number-wrapper {
        display: inline-block;
    }
</style>