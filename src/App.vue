<template>
  <div id="app">
    <router-view name="main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    min-width: 1280px;
    max-width: 1920px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
