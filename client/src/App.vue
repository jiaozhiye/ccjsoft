<template>
  <div id="app">
    <AppHeader></AppHeader>
    <AppBanner></AppBanner>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
    <AppGotop></AppGotop>
  </div>
</template>

<script>
import 'common/css/reset.css'
import 'common/css/style.css'
import 'common/css/font.css'
import 'animate.css'

import AppHeader from 'components/Header.vue'
import AppBanner from 'components/Banner.vue'
import AppMain from 'components/Main.vue'
import AppFooter from 'components/Footer.vue'
import AppGotop from 'components/Gotop.vue'

export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  components: {
    AppHeader,
    AppBanner,
    AppMain,
    AppFooter,
    AppGotop
  }
}
</script>

<style>
#app {
  overflow: hidden;
}
</style>
