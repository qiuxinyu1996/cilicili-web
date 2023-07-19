<template>
    <div class="blackboard">
        <el-carousel :interval="5000" arrow="hover" height="500px" @click="alert('1')">
          <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <div @click="goto_player(img)" style="width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover;" :style=" {'background-image':`url(${img.cover})`}">
              <!-- <h1>{{ img }}</h1> -->
            </div>
          </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: 'Blackboard',
        data() {
          return {
            // imgList: this.$store.state.imgList
          }
        },
        methods: {
          goto_player(img) {
            var player = {
              name: img.name,
              source: img.source,
              current: img.current,
              total: img.total,
            }
            localStorage.setItem('player', JSON.stringify(player))
            this.$store.commit('setPlayer',player)
            this.$router.push({name: 'play'})
          }
        },
        computed: {
          imgList() {
            return this.$store.state.imgList
          }
        },
    }
</script>

<style scoped>
    .blackboard{
      width: 600px;
      display: inline-block;
      border-radius: 10px;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

  .el-carousel__item:hover {
    cursor: pointer;
  } 
</style>