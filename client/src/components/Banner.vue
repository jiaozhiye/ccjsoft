<template>
    <div class="banner">
        <video autoplay loop muted :src="videoSrc" style="object-fit: cover"></video>
        <h2 class="banner-title"></h2>
        <AppMore :linkurl="moreLink" :eventfn="slideDown"></AppMore>
    </div>
</template>

<script>
import $ from 'jquery'
import AppMore from 'components/More.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Banner',
    data(){
        return {
            videoSrc: '/dist/ccjsoft-video.mp4',
            moreLink: 'javascript:;'
        }
    },
    computed: {
        ...mapGetters([
            'getWindowHeight'
        ])
    },
    methods: {
        slideDown(){
            const _this = this
            $('html, body').animate({
                scrollTop: _this.getWindowHeight
            }, 400)
        }
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .banner {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .banner video {
        width: 100%;
        /* height: 100%; */
    }

    .banner h2 {
        position: absolute;
        width: 100%;
        height: 122px;
        left: 0;
        top: 35%;
        background: url(../assets/images/title.png) 50% 0 no-repeat;
    }
    
    .banner .app-more {
        position: absolute;
        z-index: 9;
        left: 0;
        right: 0;
        bottom: 100px;
    }
</style>