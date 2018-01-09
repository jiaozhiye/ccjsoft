<template>
    <header class="header" :class="{mini: getHeadClass}">
        <div class="head w1200">
            <a href="/" class="hd-logo fl"><strong>吉软国际</strong></a>
            <AppNav></AppNav>
        </div>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'
import AppNav from 'components/Nav.vue'

export default {
    name: 'Header',
    data (){
        return {}
    },
    computed: {
        ...mapGetters([
            'getScrollTop'
        ]),
        getHeadClass(){
            return this.getScrollTop > 80 ? true : false
        }
    },
    components: {
        AppNav
    }
}
</script>

<style>
    .header {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding: 15px 0;
        background: rgba(0, 0, 0, 0);
        z-index: 999;
        -webkit-transition: all .6s cubic-bezier(.215,.61,.355,1);
        transition: all .6s cubic-bezier(.215,.61,.355,1);
    }
    .header.mini {
        padding: 0;
        background: rgba(18, 15, 22, .9);
    }
    .header .head {
        height: 100%;
    }
    .header .hd-logo {
        width: 180px;
        height: 60px;
        background: url(../assets/images/logo.png) 0 50% no-repeat;
        background-size: 100%;
        overflow: hidden;
    }
    .header .hd-logo strong {
        margin-left: -500px;
    }
</style>