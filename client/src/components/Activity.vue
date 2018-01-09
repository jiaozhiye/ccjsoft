<template>
    <div class="activity-wrapper" :style="{backgroundPosition: bgPosition}">
        <h3>活动展示</h3>
        <h5>你有故事我有酒，与你我他共话天地</h5>
        <div class="activity-list w1200" :style="{visibility: visibile}">
            <ul class="clearFix">
                <li class="animated" v-for="(val, key) in list" :key="key" :style="{animationName: aniname}">
                    <img :src="val.img_src">
                    <a :href="'/view/' + val.id">
                        <span>{{ val.title }} <br> - {{ val.time | dateTime }} - </span>
                    </a>
                </li>
            </ul>
        </div>
        <AppMore class="animated" :linkurl="moreLink" :style="{visibility: visibile, animationName: aninameMore, animationDelay: delayTime}"></AppMore>
    </div>
</template>

<script>
import $ from 'jquery'
import AppMore from 'components/More.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Activity',
    created(){
        const _this = this
        this.$http.get('/api/activity', {
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
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ]),
        bgPosition(){
            return '50% ' + (2650 - this.getScrollTop/2) + 'px'
        }
    },
    data(){
        return {
            list: [],
            visibile: 'hidden',
            aniname: 'none',
            aninameMore: 'none',
            delayTime: '2s',
            componentOffsetTop: -1,
            moreLink: '/list/5'
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 200){
                this.visibile = 'visible'
                this.aniname = 'fadeInUp'
                this.aninameMore = 'bounceIn'
            }
        }
    },
    filters: {
        dateTime(input){
            return input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8)
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
            _this.componentOffsetTop = $(_this.$el).children('.activity-list').offset().top
            _this.displayComponent()
        }, 0)
    },
    updated(){
        if (this.list.length == 0){
            return
        }
        if (typeof this.__ismount__ == 'undefined'){
            $(this.$el).children('.activity-list').find('li').each(function (){
                new MouseDirection(this, {
                    enter: function ($element, dir) {
                        //每次进入前先把.trans类移除掉，以免后面调整位置的时候也产生过渡效果
                        var $content = $element.find('a').removeClass('trans');
                        //调整位置
                        $content.css(DIR_POS[dir]);
                        //reflow
                        $content[0].offsetWidth;
                        //启用过渡
                        $content.addClass('trans');
                        //滑入
                        $content.css({left: '0', top: '0'});
                    },
                    leave: function ($element, dir) {
                        $element.find('a').css(DIR_POS[dir]);
                    }
                })
            });
            this.__ismount__ = 'mounted'
        }
    },
    components: {
        AppMore
    }
}

// ..............
var DIR_POS = {
    left: {
        top: '0',
        left: '-100%'
    },
    right: {
        top: '0',
        left: '100%'
    },
    bottom: {
        top: '100%',
        left: '0'
    },
    top: {
        top: '-100%',
        left: '0'
    }
};

//这个模块完成鼠标方向判断的功能
var MouseDirection = function (element, opts) {
    var $element = $(element);
    //enter leave代表鼠标移入移出时的回调
    opts = $.extend({}, {
        enter: $.noop,
        leave: $.noop
    }, opts || {});
    var dirs = ['top', 'right', 'bottom', 'left'];
    var calculate = function (e) {
        var w = $element.outerWidth(),
            h = $element.outerHeight(),
            offset = $element.offset(),
            x = (e.pageX - offset.left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (e.pageY - offset.top - (h / 2)) * (h > w ? (w / h) : 1);

        return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    };
    $element.on('mouseenter', function (e) {
        var r = calculate(e);
        opts.enter($element, dirs[r]);
    }).on('mouseleave', function (e) {
        var r = calculate(e);
        opts.leave($element, dirs[r]);
    });
};
</script>

<style>
    .activity-wrapper {
        width: 100%;
        height: 1050px;
        background-image: url(../assets/images/bg-04.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .activity-wrapper > h3 {
        font-size: 36px;
        line-height: 40px;
        text-align: center;
        color: rgba(255, 255, 255, .9);
        padding-top: 100px;
    }
    .activity-wrapper > h5 {
        font-size: 18px;
        text-align: center;
        padding-top: 20px;
    }
    .activity-list {
        min-height: 560px;
        padding-top: 50px;
    }

    .activity-list ul {
        width: 1215px;
    }

    .activity-list ul li {
        width: 390px;
        height: 260px;
        float: left;
        margin: 15px 15px 0 0;
        overflow: hidden;
        position: relative;
    }
    .activity-list ul li img {
        width: 100%;
        height: 100%;
    }
    
    
    .activity-list ul li:nth-of-type(1) {
        animation-delay: 0s;
    }
    .activity-list ul li:nth-of-type(2) {
        animation-delay: .2s;
    }
    .activity-list ul li:nth-of-type(3) {
        animation-delay: .4s;
    }
    .activity-list ul li:nth-of-type(4) {
        animation-delay: .6s;
    }
    .activity-list ul li:nth-of-type(5) {
        animation-delay: .8s;
    }
    .activity-list ul li:nth-of-type(6) {
        animation-delay: 1s;
    }

    .activity-list ul li > a {
        position: absolute;
        z-index: 2;
        background-color: rgba(0, 0, 0, .7);
        width: 100%;
        height: 100%;
        left: -100%;
        top: -100%;
        text-align: center;
        color: rgba(255, 255, 255, .9);
        font-size: 12px;  
    }

    .activity-list ul li > a span {
        display: inline-block;
        padding-top: 100px;
    }

    .activity-list ul li > a.trans {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        backface-visibility: hidden;
    }

    .activity-list ul li > a:before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: calc(100% - 80px);
        height: calc(100% - 80px);
        margin-top: 40px;
        margin-left: 40px;
        z-index: 9;
        border: 1px solid #e71a1f;
    }

    .activity-wrapper .app-more {
        margin-top: 50px;
    }
</style>