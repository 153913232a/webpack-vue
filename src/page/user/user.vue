<template>
  <div class="user">
    <v-header ref="header">
      <div class="icon" flex="main:center cross:center" flex-box="0">
      </div>
      <h2 class="title" flex-box="1">个人中心</h2>
      <div class="icon" flex="main:center cross:center" flex-box="0" @click="loginout">
        <i class="iconfont icon-tuichu"></i>
      </div>
    </v-header>
    <transition class="slide">
      <div class="user-index" v-show="isShow">
        <div class="headimg" flex="dir:top main:center cross:center">
          <img class="user-headimg" flex="dir:top main:center cross:center" :src="$store.state.user.avatar_url"/>
          <div class="name">{{$store.state.user.loginname}}</div>
          <div class="score" flex="true">积分：{{this.userinfo.score || $store.state.user.score}}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册于：
          <v-time :time="this.userinfo.create_at ||$store.state.user.create_at"></v-time>
          </div>
        </div>
        <ul class="tab-nav" flex="box:mean">
          <li :class="{'on': id === index}" v-for="(item, id) in dataLi" @click="changeTab(id)">{{item.name}}</li>
        </ul>
        <ul class="list" v-show="index=== 0">
          <li v-for="item in $store.state.user.recent_topics" @click="loading">
            <router-link flex="box:last" :to="'/topic/' + item.id">
              <div class="tit">{{item.title}}</div>
              <v-time class="time" :time="item.last_reply_at"></v-time>
            </router-link>
          </li>
        </ul>
        <ul class="list" v-show="index=== 1">
          <li v-for="item in $store.state.user.recent_replies" @click="loading">
            <router-link flex="box:last" :to="'/topic/' + item.id">
              <div class="tit">{{item.title}}</div>
              <v-time class="time" :time="item.last_reply_at"></v-time>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getUserInfo} from "../../common/js/api";
  import VHeader from '../../components/header/v-header'
  import storage from 'good-storage'
  import VTime from "../../components/time/v-time";
  const USER = 'user'
  export default {
    name: "user",
    components: {VTime, VHeader},
    data() {
      return {
        isShow:false,
        index: 0,
        userinfo: {},
        dataLi: [
          {name: '主题'},{name: '回复'}
      ]
      }
    },
    created() {
      this.getUserInfo()
    },
    activated() {
      if (!this.$store.state.user.githubUsername) {
        this.getUserInfo()
      }
    },
    methods: {
      loading() {
        this.$store.commit('setShow', true)
      },
      async getUserInfo() {
        this.userinfo = await getUserInfo(`/${this.$store.state.user.loginname}`,{})
        let user = this.$store.state.user
        Object.assign(user, {}, {
          githubUsername: this.userinfo.githubUsername,
          score: this.userinfo.score,
          create_at: this.userinfo.create_at,
          recent_replies: this.userinfo.recent_replies,
          recent_topics: this.userinfo.recent_topics
        })
        this.$store.commit('setUser', user)
        storage.set(USER, user)
      },
      loginout() {
        let user = storage.get(USER)
        if (user.id) {
          storage.remove(USER)
          this.$store.commit('clearUser')
          this.$router.push({
            path: '/'
          })
        } else {
          return
        }
      },
      changeTab(index) {
        this.index = index
      }
    },
    activated() {
      this.isShow = true
      this.$store.commit('changeRouterIndex', 3)
      this.$refs.header.show() // 路由进来时显示header
    },
    deactivated() {
      this.isShow = false
      this.$refs.header.hide() // 离开时隐藏
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/page/user";
</style>