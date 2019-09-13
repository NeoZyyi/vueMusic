<template>
<el-container>
    <!-- 头部 -->
  <el-header>
         <Header></Header>
  </el-header>
  <!-- 内容区域 -->
  <el-main>
       <Main></Main>
       <router-view></router-view>
  </el-main>
  <!-- 播放器 -->

</el-container>
</template>

<script>
import Header from '@/components/header'
import Main from '@/components/Main'
export default {
    components:{
        Header,
        Main
    }
}
</script>

<style lang="less" scoped>
.el-header {
    height: 50px !important;
    // padding: 0 !important;
}
.el-footer{
    padding: 0 !important;
    height: 50px !important;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.el-main {
    padding-left: 10px !important;
    padding-bottom: 60px;
}
</style>
