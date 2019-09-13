<template>
  <el-row :gutter="20" id="header">
  <el-col :span="3" class="left">
      <i class="el-icon-menu"></i>
  </el-col>
  <el-col :span="18">
      占位
  </el-col>
  <el-col :span="2" class="right">
      <i class="el-icon-search"></i>
  </el-col>
 
</el-row>
  
</template>


<style lang="less" scoped>
#header {
  height: 100%;
  padding: 10px;
  .left {
      padding-left: 0;
      i {
          font-size: 20px;
      }
  }
  .right {
      i{
          font-size: 18px;
      }
  }
}
</style>