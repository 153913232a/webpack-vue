<template>
  <div class="user">
    <v-header ref="header">
      <div class="icon" flex="main:center cross:center" flex-box="0" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <h2 class="title" flex-box="1">个人中心</h2>
      <div class="icon" flex="main:center cross:center" flex-box="0">
      </div>
    </v-header>
    <transition class="slide">
      <div class="user-index" v-show="isShow">
        <div class="headimg" flex="dir:top main:center cross:center">
          <img class="user-headimg" flex="dir:top main:center cross:center" :src="userinfo.avatar_url"/>
          <div class="name">{{userinfo.loginname}}</div>
          <div class="score" flex="true">积分：{{userinfo.score}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册于：
            <v-time class="time" :time="userinfo.create_at"></v-time>
          </div>
        </div>
        <ul class="tab-nav" flex="box:mean">
          <li :class="{'on': id === index}" v-for="(item, id) in dataLi" @click="changeTab(id)">{{item.name}}</li>
        </ul>
        <ul class="list" v-show="index=== 0">
          <li v-for="item in userinfo.recent_topics" @click="loading">
            <router-link flex="box:last" :to="'/topic/' + item.id">
              <div class="tit">{{item.title}}</div>
              <v-time class="time" :time="item.last_reply_at"></v-time>
            </router-link>
          </li>
        </ul>
        <ul class="list" v-show="index=== 1">
          <li v-for="item in userinfo.recent_replies" @click="loading">
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
  import VTime from "../../components/time/v-time";
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
    activated() {
      if (JSON.stringify(this.userinfo) === '{}') {
        this.getUserInfo()
      }
      this.isShow = true
      this.$refs.header.show() // 路由进来时显示header
    },
    methods: {
      loading() {
        this.$store.commit('setShow', true)
      },
      async getUserInfo() {
        this.userinfo = await getUserInfo(`/${this.$route.params.id}`,{})
        console.log('time', this.userinfo)
      },
      back() {
        this.$router.back()
      },
      changeTab(index) {
        this.index = index
      }
    },
    deactivated() {
      this.isShow = false
      this.$refs.header.hide() // 离开时隐藏
    },
    watch: {
      userinfo(newValue,oldValue) { // 有数据了就停止加载
        if (JSON.stringify(newValue) !== '{}') {
          this.$nextTick(() => {
            this.$store.commit('setShow', false)
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/page/user";
</style>