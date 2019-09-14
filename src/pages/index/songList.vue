<template>
  <div id="songList">
    <div class="main" :style="isFixed == true ? 'position:fixed;bottom:0': ''">
      <!-- 标题 -->
      <div class="title">
        <i class="el-icon-back" @click="handleBack"></i>
        <div class="desc">
          <span class="name">歌单</span>
          <span class="t-1">编辑推荐:{{ singList.name }}</span>
        </div>
      </div>
      <!-- 图片加标识 -->
      <div class="specific">
        <!-- 左边图片 -->
        <div class="left">
          <img :src="singList.coverImgUrl" alt />
        </div>
        <!-- 右边歌单介绍 -->
        <div class="right">
          <h4 class="title">{{ singList.name }}</h4>
        </div>
      </div>
    </div>

    <!-- 歌单列表  -->
    <div class="list_Content">
      <div
        class="list_s2"
        v-for="(item,index) in list"
        :key="index"
        @click="handlePlaySong(item.id,index,item.name,item.ar[0].name)"
        :class="{ active:changeRed == index}"
      >
        <!-- 序号 -->
        <div class="number">{{ index+1 }}</div>
        <!-- 歌名+歌手 -->
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="singer">{{ item.ar[0].name }}</div>
        </div>
        <!-- 播放 -->
        <div class="right">
          <span class="playIcon">
            <i class="el-icon-caret-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      id: "",
      singList: "",
      song: [],
      list: [],
      songUrl: [],
      isFixed: false,
      currentUrl: "",
      changeRed: -1,
      musicList: []
    };
  },
  watch: {
    ...mapState({
      historyMusic: "historyMusic"
    })
  },
  mounted() {
    this.musicList = this.$store.state.historyMusic;
    const id = this.$route.params.id;
    this.id = id;
    // 1. 获取歌单详情
    this.$axios({
      url: "/playlist/detail",
      params: {
        id: id
      }
    }).then(res => {
      this.singList = res.data.playlist;
      res.data.privileges.map(v => {
        this.song.push(v.id);
      });
      // 2. 获取歌单具体信息和url
      this.$axios({
        url: "/song/detail",
        params: { ids: this.song.join(",") }
      }).then(res => {
        this.list = res.data.songs;
      });
    });
  },
  methods: {
    // 返回上一级
    handleBack() {
      this.$router.go(-1);
    },
    // 播放音乐
    handlePlaySong(id, index, singer, song) {
      this.$store.commit("songId", id); // 存储ID-> 方便进入歌曲播放详情页
      this.changeRed = index;
      // 获取对应获取音乐URL
      this.$axios({ url: "/song/url", params: { id: id } }).then(res => {
        // 赋值给audio
        this.currentUrl = res.data.data[0].url;
        // 存储当前播放的音乐
        this.$store.commit("playMusicInfo", {
          url: this.currentUrl,
          singer: singer,
          song: song
        });
       
        this.musicList.push({
          url: this.currentUrl,
          singer: singer,
          song: song
        });
        
        this.$store.commit("historyMusic", this.musicList);
      });
      // 获取信息
      this.$axios({url: "/song/detail",params: { ids: id }}).then(res => {
            this.$store.commit("audioStatus",{picUrl:res.data.songs[0].al.picUrl,isPlay:true})
      });
    }
  }
};
</script>

<style lang="less" scoped>
#songList {
  background: wheat;
  .main {
    padding: 10px 15px;
    .title {
      display: flex;
      i {
        font-size: 28px;
        color: #fff;
      }
      .desc {
        display: flex;
        flex-direction: column;
        padding-left: 20px;
        .name {
          font-size: 14px;
          color: #fff;
          text-align: left;
        }
        .t-1 {
          font-size: 10px;
          color: #fff;
        }
      }
    }
    .specific {
      margin-top: 20px;
      display: flex;
      .left {
        width: 150px;
        height: 150px;
        img {
          width: 150px;
          border-radius: 5px;
          height: 150px;
        }
      }
      .right {
        padding-left: 20px;
        .title {
          font-size: 16px;
          color: #fff;
        }
      }
    }
  }
  .list_Content {
    background: #fff;
    // padding-top: 250px;
    .list_s2 {
      display: flex;
      align-items: flex-start;
      padding: 10px 15px;
      .number {
        color: #999;
        font-size: 16px;
        width: 35px;
        line-height: 2;
      }
      .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: flex-start;
        padding-left: 20px;
        .name {
          color: #333;
          font-size: 14px;
          text-align: left;
        }
        .singer {
          color: #666;
          font-size: 10px;
        }
      }
      .right {
        width: 100px;
        padding-top: 9px;
        .playIcon {
          width: 66px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 20%;
          i {
            padding: 5px 5px;
            font-size: 12px;
            padding-top: 4px;
            color: #ccc;
          }
        }
      }
    }
  }
}
.active {
  background: rgba(0, 0, 0, 0.02);
}
</style>