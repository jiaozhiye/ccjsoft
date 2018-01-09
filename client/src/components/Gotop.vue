<template>
    <div class="gotop-wrapper animated" @click.stop="handleClick" :style="{visibility: visibile, animationName: aniname}">
        <i class="lnr lnr-chevron-up"></i>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Gotop',
    computed: {
        ...mapGetters([
            'getScrollTop'
        ])
    },
    methods: {
        handleClick(){
            $('html, body').animate({
                scrollTop: 0
            }, 400)
        },
        displayComponent(){
            if (this.getScrollTop > 600){
                this.visibile = 'visible'
                this.aniname  = 'zoomInDown'
            } else {
                this.visibile = 'hidden'
                this.aniname  = 'zoomOutDown'
            }
        }
    },
    data(){
        return {
            visibile: 'hidden',
            aniname: 'none'
        }
    },
    watch: {
        getScrollTop(){
            this.displayComponent()
        }
    },
    mounted(){
        this.displayComponent()
    }
}
</script>

<style>
    .gotop-wrapper {
        width: 40px;
        height: 40px;
        position: fixed;
        right: 20px;
        bottom: 40px;
        background: rgba(0, 0, 0, .6);
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        line-height: 42px;
        overflow: hidden;
        z-index: 9;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .gotop-wrapper:hover {
        background: rgba(0, 0, 0, 1);
    }
</style>