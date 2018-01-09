<template>
    <header class="header" :class="{mini: getHeadClass}">
        <a href="#/" class="hd-logo fl"><strong>吉软国际</strong></a>
        <div class="head-menu fr">
            <i class="lnr lnr-menu" @click.stop="handleClick"></i>
            <transition name="menu">
            <ul v-show="playState">
                <li><a href="http://www.51jsoft.com/cx/web-intro.html" target="_blank">创新工厂</a></li>
                <li><a href="http://www.51jsoft.com/cx/PM-intro.html" target="_blank">软件工厂</a></li>
                <li><a href="javascript:;">课程视频</a></li>
                <li><a href="http://a.51jsoft.com" target="_blank">论坛</a></li>
            </ul>
            </transition>
        </div>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapGetters([
            'getScrollTop'
        ]),
        getHeadClass(){
            return this.getScrollTop > 50 ? true : false
        }
    },
    data(){
        return {
            playState: false
        }
    },
    methods: {
        handleClick(){
            this.playState = !this.playState
        }
    },
    mounted(){
        const _this = this
        document.addEventListener('click', function(ev){
            ev.stopPropagation()
            _this.playState = false
        }, false)
    }
}
</script>

<style>
    .header {
        width: 100%;
        height: 1rem;
        padding: .1rem 0;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        background: rgba(0, 0, 0, 0);
        transition: all .6s cubic-bezier(.215,.61,.355,1);
    }
    .header.mini {
        height: .8rem;
        padding: 0;
        background: rgba(15, 15, 15, .5);
    }
    .header .hd-logo {
        width: 2.4rem;
        height: .8rem;
        background: url(../../../src/assets/images/logo.png) 0 50% no-repeat;
        background-size: 100%;
        margin-left: .1rem;
        overflow: hidden;
    }
    .header .hd-logo strong {
        margin-left: -5rem;
    }

    .head-menu {
        font-size: .6rem;
        color: rgb(255, 255, 255);
        margin: .1rem .2rem 0 0;
        position: relative;
    }
    .head-menu ul {
        width: 2rem;
        padding: .1rem .25rem;
        position: absolute;
        right: .05rem;
        top: .8rem;
        background: #212121;
        border-radius: 2px;
    }
    .head-menu ul::after {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        right: .1rem;
        top: -.14rem;
        border-bottom: .15rem solid #212121;
        border-right: .15rem solid transparent;
        border-left: .15rem solid transparent;
        content: '';
    }
    .head-menu ul li {
        font-size: .25rem;
        height: .65rem;
        line-height: .65rem;
        border-bottom: 1px dashed rgba(255, 255, 255, .4);
    }
    .head-menu ul li:last-of-type {
        border-bottom: none;
    }
    .head-menu ul li a {
        color: rgb(255, 255, 255);
    }

    /* 导航菜单动画 */
    .menu-enter-active,
    .menu-leave-active {
        transition: all .4s ease-out;
    }
    .menu-enter {
        opacity: 0;
        transform: translate3d(0, 12px, 0);
    }
    .menu-enter-to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .menu-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
    .menu-leave-to {
        opacity: 0;
        transform: translate3d(0, 12px, 0);
    }
</style>