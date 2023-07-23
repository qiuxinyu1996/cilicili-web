<template>
    <div class="m-video" :class="{'u-video-hover': !hidden}" :style="`width: ${width}px; height: ${height}px;`">
      <video
        ref="videoRef"
        :style="`object-fit: ${zoom};`"
        :src="src"
        :poster="veoPoster"
        :width="width"
        :height="height"
        :autoplay="autoplay"
        :controls="!originPlay&&controls"
        :loop="loop"
        :muted="autoplay || muted"
        :preload="preload"
        crossorigin="anonymous"
        @loadeddata="poster ? () => false : getPoster()"
        @pause="showPlay ? onPause() : () => false"
        @playing="showPlay ? onPlaying() : () => false"
        @click.prevent.once="onPlay"
        v-bind="$attrs">
        您的浏览器不支持video标签。
      </video>
      <svg v-show="originPlay || showPlay" class="u-play" :class="{'hidden': hidden}" :style="`width: ${playWidth}px; height: ${playWidth}px;`" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 12L9.75 8.75V15.25L15.25 12Z"></path>
      </svg>
    </div>
  </template>
  <script>
  export default {
    name: 'Video',
    props: {
      src: { 
        type: String,
        required: true,
        default: ''
      },
      poster: { 
        type: String,
        default: ''
      },
      second: { 
        type: Number,
        default: 2
      },
      width: { 
        type: Number,
        default: 1200
      },
      height: { 
        type: Number,
        default: 670
      },
      autoplay: { 
        type: Boolean,
        default: false
      },
      controls: { 
        type: Boolean,
        default: true
      },
      loop: { 
        type: Boolean,
        default: false
      },
      muted: { 
        type: Boolean,
        default: false
      },
      preload: { 
        type: String,
        default: 'auto' 
      },
      showPlay: { 
        type: Boolean,
        default: true
      },
      playWidth: { 
        type: Number,
        default: 96
      },
      zoom: { 
        type: String,
        default: 'contain' 
      }
    },
    data () {
      return {
        veoPoster: this.poster,
        originPlay: true,
        hidden: false
      }
    },
    mounted () {
      // 禁用右键菜单
      // document.oncontextmenu = function(){
      //   return false;
      // }
      if (this.autoplay) {
        this.hidden = true
        this.originPlay = false
      }
    },
    methods: {
      getPoster () { 
        this.$refs.videoRef.currentTime = this.second
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = this.$refs.videoRef.videoWidth
        canvas.height = this.$refs.videoRef.videoHeight
        ctx.drawImage(this.$refs.videoRef, 0, 0, canvas.width, canvas.height)
        this.veoPoster = canvas.toDataURL('image/png')
      },
      onPlay () {
        console.log('onplay')
        if (this.originPlay) {
          this.$refs.videoRef.currentTime = 0
          this.originPlay = false
        }
        if (this.autoplay) {
          this.$refs.videoRef.pause()
          console.log('pause')
        } else {
          this.hidden = true
          this.$refs.videoRef.play()
          console.log('play')
        }
      },
      onPause () {
        this.hidden = false
        console.log('onPause')
      },
      onPlaying () {
        this.hidden = true
        console.log('onPlaying')
      },
    }
  }
  </script>
  <style lang="less" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .m-video {
    display: inline-block;
    position: relative;
    background: #000;
    cursor: pointer;
    .u-play {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      fill: none;
      color: #FFF;
      pointer-events: none;
      opacity: 0.7;
      transition: opacity .3s;
      path {
        stroke: #FFF;
      }
    }
    .hidden {
      opacity: 0;
    }
  }
  .u-video-hover {
    &:hover {
      .u-play {
        opacity: 0.9;
      }
    }
  }
  // .m-video{
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(calc(-50% - 200px), -50%);
  // }
  </style>