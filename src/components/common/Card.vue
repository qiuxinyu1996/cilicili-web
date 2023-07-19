<template>
    <div class="card">
        <div class="card-img"></div>
        <div class="card-title">
            12杆极限准度破局，特鲁姆普用准度捍卫准神称号，绝对视觉盛宴
        </div>
        <div class="card-author">
            观复体育文化 · 6-24
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
    }
</script>

<style scoped>
    .card {
        width: 300px;
        height: 250px;
        /* background-color: whitesmoke; */
        border-radius: 10px;

        position: absolute;
        z-index: 8;
        /* top: 50%;
        left: 50%;
        transform: translate(calc(-50% + 300px), -50%); */
    }
    .card:hover{
        cursor: pointer;
    }
    .card-img {
        width: 300px;
        height: 170px;
        border-radius: 10px;
        background-image: url('@/assets/2233.jpeg');
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        top: 0;
        left: 0;
    }
    .card-title {
        width: 300px;
        height: 50px;
        padding: 5px;
        box-sizing: border-box;
        color: #18191c;
        font-size: 15px;

        position: absolute;
        top: 170px;
        left: 0;
    }
    .card-title:hover, .card-author:hover {
        cursor: pointer;
        color: #00aeec;
    }
    .card-author {
        width: 300px;
        height: 30px;
        font-size: 13px;
        color: #9499a0;
        padding: 0 5px;
        box-sizing: border-box;

        position: absolute;
        top: 220px;
        left: 0;
    }
</style>