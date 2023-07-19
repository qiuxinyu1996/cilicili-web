<template>
    <div class="index">
        <Header></Header>
        <Catalog></Catalog>
        <div class="blackboard-wrapper">
            <Blackboard></Blackboard>
        </div>
        <div class="cards">
            <div class="card" v-for="item in 20">
                <Card></Card>
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
            axios.get('/api/config/getImgList')
            .then(
                (resp) => {
                    if(resp.data.success) {
                        console.log(resp.data.data)
                        this.$store.commit('setImgList', resp.data.data)
                    }else {
                        this.$message.error('获取服务器配置失败')
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                    this.$message.error('获取服务器配置失败')
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
        top: 0;
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