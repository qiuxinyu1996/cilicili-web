<template>
    <div class="player">
        <div class="video-title">
            <h1>{{ this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].title }}</h1>
        </div>
        <div class="video">
            <Video :src="src"/>
        </div>
        <div class="up-info">
           
        </div>
        <div class="number-list-wrapper">
            <NumberList></NumberList>
        </div>
        <div class="reviews-wrapper">
            <Reviews></Reviews>
        </div>
        <div class="play-cards">
            <div class="card" v-for="item in 3">
                <Card></Card>
            </div>
        </div>
    </div>
</template>

<script>
    import Video from './Player/Video.vue';
    import NumberList from './Player/NumberList.vue';
    import Reviews from '@/components/common/Reviews.vue';
    import Card from '@/components/common/Card.vue'
    export default {
        name: 'Player',
        components: {
            Video,
            NumberList,
            Reviews,
            Card
        },
        data() {
            return {
    
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
            this.$store.state.videoList = JSON.parse(localStorage.getItem('videoList'))
            console.log('+++++++++++++++++++++++++++++++++++')
            console.log(this.$router.currentRoute.query.vid)
            var videoId = this.$router.currentRoute.query.vid
            this.$axios.get('/api/video/getDetailList?videoId=' + videoId)
            .then(
                (resp) => {
                    console.log('this is getDetailList')
                    localStorage.setItem('videoList', JSON.stringify(resp.data.data))
                    this.$store.state.videoList = resp.data.data
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )

            // // 在页面加载时读取sessionStorage
            // if (sessionStorage.getItem('store')) {
            //    this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
            // }
            // // 在页面刷新时将store保存到sessionStorage里
            // window.addEventListener('beforeunload', () => {
            //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
            // })
            

            this.$watch(() => this.$route.params,
                (toParams, previousParams) => {
                    console.log('对路由变化做出响应...')

                    // 更新视频源
                    var videoList = this.$store.state.videoList
                    this.src = api + prefix + videoList.listDetail[videoList.current-1].source
                    document.getElementById('videoRef').load()

                    // 获取评论区信息
                    // setTimeout(() => {
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
                    // }, 100);

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
        height: 1000px;
        /* background-color: blue; */
        position: relative;
        display: inline-block;
        top: -300px;
        left: -270px;
        overflow: visible;
    }
    .play-cards {
        width: 350px;
        height: 500px;

        position: relative;
        display: inline-block;
        flex-wrap: wrap;

        top: -1190px;
        left: 1220px;
    }
    .video {
        width: 1100px;
        height: 620px;

        position: relative;
        display: inline-block;
        top: 0;
        left: 80px;
    }
    .number-list-wrapper {
        width: 350px;
        height: 400px;

        position: relative;
        display: inline-block;
        /* top: -1320px;
        left: 1220px; */
        left: 1220px;
        top: -620px;
    }
    .card {
        width: 300px;
        height: 250px;
    }
    .player-help {
        width: 60px;
        height: 400px;
        border-radius: 20px;
        background-color: aquamarine;

        position: fixed;
        left: 1560px;
        top: 520px;
    }
    .video-title {
        width: 1100px;
        height: 100px;
        line-height: 100px;
        /* background-color: red; */
        position: relative;
        display: inline-block;
        left: 80px;
    }
    .up-info {
        width: 350px;
        height: 100px;
        /* background-color: gold; */
        position: relative;
        display: inline-block;

        top: -700px;
        left: 120px;
    }
</style>