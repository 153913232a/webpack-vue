<template>
  <div>
    <topic
            :topics="jobTopics"
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
          tab: 'job',
          page: 1,
          limit: 10,
          mdrender: false
        },
        jobTopics: [],
        hasMore: false
      }
    },
    created () {
    },
    activated() {
      if (!this.jobTopics.length) {
        getTopic('', this.data).then(res => {
          this.jobTopics = res
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
          this.jobTopics = this.jobTopics.concat(this.appendTopics)
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