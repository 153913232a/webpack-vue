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
      <div class="message-content" v-show="this.$store.state.user.id && isShow">
      </div>
    </transition>
  </div>
</template>

<script>
  import VHeader from '../../components/header/v-header'
  export default {
    name: "message",
    components:{VHeader},
    data() {
      return{
        isShow: false
      }
    },
    activated() {
      this.isShow = true
      this.$refs.header.show() // 路由进来时显示header
      this.$store.commit('changeRouterIndex', 2)
    },
    deactivated() {
      this.isShow = false
      this.$refs.header.hide() // 离开时隐藏
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/page/message";
</style>