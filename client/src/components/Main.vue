<template>
    <section class="main" :style="{marginTop: getWindowHeight + 'px'}">
      <AppNews></AppNews>
      <AppVideoList></AppVideoList>
      <AppFactory></AppFactory>
      <AppTeacher></AppTeacher>
      <AppAdBox :imgsrc="imgUrlArr[0]"></AppAdBox>
      <AppFriend></AppFriend>
      <AppAdBox :imgsrc="imgUrlArr[1]"></AppAdBox>
      <AppActivity></AppActivity>
      <AppContact></AppContact>
    </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import AppNews from 'components/News.vue'
import AppVideoList from 'components/VideoList.vue'
import AppFactory from 'components/Factory.vue'
import AppTeacher from 'components/Teacher.vue'
import AppFriend from 'components/Friend.vue'
import AppAdBox from 'components/AdBox.vue'
import AppActivity from 'components/Activity.vue'
import AppContact from 'components/Contact.vue'

export default {
    name: 'Main',
    data(){
        return {
            imgUrlArr: [
                './dist/ad-01.jpg',
                './dist/ad-02.jpg'
            ]
        }
    },
    computed: {
        ...mapGetters([
            'getWindowHeight'
        ])
    },
    methods: {
        ...mapActions([
            'createWinHeight', 'createScrollTopHeight', 'createNavigation'
        ]),
        getScrollTop(){
            return document.body.scrollTop || document.documentElement.scrollTop
        }
    },
    mounted(){
        const _this = this
        
        window.addEventListener('resize', function fn(ev){
            _this.createWinHeight()
        }, false)
        window.addEventListener('scroll', function fn2(ev){
            _this.createScrollTopHeight(_this.getScrollTop())
        }, false)
        // 获取 window 窗口的高度
        this.createWinHeight()
        
        this.createNavigation()
    },
    components: {
        AppNews,
        AppVideoList,
        AppFactory,
        AppTeacher,
        AppAdBox,
        AppFriend,
        AppActivity,
        AppContact
    }
}
</script>

<style>
    .main {
        margin-top: 100vh;
        min-height: 2000px;
        background: rgb(17, 17, 17);
        position: relative;
    }
</style>