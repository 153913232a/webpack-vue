<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
        <div class="loading-container" v-show="$store.state.isShow">
            <transition name="slide">
                <div class="header" flex="true" v-show="$store.state.isShow">
                    <div class="icon" flex="main:center cross:center" flex-box="0">
                        <i class="iconfont icon-fanhui"></i>
                    </div>
                    <h2 class="title" flex-box="1">详情</h2>
                    <div class="icon" flex="main:center cross:center" flex-box="0">
                    </div>
                </div>
            </transition>
            <loading></loading>
        </div>
        <tab-bottom></tab-bottom>
    </div>
</template>
<script>
    import Loading from './components/loading/loading'
    import TabBottom from "./components/tabBottom/tabBottom";
    export default {
      name:'app',
      components: {TabBottom, Loading}
    }
</script>
<style lang="less" scoped>
    .slide-enter-active {
        transition: all, .3s
    }
    .slide-enter{
        transform: translate3d(100%, 0, 0)
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 130;
        background: white;
        bottom: 0;
    }
</style>
