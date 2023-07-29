<template>
    <div class="card" @click="goto_player(videoCard)">
        <div class="card-img" :style="{'background-image':`url(${videoCard.cover})`}"></div>
        <div class="card-title">
            {{ videoCard.title }}
        </div>
        <div class="card-author">
            {{ videoCard.uploaderName }} · {{ videoCard.uploadTime }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: [
            'videoCard'
        ],
        methods: {
            goto_player(videoCard) {
                var videoId = videoCard.id
                this.$axios.get('/api/video/getVideoList?videoId=' + videoId)
                .then(
                    (resp) => {
                        localStorage.setItem('videoList', JSON.stringify(resp.data.data))
                        this.$store.state.videoList = resp.data.data
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            
                this.$router.push({
                    name: 'play',
                    query: {
                        vid: videoId,
                        p: this.$store.state.videoList.current,
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .card {
        width: 300px;
        height: 250px;
        border-radius: 10px;

        position: relative;
        z-index: 8;
    }
    .card:hover{
        cursor: pointer;
    }
    .card-img {
        width: 300px;
        height: 170px;
        border-radius: 10px;
        /* background-image: url('@/assets/2233.jpeg'); */
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        top: 0;
        left: 0;
    }
    .card-title {
        width: 300px;
        height: 35px;
        line-height: 35px;
        padding: 5px;
        box-sizing: border-box;
        color: #18191c;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        position: absolute;
        top: 170px;
        left: 0;
    }
    .card-title:hover, .card-author:hover {
        cursor: pointer;
        color: #00aeec;
    }
    .card-author {
        width: 300px;
        height: 30px;
        font-size: 13px;
        color: #9499a0;
        padding: 0 5px;
        box-sizing: border-box;

        position: absolute;
        top: 210px;
        left: 0;
    }
</style>