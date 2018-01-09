<template>
  <div id="app">
    <AppHeader></AppHeader>
    <AppBanner></AppBanner>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <router-view></router-view>
    </transition>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import 'common/css/reset.css'
import 'common/css/mobile-style.css'
import 'common/css/font.css'
import 'animate.css'

import {mapActions, mapGetters} from 'vuex'
import AppHeader from 'components/Header.vue'
import AppBanner from 'components/Banner.vue'
import AppFooter from 'components/Footer.vue'

export default {
  name: 'app',
  created(){
    let deviceWidth = document.documentElement.clientWidth
    if (deviceWidth > 750){
      deviceWidth = 750
    }
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  },
  data () {
    return {}
  },
  methods: {
      ...mapActions([
          'createScrollTopHeight', 'createWinHeight'
      ]),
      getScrollTop(){
          return document.body.scrollTop || document.documentElement.scrollTop
      }
  },
  mounted(){
      const _this = this
      window.addEventListener('scroll', function fn2(ev){
          _this.createScrollTopHeight(_this.getScrollTop())
      }, false)
      window.addEventListener('resize', function fn(ev){
          _this.createWinHeight()
      }, false)
      // 获取 window 窗口的高度
      this.createWinHeight()
  },
  watch: {
      $route(to, from){
        
      }
  },
  components: {
    AppHeader,
    AppBanner,
    AppFooter
  }
}
</script>

<style>
#app .animated {
  animation-duration: .3s;
}
</style>
