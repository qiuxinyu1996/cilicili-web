<template>
    <div class="play">
        <div class="header">
            <Header></Header>
        </div>
        <div class="player">
            <Player></Player>        
        </div>
    </div>
</template>

<script>
    import Header from '@/components/common/Header.vue';
    import Player from '@/components/private/Play/Player.vue';
    export default {
        name: 'Play',
        components: {
            Header,
            Player
        }
    }
</script>

<style scoped>
    .header{
        position: relative;
    }
</style>