<template>
  <div class="time">
    {{timeStr}}
  </div>
</template>

<script>
  export default {
    name: "time",
    data() {
      return {
        timeStr: ''
      }
    },
    props: {
      time: {
        type: String,
        default: ''
      }
    },
    created() {
      this.timeStr = this.formatDays(this.time)
      console.log(this.timeStr)
    },
    methods: {
      formatDays(time) {
        let t = new Date().getTime() - new Date(time).getTime()
        if (t < 0) {
          return '';
        } else if (t / 1000 < 60) {
          return '刚刚';
        } else if ((t / 60000) < 60) {
          return parseInt((t / 60000)) + '分钟前';
        } else if ((t / 3600000) < 24) {
          return parseInt(t / 3600000) + '小时前';
        } else if ((t / 86400000) < 31) {
          return parseInt(t / 86400000) + '天前';
        } else if ((t / 2592000000) < 12) {
          return parseInt(t / 2592000000) + '月前';
        } else {
          return parseInt(t / 31536000000) + '年前';
        }
      }
    }
  }
</script>

<style scoped>

</style>