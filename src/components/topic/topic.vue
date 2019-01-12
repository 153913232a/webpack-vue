<template>
  <scroll
      :data="topics"
      :probe-type="3"
      :pullDown="true"
      @scrollToEnd="scrollMore"
      class="scroll">
    <ul>
      <li v-for="topic in topics"
          :key="topic.id"
          @click="TopicDetail(topic)">
        <div flex="box:first">
          <div class="font" flex="cross-center">
            <i class="iconfont" :class="getIcon(topic.tab)"></i>
            <h3 class="tit">{{topic.title}}</h3>
          </div>
        </div>
        <div class="bottom" flex="box:first">
          <div class="author" flex="cross-center">
            <img class="user-headimg" v-lazy="topic.author.avatar_url"/><!--:style="{ backgroundImage: `url(${topic.author.avatar_url})`}"-->
          </div>
          <div class="con" flex="dir:top main:center">
            <p flex="cross:center box:last">
              <span class="name">{{topic.author.loginname}}</span>
              <span class="count">{{topic.reply_count}}/{{topic.visit_count}}</span>
            </p>
            <p flex="cross:center box:last">
              <v-time :time="topic.create_at"></v-time>
              <v-time :time="topic.last_reply_at"></v-time>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading-container" v-show="!topics.length">
      <loading></loading>
    </div>
    <div class="ant-spin-nested-loading" v-show="hasMore">
      <div class="">
        <div class="ant-spin ant-spin-lg ant-spin-spinning">
		  <span class="ant-spin-dot ant-spin-dot-spin">
		    <i></i>
			<i></i>
			<i></i>
			<i></i>
		  </span>
        </div>
      </div>
      <div class="ant-spin-container ant-spin-blur">
        <div class="followWarp" style="width:98%;margin:auto;">
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../scroll/scroll'
  import Loading from '../loading/loading'
  import {getTopicDetail} from "@/common/js/api";
  import VTime from "../time/v-time";
  export default {
    name: "topic",
    components: {VTime, Scroll, Loading},
    props: {
      topics: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getIcon(tab) {
        return `icon-${tab}`
      },
      scrollMore() {
        this.$emit('scrollMore')
      },
      TopicDetail(topic) {
        this.$router.push({
          path: `/topic/${topic.id}`
        })
        this.$store.commit('setShow',true)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/components/topic";
</style>