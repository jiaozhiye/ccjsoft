<template>
    <div class="page-navigation w1200">
        <span><i class="lnr lnr-home"></i> 位置：<a href="/">首页</a></span>
        <span v-html="getNavLocation"></span>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Navigation',
    data(){
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'getNavLocation'
        ])
    }
}
</script>

<style>
    .page-navigation {
        padding-top: 30px;
    }
</style>