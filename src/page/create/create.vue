<template>
  <div class="create">
    <v-header ref="header">
      <div class="icon" flex="main:center cross:center" flex-box="0">
      </div>
      <h2 class="title" flex-box="1">发表主题</h2>
      <div class="icon" flex="main:center cross:center" flex-box="0" @click="createTopics">
        <i class="iconfont icon-fabu"></i>
      </div>
    </v-header>
    <transition name="slide">
      <div class="tip-msg-signin" v-show="!this.$store.state.user.id && isShow">
        你还未登录,请先<router-link to="/sigin">登录</router-link>
      </div>
    </transition>
    <transition name="slide">
      <div class="topic-create" v-show="this.$store.state.user.id && isShow">
        <div class="item">
          <el-select v-model="label" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <input type="text" placeholder="标题字数10字以上" v-model="title"/>
        </div>
        <div class="item">
          <textarea placeholder="内容字数 30 字以上" v-model="content"></textarea>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {createTopics, getUserInfo} from "../../common/js/api";
  import VHeader from '../../components/header/v-header'
  import storage from 'good-storage'
  const USER = 'user'
  export default {
    name: "create",
    data() {
      return {
        isShow: false,
        chooseArray:{"选项1": "share","选项2":"ask","选项3": "job","选项4": "dev"},
        options: [{
          value: '选项1',
          label: '分享',
          disabled: true
        }, {
          value: '选项2',
          label: '问答',
          disabled: true
        }, {
          value: '选项3',
          label: '招聘',
          disabled: true
        }, {
          value: '选项4',
          label: '测试'
        }],
        label: '',
        title: '',
        content: '',
      }
    },
    components: {VHeader},
    methods: {
      async getUserInfo() { // 创建主题后要重新获取一下数据
        this.userinfo = await getUserInfo(`/${this.$store.state.user.loginname}`,{})
        let user = this.$store.state.user
        Object.assign(user, {}, {
          score: this.userinfo.score,
          recent_topics: this.userinfo.recent_topics
        })
        this.$store.commit('setUser', user)
        storage.set(USER, user)
      },
      createTopics() {
        if (this.chooseArray[this.label] !== 'dev') {
          alert('请在测试栏创建帖子，不然会被封号！！！')
          return
        }
        if (this.label && this.title && this.content) {
          createTopics({
            accesstoken: this.$store.state.user.accessToken,
            title: this.title,
            tab: this.chooseArray[this.label],
            content: this.content
          }).then(res => {
            alert('创建成功！')
            this.getUserInfo()
          })
        } else {
          alert('创建失败！！！')
        }
      }
    },
    activated() {
      this.isShow = true
      this.$refs.header.show() // 路由进来时显示header
      this.$store.commit('changeRouterIndex', 1)
    },
    deactivated() {
      this.isShow = false
      this.$refs.header.hide() // 离开时隐藏
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/page/create";
</style>