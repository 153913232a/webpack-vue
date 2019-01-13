<template>
  <div class="message">
    <v-header ref="header">
      <div class="icon" flex="main:center cross:center" flex-box="0">
      </div>
      <h2 class="title" flex-box="1">我的消息</h2>
      <div class="icon" flex="main:center cross:center" flex-box="0">
        <i class="iconfont icon-xiaoxi"></i>
      </div>
    </v-header>
    <transition name="slide">
      <div class="tip-msg-signin" v-show="!this.$store.state.user.id && isShow">
        你还未登录,请先<router-link to="/sigin">登录</router-link>
      </div>
    </transition>
    <transition name="slide">
      <div class="msg-box" v-show="this.$store.state.user.accessToken && isShow">
        <ul class="list">
          <li v-for="(message, index) in hasnot_read_messages" flex="box:first" @click="loading">
            <div class="user" @click="pushToUsero(message.author.loginname)">
              <img class="user-headimg" v-lazy="message.author.avatar_url"/>
            </div>
            <div>
              <div class="name">{{message.author.loginname}}
                <v-time class="time" :time="message.topic.last_reply_at"></v-time>
              </div>
              <div flex="box:first">
                <div flex="cross:center">
                  <div class="dian-false" v-show="!message.has_read" @click.stop="read(message)"></div>
                </div>
                <div>回复你的话题<router-link :to="'/topic/' + message.topic.id">{{message.topic.title}}</router-link></div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="list">
          <li v-for="(message, index) in has_read_messages" flex="box:first">
            <div class="user" @click="pushToUsero(message.author.loginname)">
              <img class="user-headimg" v-lazy="message.author.avatar_url"/>
            </div>
            <div>
              <div class="name">{{message.author.loginname}}
                <v-time class="time" :time="message.topic.last_reply_at"></v-time>
              </div>
              <div flex="box:first">
                <div flex="cross:center">
                </div>
                <div>回复你的话题<router-link :to="'/topic/' + message.topic.id">{{message.topic.title}}</router-link></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getMessage, markOneMessage} from "../../common/js/api";
  import VHeader from '../../components/header/v-header'
  import VTime from '../../components/time/v-time'
  export default {
    name: "message",
    components:{VHeader, VTime},
    data() {
      return{
        isShow: false,
        replies: {},
        has_read_messages: [],
        hasnot_read_messages: []
      }
    },
    activated() {
      this.isShow = true
      this.$refs.header.show() // 路由进来时显示header
      this.$store.commit('changeRouterIndex', 2)
      if (JSON.stringify(this.replies) === '{}') {
        this._getMessage()
      } else {
        return
      }
    },
    deactivated() {
      this.isShow = false
      this.$refs.header.hide() // 离开时隐藏
    },
    methods: {
      pushToUsero(loginname) {
        this.$router.push({
          path: `/usero/${loginname}`
        })
      },
      loading() {
        this.$store.commit('setShow', true)
      },
      async read(message) {
        let res =await markOneMessage({accesstoken: this.$store.state.user.accessToken}, `/${message.id}`)
        if (res.success) {
          message.has_read  = true
          this.getNotReadNum(this.hasnot_read_messages)
        }
      },
      async _getMessage() {
        this.replies = await getMessage('', {accesstoken: this.$store.state.user.accessToken})
        this.hasnot_read_messages = this.replies.hasnot_read_messages
        this.has_read_messages = this.replies.has_read_messages
        this.getNotReadNum(this.hasnot_read_messages)
      },
      getNotReadNum(messages) {
        let count = 0
        count = messages.filter(message => {
          return !message.has_read
        }).length
        this.$store.commit('setNotReadNum', count)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/page/message";
</style>