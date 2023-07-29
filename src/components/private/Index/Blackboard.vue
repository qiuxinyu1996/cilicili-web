<template>
    <div class="blackboard">
        <el-carousel :interval="3000" arrow="hover" height="500px" @click="alert('1')">
          <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <div @click="goto_player(img)" style="width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover;" :style=" {'background-image':`url(${img.cover})`}">
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
            var videoId = img.id
            this.$axios.get('/api/video/getVideoList?videoId=' + videoId)
            .then(
                (resp) => {
                    localStorage.setItem('videoList', JSON.stringify(resp.data.data))
                    this.$store.state.videoList = resp.data.data
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
          
            this.$router.push({
              name: 'play',
              query: {
                vid: videoId,
                p: this.$store.state.videoList.current,
              }
            })
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