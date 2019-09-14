import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 存储当前播放的音乐信息
    playMusicInfo: {
      url: "",
      singer: "",
      song: ""
    },
    // 存储历史播放记录
    historyMusic: {
      historyMusic: [],
    },
    // 歌曲ID
    songId: {
       songId:""
    },
    // 播放时长和总时长
    playTime:{
       playTime:"",
       allTime:"",
       percent:"",
    },
    // audio 头像和播放按钮的状态
    audioStatus:{
       picUrl:"",
       isPlay:null
    }
  },
  // 同步修改state中的值
  mutations: {
    // 当前播放信息
    playMusicInfo(state, obj) {
      state.playMusicInfo = obj;
    },
    // 历史播放记录
    historyMusic(state, listMusic) {
      // 去重 筛选一样的数据 避免重复添加
      let obj = {};
      state.historyMusic = listMusic;
      state.historyMusic = state.historyMusic.reduceRight((item, next) => {
         obj[next.url] ? "" : (obj[next.url] = true && item.push(next));
        return item;
      }, []);  
    },
    // 歌曲ID
    songId(state,id) {
       state.songId = id
    },
    // 音乐播放时长
    playTime(state,time){
       state.playTime = time
    },
    audioStatus(state,status) {
       state.audioStatus = status;
    }
  }
});
