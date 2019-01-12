<template>
  <div class="topic-detail">
    <div class="header" flex="true">
        <div class="icon" flex="main:center cross:center"
             flex-box="0" @click="back">
          <a>
            <i class="iconfont icon-fanhui"></i>
          </a>
        </div>
        <h2 class="title" flex-box="1">详情</h2>
        <div class="icon" flex="main:center cross:center"
             flex-box="0"></div>
      </div>
    <div class="content">
      <div class="user" flex="true">
        <div class="headimg" flex-box="0">
          <img class="user-headimg" :src="topicDetail.author.avatar_url"/>
        </div>
        <div class="data" flex="dir:top" flex-box="1">
          <div flex="main:justify">
            <div class="name">{{topicDetail.author.loginname}}</div>
            <div flex-box="1">
              <v-time :time="topicDetail.create_at"></v-time>
            </div>
            <div class="lou">#楼主</div>
            <div class="font" flex="main:center cross:center" style="position: absolute;right: 0;top: 0;">
              <i class="iconfont icon-top"></i>
            </div>
          </div>
          <div class="qt" flex="true">
            <div>阅读：{{topicDetail.visit_count}}</div>
            <div>回复： {{topicDetail.reply_count}}</div>
          </div>
        </div>
      </div>
      <h2 class="tit2">{{topicDetail.title}}</h2>
      <div class="content markdown-body" v-html="topicDetail.content">
      </div>
      <h3 class="tit3">
        共<em>{{topicDetail.reply_count}}</em>条回复
      </h3>
      <ul class="re-list">
        <li flex="true" v-for="(reply, index) in topicDetail.replies">
          <div class="headimg" flex-box="0">
            <img class="user-headimg" v-lazy="reply.author.avatar_url"/>
          </div>
          <div class="main" flex-box="1" style="word-wrap: break-word;word-break: normal;width: 70%;">
            <div flex="main-justify">
              <div class="name">{{reply.author.name}}</div>
              <div flex-box="1" class="time">
                <v-time :time="reply.create_at"></v-time>
              </div>
              <div class="lou">#{{index + 1}}</div>
            </div>
            <div class="content markdown-body" v-html="reply.content">
            </div>
            <div class="bottom" flex="main:right">
              <div class="font font-false">
                <i class="iconfont icon-dianzan"
                   @click.stop="dianzan(reply)"
                   :class="{'dianzan': reply.is_uped}"></i>
                <em>{{reply.ups.length}}</em>
              </div>
              <div class="font">
                <i class="iconfont icon-huifu" @click.stop="showReplyBox"></i>
              </div>
            </div>
            <div class="reply-box" v-show="$store.state.user.accessToken && isShowReplyBox">
              <div class="text">
                <textarea :placeholder="'@'+reply.author.loginname"></textarea>
              </div>
              <div flex="main:right">
                <button class="btn" @click.stop="replyToSingle(reply)">回复</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="reply-box" v-show="$store.state.user.id">
        <div class="text">
          <textarea placeholder="@回复支持Markdown语法,请注意标记代码" v-model="replyContent"></textarea>
        </div>
        <div flex="main:right">
          <button class="btn" @click="replyAll(topicDetail.replies)">回复</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getTopicDetail, createTopic, Ups, getUserInfo} from "@/common/js/api";
  import storage from 'good-storage'
  import VTime from "../time/v-time";
  import Scroll from "../scroll/scroll";
  const USER = 'user'
  export default {
    name: "topic-detail",
    components: {
      Scroll,
      VTime
    },
    data () {
      return {
        isShow: true,
        replyContent: '',
        isShowReplyBox: false,
        topicDetail: {
          type: Object,
          default: {}
        },
        data:{
          type: Object,
          default: {
            mdrender: false
          }
        }
      }
    },
    activated() {
      this.getDetail()
    },
    deactivated() {
      this.topicDetail = {}
    },
    methods: {
      formatTime(replies) { // api给我们的时间是从小到大，我们这里处理一下
        replies.sort(function (a,b) {
          return new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
        })
      },
      showReplyBox() {
        // if(!this.$store.state.user.accessToken) {
        //   alert('请先登录')
        //   return
        // }
        // console.log('showReplyBox')
        // this.isShowReplyBox = !this.isShowReplyBox
      },
      async replyToSingle(reply) {
        if (!reply.reply_id) {
          alert('未知错误，不能回复')
        }
        let res = await createTopic({
          accesstoken: this.$store.state.user.accessToken,
          content: this.replyContent,
          reply_id: reply.reply_id
        },`/${this.$route.params.id}/replies`)
        console.log(res)
      },
      async dianzan(reply) { // 给别人点赞
        if(!this.$store.state.user.accessToken) {
          alert('请先登录')
          return
        }
        if (!reply.reply_id) {
          alert('未知错误，不能点赞')
        }
        let res = await Ups({accesstoken: this.$store.state.user.accessToken}, `/${reply.reply_id}/ups`)
        if (res.success) {
          reply.is_uped = !reply.is_uped
          if (reply.is_uped) {
            reply.ups.push(this.$store.state.user.id)
          } else {
            reply.ups.pop()
          }
        }
      },
      async replyAll(replies) { // 回复楼主
        if (!this.replyContent)
          return
        if(!this.$store.state.user.accessToken) {
          alert('请先登录')
          return
        }
        let res = await createTopic({
          accesstoken: this.$store.state.user.accessToken,
          content: this.replyContent
        },`/${this.$route.params.id}/replies`)
        if (res.success) {
          let reply = {}
          Object.assign(reply, {}, {
            id: this.$store.state.user.id,
            content: this.replyContent,
            ups: [],
            create_at: new Date().toISOString(),
            is_uped: false
          })
          reply.author = {}
          reply.author.loginname = this.$store.state.user.loginname
          reply.author.avatar_url = this.$store.state.user.avatar_url
          replies.push(reply)  // 回复后也要更新一下user
          await this.getUserInfo()
        }
      },
      async getDetail() {
        const id = this.$route.params.id
        if (id) {
          this.topicDetail = await getTopicDetail(`/${id}`, this.data)
          this.formatTime(this.topicDetail.replies)
        } else {
          return
        }
      },
      async getUserInfo() { // 回复后后要重新获取一下数据
        this.userinfo = await getUserInfo(`/${this.$store.state.user.loginname}`,{})
        let user = this.$store.state.user
        Object.assign(user, {}, {
          score: this.userinfo.score,
          recent_replies: this.userinfo.recent_replies
        })
        user.recent_replies[0].last_reply_at = new Date().toISOString() // 第一个就是你刚才回复的，api自动帮我们调整好了
        this.$store.commit('setUser', user)
        storage.set(USER, user)
      },
      back() {
        this.$router.back()
      }
    },
    watch:{
      topicDetail(newValue,oldValue) {
        if (JSON.stringify(newValue) !== '{}') {
          this.$nextTick(() => {
            this.$store.commit('setShow', false)
          })
        }
      }
    }
    // watch: {
    //   '$route'(to, from) {
    //     console.log(to)
    //     if (/^\/topic\/\w+$/.test(to.fullPath)) {
    //       this.topicDetail = {}
    //       this.getDetail()
    //     } else {
    //       return
    //     }
    //   }
    // }
  }
</script>
<style lang="less">
  @import "../../common/css/components/topic-detail";
</style>