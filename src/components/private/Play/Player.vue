<template>
    <div class="player">
        <Video :src="src" :second="1" />
    </div>
</template>

<script>
import Video from './Player/Video.vue';
    export default {
        name: 'Player',
        components: {
            Video
        },
        data() {
            return {
                src: ''
            }
        }
    }
</script>
    
<style>
    .player{
        width: 100%;
        height: 700px;
        background-color: pink;

        position: relative
    }
</style>