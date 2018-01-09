<template>
    <div class="ad-wrapper">
        <div class="ad-box w1200 animated" :style="{visibility: visibile, animationName: aniname, backgroundImage: bgUrl}"></div>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Adbox',
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ])
    },
    props: {
        imgsrc: String
    },
    data(){
        return {
            visibile: 'hidden',
            aniname: 'none',
            componentOffsetTop: -1,
            bgUrl: 'url(' + this.imgsrc + ')'
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 100){
                this.visibile = 'visible'
                this.aniname  = 'fadeInUp'
            }
        }
    },
    watch: {
        getScrollTop(){
            this.displayComponent()
        }
    },
    mounted(){
        const _this = this
        setTimeout(() => {
            _this.componentOffsetTop = $(_this.$el).children('.ad-box').offset().top
            _this.displayComponent()
        }, 0)
    }
}
</script>

<style>
    .ad-wrapper {
        height: 300px;
        background: rgb(11, 11, 11);
        overflow: hidden;
    }
    .ad-box {
        height: 150px;
        margin-top: 75px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
    }
</style>