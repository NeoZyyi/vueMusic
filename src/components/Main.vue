<template>
  <div class="find">
    <!-- 推荐歌单 -->
    <div class="recomSongList">
      <div class="desc">
        <h5 class="title">推荐歌单</h5>
        <div class="moreList">歌单广场</div>
      </div>
      <!-- 内容 -->
      <div class="main">
           <div class="songList">
                <div class="list_s1" v-for="(item,index) in songList" :key="index" @click="handleSong(item.id)">
                    <img :src="item.picUrl" alt="">
                    <p>{{ item.name }}</p>
                </div>
                
           </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data(){
     return {
       songList:[]
     }
   },
   mounted(){
     // 获取推荐歌单
     this.$axios({url:'/personalized',params:{limit:30}}).then((res)=>{
         this.songList = res.data.result;
         console.log(res)
     })
   },
   methods:{
     handleSong(ids){
       this.$router.push({name:'SongList',params:{id:ids}})
     }
   }  
}
</script>
<style lang="less" scoped>
.title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  float: left;
  width: 100px;
  text-decoration: none;
  // text-align: left;
}
.moreList {
  border: 1px solid #ccc;
  float: right;
  font-size: 10px;
  width: 60px;
  border-radius: 10px;
  padding: 4px 5px;
}
.desc::after {
  content: "";
  display: block;
  clear: both;
}
.main {
  margin-top: 20px;
  .songList{
     display: flex;
     flex-wrap: wrap;
     justify-content: flex-start;
     align-content: flex-start;
     .list_s1 {
       margin-top: 10px;
       width: 33.3%;
       img {
         width: 100px;
         height: 100px;
         border-radius: 5px;
       }
       p{
         padding: 5px 4px;
       }
     }
  }
}
</style>