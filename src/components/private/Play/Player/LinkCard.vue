<template>
    <div class="linkCard">
        <div class="linkCard-cover" @click="goto_player(linkCard)" :style="{'background-image':`url(${linkCard.cover})`}"></div>
        <div class="linkCard-title" @click="goto_player(linkCard)">
            {{ linkCard.title }}
        </div>
        <div class="linkCard-uploader">
            {{ linkCard.uploaderName }}
        </div>
        <div class="linkCard-upload-time">
            {{ linkCard.uploadTime }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LinkCard',
        props: [
            'linkCard'
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
                setTimeout(() => {
                    this.$router.push({
                        name: 'play',
                        query: {
                            vid: videoId,
                            p: this.$store.state.videoList.current,
                        }
                    })
                }, 500);
            }
        }
    }
</script>

<style scoped>
    .linkCard {
        width: 350px;
        height: 100px;
        background-color: #f1f2f3;
        border-radius: 10px;
        margin: 10px 0;

        position: relative;
    }
    .linkCard-cover {
        width: 180px;
        height: 100px;
        border-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        left: 0;
    }
    .linkCard-title {
        width: 170px;
        height: 50px;
        font-size: 15px;
        color: #18191c;
        padding: 8px 8px;
        box-sizing: border-box;
        
        position: absolute;
        left: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .linkCard-uploader {
        width: 170px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: #9499a0;
        
        position: absolute;
        left: 180px;
        top: 50px;
        padding: 0 6px;
    }
    .linkCard-upload-time {
        width: 170px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: #9499a0;
        
        position: absolute;
        left: 180px;
        top: 75px;
        padding: 0 6px;
    }
    .linkCard-cover:hover,.linkCard-title:hover,.linkCard-uploader:hover {
        cursor: pointer;
        color: #00aeec;
    }
</style>