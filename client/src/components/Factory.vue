<template>
    <div class="factory-wrapper">
        <div class="factory-box w1200" :style="{visibility: visibile}">
            <div class="item item-left animated" :style="{animationName: leftInName}">
                <h4>产品经理&全栈开发</h4>
                <a class="more" href="/cx/web-intro.html" target="_blank">详情了解</a>
            </div>
            <div class="item item-right animated" :style="{animationName: rightInName}">
                <h4>JAVA实战&App开发</h4>
                <a class="more" href="/cx/PM-intro.html" target="_blank">详情了解</a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Factory',
    data(){
        return {
            visibile: 'hidden',
            leftInName: 'none',
            rightInName: 'none',
            componentOffsetTop: -1
        }
    },
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ])
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 300){
                this.visibile = 'visible'
                this.leftInName  = 'fadeInLeft'
                this.rightInName  = 'fadeInRight'
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
            _this.componentOffsetTop = $(_this.$el).children('.factory-box').offset().top
            _this.displayComponent()
        }, 0)
    }
}
</script>

<style>
    .factory-wrapper {
        width: 100%;
        height: 900px;
        background: url(../assets/images/bg-05.jpg) 50% 0 no-repeat;
    }
    .factory-box {
        padding-top: 100px;
        display: flex;
    }
    .factory-box .item {
        flex: 1;
    }
    .factory-box .item-left {
        background: url(../assets/images/cx-factry.png) 0 100px no-repeat;
    }
    .factory-box .item-right {
        background: url(../assets/images/rj-factory.png) 50% 0 no-repeat;
    }
    .factory-box h4 {
        padding-top: 430px;
        text-align: center;
        font-size: 30px;
    }
    .factory-box .item-left h4 {
        color: #e8cfaa;
    }
    .factory-box .item-right h4 {
        color: #1363f5;
    }
    .factory-box .more {
        display: block;
        width: 300px;
        height: 64px;
        border: 1px solid #fff;
        text-align: center;
        line-height: 64px;
        font-size: 24px;
        margin: 60px auto 0;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .factory-box .more {
        color: #808080;
    }
    .factory-box .item-left .more:hover {
        color: #fff;
        background-color: #e8cfaa;
        border-color: #e8cfaa;
    }
    .factory-box .item-right .more:hover {
        color: #fff;
        background-color: #1363f5;
        border-color: #1363f5;
    }
</style>