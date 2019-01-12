<template>
  <div>
    <topic
            :topics="askTopics"
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
          tab: 'ask',
          page: 1,
          limit: 10,
          mdrender: false
        },
        askTopics: [],
        hasMore: false
      }
    },
    created () {
      // this.currentTab = this.$route.path.replace(/^\/\w+\/$/,'')
    },
    activated() {
      if (!this.askTopics.length) {
        getTopic('', this.data).then(res => {
          this.askTopics = res
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
          this.askTopics = this.askTopics.concat(this.appendTopics)
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