<template>
  <div id="historyMusic" @click="handleClose" ref="close">
      <div class="content">
           <div class="item">
                <div class="title">
                   <span class="t-for">列表循环</span>                   
                </div>
                <ul class="musicList">
                  <li v-for="(item,index) in historyMusic" :key="index" class="list-s1" @click="handlePlays(index,item.url,item.singer,item.song)">
                      <span class="song">{{ item.singer }}</span>
                      -
                      <span class="singer">{{ item.song }} </span>
                      <audio :src="item.url"></audio>
                  </li>
                </ul>
           </div>
      </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
   data() {
       return {
         listMusic:[]
       }
   },
   methods:{
      handleClose() {
           this.$refs.close.style.display = 'none'
      },
      handlePlays(id,url,singer,song) {
          this.$emit('historyMusicUrl',{url:url,singer:singer,song:song})
      }
   },
   computed:{
     ...mapState({
         historyMusic:'historyMusic'
     })
   }
}
</script>
<style lang="less" scoped>
  #historyMusic {
    background: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    width: 100%;
    .content {
       position: fixed;
       bottom: 0;
       width: 100%;
       background: #fff;
       height: 50%;
       border-top-left-radius: 20px;
       border-top-right-radius: 20px;
       .item {
         padding: 0 10px;
         overflow: hidden;
         height: 100%;
         .title {
           height: 40px;
           line-height: 40px;
           text-align: left;
           border-bottom: 1px solid #ccc;
            
         }
         .musicList {
           height: inherit;
          overflow: auto;
            .list-s1 {
              line-height: 40px;
              text-align: left;
              .song {
                font-size: 13px;
              }
            }
         }
       }
    }
  }
</style>