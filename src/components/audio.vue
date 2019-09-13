<template>
  <!-- 1.播放器组件 -->
  <el-row :gutter="20" id="audio">
    <!--2.歌曲头像  -->
    <el-col :span="3" class="left">
      <div class="avatar">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820523987,3798556096&fm=26&gp=0.jpg"
          alt
        />
      </div>
    </el-col>
    <!-- 歌描述 -->
    <div @click="handleToInfo(songId)" class="abc">
      <el-col :span="15" class="desc">
        <div class="songname">{{ playMusicInfo.singer }}</div>
        <div class="singer">{{ playMusicInfo.song }}</div>
      </el-col>
    </div>
    <!-- 播放和列表 -->
    <el-col :span="5" class="right">
      <div class="play" @click="handlePlay">
        <i class="el-icon-video-play" v-if="!isPlaying"></i>
        <i class="el-icon-video-pause" v-if="isPlaying"></i>
        <audio id="audio" :src="playMusicInfo.url" autoplay  ref="myAudio" @timeupdate="updateTime" @ended="onEnded"></audio>
      </div>
      <div class="list">
        <i class="el-icon-folder-checked" @click="handleShowHistory"></i>
        <historyMusic v-if="isShow" @historyMusicUrl="historyMusicUrl"></historyMusic>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";

// 引入播放历史组件
import historyMusic from "@/components/historyMusic";

export default {
  components: {
    historyMusic
  },
  data() {
    return {
      isPlaying: false, // 按钮播放状态
      musicUrl: "", // 音乐Url
      singer: "", // 歌手
      song: "", // 歌名
      isShow: false, // 播放历史默认隐藏
      currentTime:'', //当前播放进度
      allTime:''
    };
  },
  computed: {
    ...mapState({
      // key的值自己定义的属性，在页面根据这个值来渲染
      // “playMusicInfo”是vuex中定义的属性
      playMusicInfo: "playMusicInfo",
      songId: "songId",
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数 把值return出去
      setMusic() {
        return playMusicInfo;
      }
    })
 
  },
  methods: {
    handlePlay(e) {
      // 播放状态按钮切换
      this.isPlaying = !this.isPlaying;
      // 播放和暂停
      if (this.isPlaying) {
        this.$refs.myAudio.play();
      } else {
        this.$refs.myAudio.pause();
      }
    },
    handleShowHistory() {
      this.isShow = !this.isShow;
    },
    //  歌单播放
    historyMusicUrl(historyMusicUrl) {
      console.log(historyMusicUrl);
      this.$store.commit("playMusicInfo", historyMusicUrl);
      this.$refs.myAudio.play();
      this.isPlaying = !this.isPlaying;
    },
    // 跳转歌曲播放详情页
    handleToInfo(songId) {
      console.log(songId);
      this.$router.push({ name: "SongInfo", params: { id: songId } });
    },
    // 当前音乐播放时长
    updateTime(e) {
       let that = this;
       let count = 0;
       this.currentTime = that.utils.format(e.target.currentTime)
       this.allTime = that.utils.format(this.$refs.myAudio.duration)
       let percent = (e.target.currentTime / e.target.duration) * 100
       this.$store.commit("playTime",{playTime:this.currentTime,allTime:this.allTime,percent:percent})
    },
    onEnded(){
   
      let arrList = this.$store.state.historyMusic;
      let now  = this.$store.state.playMusicInfo;
      for(let i=0;i<arrList.length;i++) {
          if(arrList[i].singer === now.singer) {
           
             const { song,singer,url} = arrList[i+1]
             this.$store.commit("playMusicInfo",{url:url,singer:singer,song:song})  
          }
          // return news
      }
      // console.log(news);
    }
  }
};
</script>
 
<style lang="less" scoped>
#audio {
  // height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-top: 0.5px solid #ccc;
  background: #fff;
  margin: 0 !important;
  display: flex;
  justify-content: flex-start;
  .left {
    width: 50px;
    .avatar {
      width: 40px;
      height: 40px;
      padding: 5px 5px 0 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .desc {
    text-align: left;
    padding-top: 8px;
    margin-left: 10px;
    width: 100%;
    div {
      color: #333;
    }
    .singer {
      padding-top: 2px;
    }
  }
  .right {
    display: flex;
    padding-top: 14px;
    padding-left: 30px;
    width: 100px;
    i {
      font-size: 24px;
    }
    .list {
      padding-left: 20px;
    }
  }
}
.abc {
  flex: 1;
}
</style>

