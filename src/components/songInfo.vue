<template>
  <div class="songInfo">
    <div class="header">
      <!-- back -->
      <i class="el-icon-back" @click="handleBack"></i>
      <h5>正在播放</h5>
    </div>

    <!-- 默认展示Main -->
    <div class="main">
      <!-- 图片 -->
      <div class="avatar">
        <img :src="audioStatus.picUrl" alt />
      </div>
      <!-- 歌名 -->
      <div class="songName">{{ info.singer }}</div>
      <!-- 歌手 -->
      <div class="singer">{{ info.song }}</div>
    </div>

    <!-- 歌词 -->
    <div class="lrc"></div>

    <!-- 进度条 -->
    <el-row class="process">
      <!-- 播放时长 -->
      <el-col class="currentPlayTime">{{ playTimes.playTime }}</el-col>
      <!-- 进度条 -->
      <el-row class="line">
        <el-col class="lines"></el-col>
        <el-col class="btns" :style="{left:playTimes.percent + '%'}"></el-col>
      </el-row>

      <!-- 歌曲时长 -->
      <div class="songAllTime">{{ playTimes.allTime }}</div>
      <!-- 进度点 -->
    </el-row>

    <!-- 上一首 播放 下一首 喜欢 -->
    <el-row class="footer">
      <div class="like"></div>
      <div class="prev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div :span="3" class="playing" @click="handlePlay">
        <i class="el-icon-video-play" v-if="!audioStatus.isPlay"></i>
        <i class="el-icon-video-pause" v-if="audioStatus.isPlay"></i>
      </div>

      <div class="next">
        <i class="el-icon-arrow-right"></i>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      picUrl: "",
      playLong: ""
    };
  },
  computed: {
    ...mapState({
      info: "playMusicInfo", // 歌曲信息
      playTimes: "playTime", // 播放时长
      audioStatus: "audioStatus"
    })
  },
  mounted() {
    // 获取歌曲详情 图片
    const songId = this.$route.params.id;
    this.$axios({
      url: "/song/detail",
      params: { ids: songId }
    }).then(res => {
      console.log(res);
      this.picUrl = res.data.songs[0].al.picUrl;
    });
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handlePlay() {
      this.$store.state.audioStatus.isPlay = !this.$store.state.audioStatus.isPlay;
      let myAudio = document.getElementById("audio");
    }
  }
};
</script>

<style lang="less" scoped>
.songInfo {
  background: silver;
  height: 100%;
}
.header {
  height: 50px;
  display: flex;
  padding: 10px 25px 0 25px;
  color: #fff;
  i {
    font-size: 24px;
  }
  h5 {
    line-height: 1.8;
    font-size: 15px;
    padding-left: 5px;
  }
}
.main {
  // padding-bottom: 10.5rem;
  .avatar {
    padding: 0 25px 0 25px;
    margin-bottom: 2.5rem;
    img {
      width: 322px;
      height: 322px;
      border-radius: 5px;
    }
  }
  .songName {
    font-size: 14px;
    color: tomato;
  }
  .singer {
    color: slategrey;
    font-size: 13px;
    padding-top: 10px;
  }
}
.process {
  position: fixed;
  width: 100%;
  bottom: 90px;
  padding: 0 25px;
  display: flex;
  justify-content: flex-start;
  .currentPlayTime {
    color: #fff;
    font-size: 12px;
    width: 50px;
  }
  .line {
    position: relative;
    flex: 1;
    .lines {
      width: 100%;
      height: 2px;
      background: #ccc;
      position: absolute;
      top: 7px;
      left: 0;
    }
    .btns {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      left: 0;
      top: 4px;
    }
  }
  .songAllTime {
    width: 50px;
  }
}
.footer {
  position: fixed;
  bottom: 20px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  .prev {
    // left: 30%;
  }
  .playing {
    // left: 50%;
    margin: 0 25px;
  }
  i {
    font-size: 28px;
    color: #fff;
  }
}
</style>