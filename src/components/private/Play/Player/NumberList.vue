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
        data(){
            return {
                selected: this.$route.query.p,
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
                console.log(videoList)
                var vid = videoList.listDetail[videoList.current-1].id
                console.log(vid)
            
                this.$router.push({
                name: 'play',
                query: {
                    vid: videoList.listDetail[videoList.current-1].id,
                    p: item,
                }
            })
                // this.selected = item
                // setTimeout(() => {
                //     this.$router.push({
                //         name: 'play',
                //         query: {
                //             vid: this.$store.state.player.videoId,
                //             p: item,
                //         }
                //     })
                // }, 100);
                // console.log('item' + item)

                // this.$axios.post('/api/video/getSource',{
                //     name: this.$store.state.player.name,
                //     current: item,
                // }).then(
                //     (resp) => {
                //         console.log(resp.data.data === null)
                //         if(resp.data.data != null) {
                //             this.$store.state.player.videoId = resp.data.data.videoId
                //             this.$store.state.player.source = resp.data.data.source
                //             this.$store.state.player.current = item
                //             this.$refs.videoRef.load()
                //             this.$refs.videoRef.play()
                //         } else {
                //             this.$message.error('视频源不存在')
                //         }
                //     }
                // ).catch(
                //     (err) => {
                //         console.log(err)
                //     }
                // )
                // // 更新播放信息缓存
                // setTimeout(() => {
                //     localStorage.setItem('player', JSON.stringify(this.$store.state.player))
                // }, 100);
                // // 获取评论区信息
                // setTimeout(() => {
                //     this.$axios.get('/api/video/getReview?videoId=' + this.$store.state.player.videoId)
                //     .then(
                //         (resp) => {
                //             console.log(resp.data.data)
                //             this.$store.commit('setReviewList', resp.data.data)
                //         }
                //     ).catch(
                //         (err) => {
                //             console.log(err)
                //         }
                //     ) 
                // }, 100);
            }
        },
    }
</script>
    
<style>
    .number-list{
        width: 400px;
        height: 670px;
        background-color: whitesmoke;
        border-radius: 10px;
        overflow: auto;
    }
    .list-header{
        width: 400px;
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
        left: 15px;
    }
    .list-content{
        width: 400px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;

        position: absolute;
        top: 45px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .selected{
        width: 60px;
        height: 60px;
        margin: 6px 6px;
        line-height: 60px;
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
        width: 60px;
        height: 60px;
        margin: 6px 6px;
        line-height: 60px;
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
</style>