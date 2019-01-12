<template>
    <div>
        <topic
            :topics="this.allTopics"
            :hasMore="hasMore"
            @scrollMore="scrollMore">
        </topic>
    </div>
</template>

<script>
  import {getTopic} from "../../common/js/api";
  import Topic from "../../components/topic/topic";

  export default {
    name: "all",
    components: {Topic},
    data () {
      return {
        currentPage: 1,
        // currentTab: 'all',
        data: {
          tab: 'all',
          page: 1,
          limit: 10,
          mdrender: false
        },
        allTopics: [],
        hasMore: false
      }
    },
    created () {
      // this.currentTab = this.$route.path.replace(/^\/\w+\/$/,'')
    },
    activated() {
      if (!this.allTopics.length) {
        getTopic('', this.data).then(res => {
          this.allTopics = res
          console.log(this.allTopics)
        })
      } else {
        return
      }
    },
    deactivated() {
    },
    methods: {
      async scrollMore() {
        this.currentPage ++
        this.hasMore = true
        Object.assign(this.data, {}, {page: this.currentPage})
        this.appendTopics = await getTopic('', this.data)
        if (this.appendTopics.length) {
          this.allTopics = this.allTopics.concat(this.appendTopics)
        }
        setTimeout(() => {
          this.hasMore = false
        }, 500)
      }
    },
    watch: { // 原来想法是一个组件内进行切换，但是这样做耦合性太高了，最后代码太复杂了
      // '$route'(to, from) {
      //   this.currentTab = to.fullPath.replace(/\/home\//, '')
      //   console.log(this.currentTab)
      // },
      // currentTab(newTab) { // 当tab切换时重新请求数据
      //   if (!newTab in this.allTopics) { // 如果newTab在allTopic中说明已经请求过了，如果不在在请求
      //     Object.assign(this.data, {}, {tab: newTab})
      //     getTopic('', this.data).then(res => {
      //       this.allTopics[this.currentTab] = res
      //     })
      //   } else {
      //     return
      //   }
      // }
    }
  }
</script>

<style lang="less" scoped>
</style>