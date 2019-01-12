<template>
  <div>
    <div class="sigin">
      <v-header ref="header">
        <div class="icon" flex="main:center cross:center" flex-box="0">
          <router-link to="/">
            <i class="iconfont icon-fanhui"></i>
          </router-link>
        </div>
        <h2 class="title" flex-box="1">登陆</h2>
        <div class="icon" flex="main:center cross:center" flex-box="0">
        </div>
      </v-header>
      <transition name="slidel">
        <div class="signin" v-show="isShow" flex="dir:top main:center cross:center">
          <div class="center">
            <div class="text">
              <input class="text" v-model="accessToken" placeholder="Access Token"/>
            </div>
            <button class="btn" @click="login">{{msg}}</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {loginAccessToken} from "../../common/js/api";
  import storage from 'good-storage'
  import VHeader from "../../components/header/v-header";
  const USER = 'user'

  export default {
    name: "signin",
    components: {VHeader},
    data() {
      return {
        accessToken: '1f3dc0c2-6b54-4a02-b184-24be85bb6ec3',
        isShow:false,
        msg: '登陆',
        user: {}
      }
    },
    methods: {
      async login() {
        this.msg = '登录中...'
        let user = await loginAccessToken({accesstoken: this.accessToken})
        this.msg = '登录'
        if (user.id) {
          Object.assign(this.user, {}, {
            id: user.id,
            loginname: user.loginname,
            avatar_url: user.avatar_url,
            accessToken: this.accessToken
          })
          this.$store.commit('setUser', this.user)
          storage.set(USER, this.user)
          this.$router.push({
            path: `/user/${this.user.loginname}`
          })
        } else {
          return
        }
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
  @import "../../common/css/page/signin";
</style>