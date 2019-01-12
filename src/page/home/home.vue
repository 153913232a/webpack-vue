<template>
  <div class="home">
    <TabTop></TabTop>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import TabTop from '../../components/tabTop/tabtop'
  import {getTopic, getUser} from "@/common/js/api";

  export default {
    name: "home",
    created () {
      // getTopic().then(res => {
      //   console.log(res)
      // })
      // getUser({accesstoken: "1f3dc0c2-6b54-4a02-b184-24be85bb6ec3"}).then(res => {
      //   console.log(res)
      // })
    },
    activated() {
      this.$store.commit('changeRouterIndex', 0)
    },
    components: {
      TabTop
    }
  }
</script>

<style lang="less" scoped>
</style>