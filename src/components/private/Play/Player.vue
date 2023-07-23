<template>
    <div class="player">
        <div class="video">
            <Video :src="src"/>
        </div>
        <div class="numberList">
            <NumberList></NumberList>
        </div>
        <div class="review-wrapper">
            <Reviews></Reviews>
        </div>
        <div class="player-other">
            <div class="card" v-for="item in 3">
                <Card></Card>
            </div>
        </div>
        <div class="player-help">

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
                // src: api + prefix + this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].source
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
            
            var videoId = this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].id
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
        /* height: 700px; */
        background-color: #ffffff;

        position: relative
    }
    .review-wrapper {
        width: 1200px;
        position: absolute;
        top: 700px;
        left: 20px;
    }
    .player-other {
        width: 300px;
        height: 600px;

        position: absolute;
        display: flex;
        flex-wrap: wrap;

        top: 710px;
        left: 1240px;
    }
    .video {
        width: 1200px;
        height: 670px;

        position: absolute;
        top: 20px;
        left: 20px;
    }
    .numberList {
        width: 400px;
        height: 670px;

        position: absolute;
        top: 20px;
        left: 1230px;
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
</style>