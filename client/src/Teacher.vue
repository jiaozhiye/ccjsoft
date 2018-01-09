<template>
  <div id="app">
    <AppHeader></AppHeader>
    <AppListBanner></AppListBanner>
    <AppNavigate></AppNavigate>
    <AppTeacherMain></AppTeacherMain>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import 'common/css/reset.css'
import 'common/css/style.css'
import 'common/css/font.css'
import 'animate.css'

import {mapActions, mapGetters} from 'vuex'

import AppHeader from 'components/Header.vue'
import AppListBanner from 'components/ListBanner.vue'
import AppNavigate from 'components/Navigate.vue'
import AppTeacherMain from 'components/TeacherMain.vue'
import AppFooter from 'components/Footer.vue'

export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {
      ...mapActions([
          'createWinHeight', 'createScrollTopHeight'
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
  },
  components: {
    AppHeader,
    AppListBanner,
    AppNavigate,
    AppTeacherMain,
    AppFooter
  }
}
</script>

<style>
#app {
  overflow: hidden;
}
</style>
