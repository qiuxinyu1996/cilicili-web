import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //数据，相当于data
  state: {
    user: {

    },
    imgList: {

    },
    player: {

    }
  },
  getters: {
    
  },
  //里面定义方法，操作state方法
  mutations: {
    setUser(state, user) {
        state.user = user
    },
    setImgList(state, imgList) {
      state.imgList = imgList
    },
    setPlayer(state, player) {
      state.player = player
    }
  },
  // 操作异步操作mutation
  actions: {
    
  },
  modules: {
    
  },
})