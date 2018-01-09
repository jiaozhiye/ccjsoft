<template>
    <div class="friend-wrapper" :style="{backgroundPosition: bgPosition}">
        <h3>优秀校友</h3>
        <h5>在这我们每天都更新那些关于你的故事</h5>
        <div class="friend-list w1200" :style="{visibility: visibile}">
            <ul class="clearFix">
                <li class="animated" v-for="(val, key) in list" :key="key" :style="key % 2 == 0 ? leftIn : rightIn">
                    <a :href="'/view/' + val.id" class="friend-left img_wrapper fl"><img class="img" :src="val.img_src"></a>
                    <div class="friend-right fl">
                        <h5 class="text_overflow_cut">{{ val.time | dateTime }}</h5>
                        <h3><a :href="'/view/' + val.id">{{ val.title }}</a></h3>
                        <p>{{ val.description | cutString }}</p>
                    </div>
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
    name: 'Friend',
    created(){
        const _this = this;
        this.$http.get('/api/friend', {
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
            return '50% ' + (1950 - this.getScrollTop/2) + 'px'
        }
    },
    data(){
        return {
            list: [],
            visibile: 'hidden',
            leftIn: {animationName: 'none'},
            rightIn: {animationName: 'none'},
            aninameMore: 'none',
            delayTime: '2s',
            componentOffsetTop: -1,
            moreLink: '/list/4'
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 200){
                this.visibile = 'visible'
                this.leftIn.animationName  = 'fadeInLeft'
                this.rightIn.animationName  = 'fadeInRight'
                this.aninameMore = 'bounceIn'
            }
        }
    },
    filters: {
        dateTime(input){
            return input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8)
        },
        cutString(input){
            return JZY.util.cutstring(input, 225)
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
            _this.componentOffsetTop = $(_this.$el).children('.friend-list').offset().top
            _this.displayComponent()
        }, 0)
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .friend-wrapper {
        width: 100%;
        height: 1050px;
        background-image: url(../assets/images/bg-03.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .friend-wrapper > h3 {
        font-size: 36px;
        line-height: 40px;
        text-align: center;
        color: rgba(255, 255, 255, .9);
        padding-top: 100px;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .friend-wrapper > h5 {
        font-size: 18px;
        text-align: center;
        padding-top: 20px;
    }
    .friend-list {
        min-height: 690px;
    }
    
    .friend-list ul li {
        width: 50%;
        float: left;
        height: 160px;
        overflow: hidden;
        margin-top: 70px;
        position: relative;
        top: 0;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .friend-list ul li .friend-left {
        width: 160px;
        height: 160px;
    }
    .friend-list ul li img {
        -webkit-transition: all .4s ease-out;
        transition: all .4s ease-out;
    }     
    .friend-list ul li .friend-right {
        width: 380px;
        margin-left: 20px;
    }
    .friend-list ul li h3 {
        font-size: 14px;
        padding: 20px 0;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .friend-list ul li h3 a {
        font-weight: 700;
        color: rgba(255, 255, 255, .9);
    }
    
    .friend-list ul li:hover {
        top: -10px;
    }
    .friend-list ul li:hover img {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .friend-list ul li:hover h3 {
        padding-left: 10px;
    }

    .friend-list ul li:nth-of-type(1) {
        animation-delay: 0s;
    }
    .friend-list ul li:nth-of-type(2) {
        animation-delay: 0s;
    }
    .friend-list ul li:nth-of-type(3) {
        animation-delay: .4s;
    }
    .friend-list ul li:nth-of-type(4) {
        animation-delay: .4s;
    }
    .friend-list ul li:nth-of-type(5) {
        animation-delay: .8s;
    }
    .friend-list ul li:nth-of-type(6) {
        animation-delay: .8s;
    }

    .friend-wrapper .app-more {
        margin-top: 50px;
    }
</style>