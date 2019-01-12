<template>
  <transition name="down">
    <div class="header" flex="true" v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "header",
    data: {
      return: {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less">
  @import "../../common/css/components/header";
</style>