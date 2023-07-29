<template>
    <div class="player">
        <div class="video-title">
            <h2>{{ this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].title }}</h2>       
        </div>
        <div class="video">
            <Video :src="src"></Video>
        </div>
        <div class="up-info">
           <h2>
                UID:{{ this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].uploaderId }}
           </h2>
        </div>
        <div class="number-list-wrapper">
            <NumberList></NumberList>
        </div>
        <div class="reviews-wrapper">
            <Reviews></Reviews>
        </div>
        <div class="play-cards">
            <div v-for="(linkCard, index) in linkCards" :key="index">
                <LinkCard :linkCard="linkCard"></LinkCard>
            </div>
        </div>
    </div>
</template>

<script>
    import Video from './Player/Video.vue';
    import NumberList from './Player/NumberList.vue';
    import Reviews from '@/components/common/Reviews.vue';
    import LinkCard from '@/components/private/Play/Player/LinkCard.vue'
    export default {
        name: 'Player',
        components: {
            Video,
            NumberList,
            Reviews,
            LinkCard
        },
        data() {
            return {
                linkCards: []
            }
        },
        computed: {
            src: {
                get() {
                    return api + prefix + this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].source 
                },
                set() {

                }
            }
        },
        created() {
            // 获取合集信息
            this.$store.state.videoList = JSON.parse(localStorage.getItem('videoList'))
            var videoId = this.$router.currentRoute.query.vid
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
            // 获取相关视频信息
            this.$axios.get('/api/video/getLinkCards')
            .then(
                (resp) => {
                    console.log(resp.data.data)
                    this.linkCards = resp.data.data
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
            
            // 添加路由监听器
            this.$watch(() => this.$route.params,
                (toParams, previousParams) => {
                    console.log('对路由变化做出响应...')

                    // 更新视频源
                    var videoList = this.$store.state.videoList
                    this.src = api + prefix + videoList.listDetail[videoList.current-1].source
                    document.getElementById('videoRef').load()

                    // 获取评论区信息
                    this.$axios.get('/api/video/getReview?videoId=' + videoList.listDetail[videoList.current-1].id)
                    .then(
                        (resp) => {
                            this.$store.commit('setReviewList', resp.data.data)
                        }
                    ).catch(
                        (err) => {
                            console.log(err)
                        }
                    ) 
                }
            )
        }
    }
</script>
    
<style scoped>
    .player{
        width: 100%;
        height: 100%;
        background-color: #ffffff;

        position: relative
    }
    .reviews-wrapper {
        width: 1100px;
        position: absolute;
        top: 730px;
        left: 50%;
        transform: translate(calc(-50% - 190px), 0);
    }
    .play-cards {
        width: 350px;
        height: 800px;

        position: absolute;

        top: 450px;
        left: 50%;
        transform: translate(calc(-50% + 580px), 0);
    }
    .video {
        width: 1100px;
        height: 620px;

        position: absolute;
        top: 100px;
        left: 50%;
        transform: translate(calc(-50% - 190px), 0);
    }
    .number-list-wrapper {
        width: 350px;
        height: 320px;

        position: absolute;
        top: 100px;
        left: 50%;
        transform: translate(calc(-50% + 580px), 0);
    }
    .card {
        width: 300px;
        height: 250px;
    }
    .video-title {
        width: 1100px;
        height: 100px;
        line-height: 100px;
        position: absolute;
        left: 50%;
        transform: translate(calc(-50% - 190px), 0);

    }
    .up-info {
        width: 350px;
        height: 100px;
        line-height: 100px;
        /* background-color: gold; */
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(calc(-50% + 580px), 0);
    }
</style>