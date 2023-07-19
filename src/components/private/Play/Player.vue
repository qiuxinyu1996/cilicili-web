<template>
    <div class="player">
        <Video :src="src"/>
        <NumberList total="24" current="1"></NumberList>
    </div>
</template>

<script>
    import Video from './Player/Video.vue';
    import NumberList from './Player/NumberList.vue';
    export default {
        name: 'Player',
        components: {
            Video,
            NumberList
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
    
<style>
    .player{
        width: 100%;
        height: 700px;
        background-color: #ffffff;

        position: relative
    }
</style>