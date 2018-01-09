<template>
    <div class="contact-wrapper">
        <div class="contact w1200">
            <div class="contact-left animated" :style="{visibility: visibile, animationName: aniname}"></div>
            <div class="contact-mid animated" :style="{visibility: visibile, animationName: aniname}">
                <ul>
                    <li v-for="(val, key) in list" :key="key">{{ val }}</li>
                </ul>
            </div>
            <div class="contact-right animated" :style="{visibility: visibile, animationName: aniname}"></div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Contact',
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ])
    },
    data(){
        return {
            list: [
                '总部：吉林省长春市卫星路星城国际B座1700',
                '高新校区：飞跃路东北亚文化创意科技园D栋4F',
                '净月校区：净月大学城复地嘉年华A1栋4F'
            ],
            visibile: 'hidden',
            aniname: 'none',
            componentOffsetTop: -1
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 0){
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
            _this.componentOffsetTop = $(_this.$el).children('.contact').offset().top
            _this.displayComponent()
        }, 0)
    }
}

</script>

<style>
    .contact-wrapper {
        background: rgb(22, 22, 22);
        height: 360px;
        overflow: hidden;
    }
    .contact {
        margin-top: 140px;
        position: relative;
    }
    .contact-left {
        width: 120px;
        height: 50px;
        background: url(../assets/images/contact-bg.png) 0 0 no-repeat;
        position: absolute;
        left: 0;
        top: 10px;
        animation-delay: .4s;
    }
    .contact-right {
        width: 165px;
        height: 54px;
        background: url(../assets/images/phone.png) 0 0 no-repeat;
        position: absolute;
        right: 0;
        top: 10px;
        animation-delay: 1.2s;
    }
    .contact-mid {
        width: 550px;
        position: absolute;
        left: 50%;
        margin-left: -275px;
        top: 0;
        animation-delay: .8s;
    }
    .contact-mid ul li {
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, .4);
        line-height: 34px;
    }
</style>