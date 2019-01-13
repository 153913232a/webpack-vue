<template>
  <div class="tab-bottom">
    <div v-for="(tab, index) in routerTab"
                  class="every"
                 :class="{'active': $store.state.routeIndex === index}"
                 :to="tab.to"
                 @click="toBottomTab(tab)">
      <i class="iconfont" :class="tab.icon"></i>
      <em v-show="tab.hasNum && $store.state.notReadNum">{{$store.state.notReadNum}}</em>
      <div>{{tab.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabBottom",
    data() {
      return{
        routerTab: [
          {name: '首页', icon: 'icon-shouye', to: '/home', hasNum: false},
          {name: '发表', icon: 'icon-fabu', to: "/topic/create", hasNum: false},
          {name: '消息', icon: 'icon-xiaoxi', to: "/my/message", hasNum: true},
          {name: '我的', icon: 'icon-wode', hasNum: false}
        ]
      }
    },
    created() {
    },
    methods: {
      toBottomTab(tab) {
        if (tab.name === '我的') {
          if (JSON.stringify(this.$store.state.user)==='{}') { // 初始化页面
            this.$router.push({
              path: '/sigin'
            })
          } else { // 如果vuex有user直接跳转到详情页
            this.$router.push({
              path: `/user/${this.$store.state.user.loginname}`
            })
          }
        } else {
          this.$router.push({
            path: `${tab.to}`
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/components/tab-bottom";
</style>