<template>
    <div class="news-wrapper">
        <div class="news-box w1200 animated" :style="{visibility: visibile, animationName: aniname}">
            <a href="javascript:;" class="news-btn news-btn-left lnr lnr-chevron-left"></a>
            <div class="news-scroll">
                <ul>
                    <li v-for="(val, key) in list" :key="key">
                        <a :href="'/view/' + val.id" class="item">
                            <div class="news-left img_wrapper">
                                <img class="img" :src="val.img_src">
                            </div>
                            <div class="news-right">
                                <h3 class="text_overflow_cut">{{ val.title }}</h3>
                                <h5>作者：{{ val.author }}</h5>
                                <p>{{ val.description | cutString }}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <a href="javascript:;" class="news-btn news-btn-right lnr lnr-chevron-right"></a>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import 'common/js/scroll'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'News',
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ])
    },
    created(){
        const _this = this;
        this.$http.get('/api/newsList', {
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
            componentOffsetTop: -1
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
            }
        }
    },
    filters: {
        cutString(input){
            return JZY.util.cutstring(input, 300)
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
            _this.componentOffsetTop = $(_this.$el).children('.news-box').offset().top
            _this.displayComponent()
        }, 0)
    },
    updated(){
        if (this.list.length == 0){
            return
        }
        if (typeof this.__ismount__ == 'undefined'){
            const oScroll = new JZY.component.Scroll({
                $scrollWrapper: $('.news-scroll'),
                $arrowArray: [$('.news-btn-left'), $('.news-btn-right')],
                callback: function(){}
            })
            oScroll.install()
            this.__ismount__ = 'mounted'
        }
    }
}
</script>

<style>
    .news-wrapper {
        height: 500px;
        background: rgb(13, 9, 17);
        overflow: hidden;
    }
    .news-wrapper .news-box {
        height: 200px;
        position: relative;
        margin-top: 150px;
        visibility: hidden;
    }
    .news-scroll {
        width: 1040px;
        height: 200px;
        margin: 0 auto;
        overflow: hidden;
    }
    .news-scroll ul {
        width: 100%;
    }
    .news-scroll ul li {
        height: 200px;
    }
    .news-scroll ul li a.item {
        position: relative;
        display: block;
        height: 100%;
    }
    .news-scroll ul li a.item .news-left {
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 200px;
    }
    .news-scroll ul li a.item .news-left img {
        border-radius: 50%;
    }
    .news-scroll ul li a.item .news-right {
        position: absolute;
        left: 280px;
        top: 0;
        width: 720px;
        height: 100%;
    }
    .news-scroll ul li a.item .news-right h3 {
        font-size: 24px;
        color: #e71a1f;
        line-height: 30px;
        padding-top: 20px;
    }
    .news-scroll ul li a.item .news-right h5 {
        line-height: 30px;
        margin-bottom: 50px;
        font-size: 12px;
        color: #4B4B4B;
    }
    .news-scroll ul li a.item .news-right p {
        font-size: 12px;
        color: #808080;
    }
    .news-btn {
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 20px;
        color: rgba(255, 255, 255, .5);
        position: absolute;
        top: 82px;
        font-weight: 700;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .news-btn:hover {
        color: rgba(255, 255, 255, 1);
    }
    .news-btn.news-btn-left {
        left: 10px;
    }
    .news-btn.news-btn-right {
        right: 10px;
    }
    .news-wrapper .news-box:hover .news-btn-left {
        left: 0;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .news-wrapper .news-box:hover .news-btn-right {
        right: 0;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>