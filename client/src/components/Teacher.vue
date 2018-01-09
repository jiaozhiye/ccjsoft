<template>
    <div class="teacher-wrapper" :style="{backgroundPosition: bgPosition}">
        <h3>师资力量</h3>
        <h5>精研科教 克己奉公</h5>
        <div class="teacher-list w1200" :style="{visibility: visibile}">
            <ul>
                <li class="animated" v-for="(val, key) in list" :key="key" :style="key % 2 == 0 ? upIn : downIn">
                    <a href="javascript:;" class="img_wrapper"><img class="img" :src="val.img_src" :alt="val.name"></a>
                    <h4>{{ val.name }}</h4>
                    <h5>{{ val.course }}</h5>
                    <span class="addBtn" @click.stop="handleClick(key)">{{ val.state == 'hidden' ? '+' : '-' }}</span>
                    <div class="cont" :class="{hide: val.state == 'hidden', show: val.state == 'shown'}" v-html="val.content"></div>
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
    name: 'Teacher',
    created(){
        const _this = this;
        this.$http.get('/api/teacher', {
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
            return '50% ' + (1300 - this.getScrollTop/2) + 'px'
        }
    },
    methods: {
        displayComponent(){
            if (this.componentOffsetTop == -1 || this.visibile == 'visible'){
                return
            }
            if (this.getScrollTop + this.getWindowHeight - this.componentOffsetTop > 200){
                this.visibile = 'visible'
                this.upIn.animationName  = 'bounceInDown'
                this.downIn.animationName  = 'bounceInUp'
                this.aninameMore = 'bounceIn'
            }
        },
        handleClick(index){
            if (this.list[index].state == 'hidden'){
                this.list[index].state = 'shown'
            } else {
                this.list[index].state = 'hidden'
            }
        }
    },
    data(){
        return {
            list: [],
            visibile: 'hidden',
            upIn: {animationName: 'none'},
            downIn: {animationName: 'none'},
            aninameMore: 'none',
            delayTime: '1.4s',
            componentOffsetTop: -1,
            moreLink: '/teacher'
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
            _this.componentOffsetTop = $(_this.$el).children('.teacher-list').offset().top
            _this.displayComponent()
        }, 0)
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .teacher-wrapper {
        width: 100%;
        height: 1000px;
        background-image: url(../assets/images/bg-02.jpg);
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .teacher-wrapper > h3 {
        font-size: 36px;
        line-height: 40px;
        text-align: center;
        color: rgba(255, 255, 255, .9);
        padding-top: 100px;
    }
    .teacher-wrapper > h5 {
        font-size: 18px;
        text-align: center;
        padding-top: 20px;
    }
    .teacher-list {
        min-height: 540px;
        margin-top: 100px;
    }
    .teacher-list ul {
        display: flex;
    }
    .teacher-list ul li {
        flex: auto;
        position: relative;
    }
    .teacher-list ul li > a {
        width: 112px;
        height: 112px;
        display: block;
        margin: 0 auto;
        border: 4px solid rgba(255, 255, 255, 1);
        overflow: hidden;
        border-radius: 50%;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .teacher-list ul li > a > img {
        border-radius: 50%;
        -webkit-transition: all .6s ease;
        transition: all .6s ease;
    }
    .teacher-list ul li > a:hover {
        border-color: rgba(3, 84, 204, 1);
    }
    .teacher-list ul li > a:hover img {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .teacher-list ul li h4 {
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        padding-top: 20px;
    }
    .teacher-list ul li h5 {
        font-size: 14px;
        color: #808080;
        text-align: center;
        line-height: 20px;
    }
    .teacher-list ul li span.addBtn {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgb(3, 84, 204);
        color: #fff;
        line-height: 18px;
        text-indent: 4px;
        font-size: 20px;
        cursor: pointer;
        margin: 15px auto;
    }
    .teacher-list ul li > .cont {
        position: absolute;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .teacher-list ul li > .cont.hide {
        opacity: 0;
        visibility: hidden
    }
    .teacher-list ul li > .cont.show {
        opacity: 1;
        visibility: visible;
    }
    
    .teacher-list ul li:nth-of-type(2n+1) {
        margin-top: 0;
    }
    .teacher-list ul li:nth-of-type(2n) {
        margin-top: 140px;
    }
    
</style>