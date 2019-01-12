<template>
  <ul class="tab-top">
    <li class="every">
      <router-link to="/home/all" active-class="active">
        全部
      </router-link>
    </li>
    <li>
      <router-link to="/home/good"active-class="active">
        精华
      </router-link>
    </li>
    <li>
      <router-link to="/home/ask" class="every" active-class="active">
        问答
      </router-link>
    </li>
    <li>
      <router-link to="/home/job" class="every" active-class="active">
        招聘
      </router-link>
    </li>
    <li>
      <router-link to="/home/dev" active-class="active">
        测试
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "tabBottom",
    created() {
      console.log(this.$route)
    },
    methods: {
      toMy() {}
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/components/tab-top";
</style>