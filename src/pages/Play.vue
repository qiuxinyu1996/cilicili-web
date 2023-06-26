<template>
    <div class="play">
        <Header></Header>
        <Player></Player>
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

<style>

</style>