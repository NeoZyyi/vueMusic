import Vue from 'vue'
import vueRouter from 'vue-router'
import Index from './pages/index/index.vue'
import SongList from './pages/index/songList.vue'
// import Header from './components/header.vue'
Vue.use(vueRouter)

export default new vueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path:'/index',
            name:'Index',
            component:Index,
        },
        {
            path:"/songList/:id",
            name:'SongList',
            component:SongList
        }
      
    ]
})