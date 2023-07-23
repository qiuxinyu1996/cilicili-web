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
                // src: require('@/assets/某科学的超电磁炮第一季-1.mp4')
            }
        },
        computed: {
            src() {
                if(JSON.stringify(this.$store.state.player) === '{}') {
                    console.log('refresh')
                    this.$store.state.player = JSON.parse(localStorage.getItem('player'))
                }
                console.log(localStorage.getItem('player'))
                return api + prefix + this.$store.state.player.source
            }
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