<template>
    <div id="app">
        <img src="./images/logo.png" alt="logo" />
        <span>{{msg}}</span>
        <p class="test">test text</p>
    </div>
</template>
<script>
    import test from 'common/test'
    export default {
        name:'app',
        data(){
            return {
                msg:"hello vue !!"
            }
        },
        created() {
            console.log(test())
        }
    }
</script>
<style >
    .test{
        color:#020202
    }
</style>
<style lang="less">
    @import "styles/test";
    #app{
        img{width:100px;}
    }
</style>
