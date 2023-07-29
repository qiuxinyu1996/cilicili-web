<template>
    <div class="index">
        <Header></Header>
        <Catalog></Catalog>
        <div class="blackboard-wrapper">
            <Blackboard></Blackboard>
        </div>
        <div class="cards">
            <div class="card" v-for="(videoCard, index) in this.$store.state.videoCards" :key="index">
                <Card :videoCard="videoCard"></Card>
            </div>
        </div>
    </div>
</template>

<script>
    import axios  from 'axios';
    import Header from '@/components/common/Header.vue';
    import Catalog from '@/components/private/Index/Catalog.vue';
    import Blackboard from '@/components/private/Index/Blackboard.vue';
    import Card from '@/components/common/Card.vue';
    export default {
        name: 'Index' ,
        components: {
            Header,
            Catalog,
            Blackboard,
            Card
        },
        mounted() {
            // 获取首页轮播图
            axios.get('/api/config/getCarouselFigure')
            .then(
                (resp) => {
                    if(resp.data.success) {
                        console.log(resp.data.data)
                        var carouselFigure =  resp.data.data
                        carouselFigure.sort((a, b) => {
                            return a.index - b.index
                        })
                        this.$store.commit('setImgList', carouselFigure)
                    }else {
                        this.$message.error('获取首页轮播图失败')
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                    this.$message.error('获取首页轮播图失败')
                }
            )
            // 获取首页视频封面
            axios.get('/api/config/getVideoCards')
            .then(
                (resp) => {
                    if(resp.data.success) {
                        console.log(resp.data.data)
                        var videoCards = resp.data.data
                        // 排除轮播图占据的4个位置
                        videoCards.splice(0, 0, {}, {})
                        videoCards.splice(4, 0, {}, {})
                        this.$store.commit('setVideoCards', resp.data.data)
                    }else {
                        this.$message.error('获取首页视频失败')
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                    this.$message.error('获取首页视频失败')
                }
            )
        }
    }
</script>

<style scoped>
    .cards{
        width: 1300px;
        height: 500px;

        display: flex;
        flex-wrap: wrap;
        position: relative;
        top: 15px;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .card {
        width: 300px;
        height: 250px;

        margin: 10px;
    }
    .blackboard-wrapper{
        width: 620px;
        height: 520px;
        overflow: auto;

        top: 280px;
        left: 50%;
        transform: translate(calc(-50% - 320px), 0);
        position: absolute;
        z-index: 9;

        background-color: white;
    }
</style>