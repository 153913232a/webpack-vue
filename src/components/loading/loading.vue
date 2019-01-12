<template>
  <div class="loading">
    <img width="35" height="35" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  };
</script>
<style scoped lang="less">
  @import "../../common/css/components/loading";
</style>
