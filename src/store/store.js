import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state:{
       // 存储当前播放的音乐信息
       playMusicInfo:{
          url:"",
          singer:"",
          song:""
       },
       // 存储历史播放记录
       historyMusic:{
          historyMusic:[]
       }
   },
      // 同步修改state中的值
   mutations: {
      // 当前播放信息
      setCurrentMusic(state,obj) {
          state.playMusicInfo = obj;
      },
      // 历史播放记录
      historyMusic(state,listMusic) {
          state.historyMusic = listMusic
      }
   }
})