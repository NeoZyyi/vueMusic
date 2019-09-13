<template>
  <div id="app">
    <router-view />
    <!-- 播放器组件 -->
    <Audio></Audio>
  </div>
</template>

<script>
import Audio from '@/components/audio'
export default {
  name: "app",
  components: {
    Audio
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: #fff;
}
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
}
html {
  box-sizing: border-box;
}
.clearfix {
  content: "";
  display: block;
  clear: both;
}
</style>
