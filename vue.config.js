const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8080, //设置项目端口号这是vue项目端口
    proxy: {
          '/api': { //正则匹配到以这个开头的时候 就用代理
            target: "http://localhost:8081",// 指向的是目标服务器
            changOrigin: true,  //允许跨域
          },
          '/image': {
            target: "http://localhost:8081",// 指向的是目标服务器
            changOrigin: true,  //允许跨域
          }
      }
  }
})
