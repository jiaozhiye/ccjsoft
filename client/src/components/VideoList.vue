<template>
    <div class="videolist-wrapper" :style="{backgroundPosition: bgPosition}">
        <h3>孵化产品</h3>
        <h5>每一次挑战都是在自我超越，只为遇见更好的自己</h5>
        <div class="slide-box animated w1200" :style="{visibility: visibile, animationName: aniname}">
            <a href="javascript:;" class="slide-btn slide-btn-left lnr lnr-chevron-left"></a>
            <ul class="slide-scroll-box">
                <li class="img_wrapper" v-for="(val, key) in list" :key="key" :data-index="key">
                    <img class="img" :src="val.img_src">
                </li>
            </ul>
            <a href="javascript:;" class="slide-btn slide-btn-right lnr lnr-chevron-right"></a>
        </div>
        <AppMore class="animated" :linkurl="moreLink" :style="{visibility: visibile, animationName: aninameMore, animationDelay: delayTime}"></AppMore>
    </div>
</template>

<script>
import $ from 'jquery'
import 'common/js/moduleSlide'
import 'common/js/turnplay'
import AppMore from 'components/More.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Videolist',
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ]),
        bgPosition(){
            return '50% ' + (550 - this.getScrollTop/2) + 'px'
        }
    },
    created(){
        const _this = this;
        this.$http.get('/api/videoList', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            list: [],
            visibile: 'hidden',
            aniname: 'none',
            aninameMore: 'none',
            delayTime: '1.2s',
            componentOffsetTop: -1,
            moreLink: '/list/2'
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 200){
                this.visibile = 'visible'
                this.aniname  = 'fadeInUp'
                this.aninameMore = 'bounceIn'
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
            _this.componentOffsetTop = $(_this.$el).children('.slide-box').offset().top
            _this.displayComponent()
        }, 0)
    },
    updated(){
        if (this.list.length == 0){
            return
        }
        if (typeof this.__ismount__ == 'undefined'){
            const _this = this

            JZY.component.moduleSlide.init({
                $wrapper: $('.slide-scroll-box'),
                $columnUnit: $('.slide-scroll-box > li'),
                $column: $('.slide-scroll-box > li'),
                $nextTrigger: $('.slide-btn-right'),
                $prevTrigger: $('.slide-btn-left'),
                direction: 'horizontal',
                timer: 50
            })

            const oTurn = new JZY.component.TurnPlay({
                $targetNodeList : $('.slide-scroll-box > li'),
                panelSize : {width: 960, height: 540},
                callback : function($li, $box){
                    let v = $li.attr('data-index')
                    $box.html(_this.list[v].video_src)
                }
            })
            oTurn.install()

            this.__ismount__ = 'mounted'
        }
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .videolist-wrapper {
        width: 100%;
        height: 750px;
        background-image: url(../assets/images/bg-01.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .videolist-wrapper h3 {
        font-size: 36px;
        line-height: 40px;
        text-align: center;
        color: rgba(255, 255, 255, .9);
        padding-top: 100px;
    }
    .videolist-wrapper h5 {
        font-size: 18px;
        text-align: center;
        padding-top: 20px;
    }
    .slide-box {
        height: 285px;
        margin-top: 80px;
        position: relative;
		overflow: hidden;
    }
    .slide-box ul {
        width: 1220px;
        height: 300px;
        position: relative;
    }
    .slide-box ul li {
        width: 285px;
        height: 285px;
        margin-right: 20px;
        float: left;
        position: absolute;
        cursor: pointer;
        -webkit-transition: all .6s ease;
        transition: all .6s ease;
    }
    .slide-box ul li:before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin-top: 20px;
        margin-left: 20px;
        z-index: 9;
        border: 1px solid transparent;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .slide-box ul li:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, .7);
        background-image: url(../assets/images/video-play.png);
        background-position: 50% 0;
        background-repeat: no-repeat;
        background-size: 72px 72px;
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .slide-box ul li:hover:before {
        border-color: #e71a1f;
    }
    .slide-box ul li:hover:after {
        opacity: 1;
        visibility: visible;
        background-position: 50% 50%;
    }
    .slide-box ul li img {
        -webkit-transition: all .4s ease-out;
        transition: all .4s ease-out;
    }
    .slide-box ul li:hover img {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
    .slide-btn {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        color: rgba(255, 255, 255, .5);
        background: rgba(0, 0, 0, .5);
        position: absolute;
        top: 122px;
        z-index: 2;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .slide-btn:hover {
        color: rgba(255, 255, 255, .8);
        background: rgba(0, 0, 0, .8);
    }
    .slide-btn.slide-btn-left {
        left: 0px;
    }
    .slide-btn.slide-btn-right {
        right: 0px;
    }

    .videolist-wrapper .app-more {
        margin-top: 50px;
    }

    /* 翻转动画样式 */
    .win-mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 9;
    }
    .win-wrapper {
        position: fixed;
        z-index: 10;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        box-shadow: 0 0 8px 3px rgba(255, 255, 255, .85);
        -webkit-transform: perspective(600px) rotateY(-180deg);
        transform: perspective(600px) rotateY(-180deg);
        transform-style: preserve-3d;
    }
    .win-wrapper-box {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
    }
    .win-wrapper-AnieEnd {
        -webkit-transform: perspective(600px) rotateY(0deg);
        transform: perspective(600px) rotateY(0deg);
    }
    .win-wrapper-Ani {
        -webkit-transition: all .8s ease;
        transition: all .8s ease;
    }

    .win-wrapper-close {
        position:absolute;
        top: -15px;
        right: -15px;
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 20px;
        font-weight: 700;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        z-index: 9;
        box-shadow: 0 0 8px 3px rgba(255, 255, 255, .85);
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .win-wrapper-close:hover {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
</style>