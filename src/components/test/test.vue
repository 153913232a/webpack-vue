<template>
  <div>
    <topic
            :topics="shareTopics"
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
          tab: 'dev',
          page: 1,
          limit: 10,
          mdrender: false
        },
        shareTopics: [],
        hasMore: false
      }
    },
    created () {
      // this.currentTab = this.$route.path.replace(/^\/\w+\/$/,'')
    },
    activated() {
      if (!this.shareTopics.length) {
        getTopic('', this.data).then(res => {
          this.shareTopics = res
        })
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
          this.shareTopics = this.shareTopics.concat(this.appendTopics)
        }
        setTimeout(() => {
          this.hasMore = false
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>