<template>
  <section>
    <AppNews></AppNews>
    <AppBreak></AppBreak>
    <AppVideo></AppVideo>
    <AppBreak></AppBreak>
    <AppFriend></AppFriend>
    <AppBreak></AppBreak>
    <AppActivity></AppActivity>
    <AppBreak></AppBreak>
    <AppContact></AppContact>
  </section>
</template>

<script>
import AppNews from 'components/News.vue'
import AppBreak from 'components/Break.vue'
import AppVideo from 'components/Video.vue'
import AppFriend from 'components/Friend.vue'
import AppActivity from 'components/Activity.vue'
import AppContact from 'components/Contact.vue'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    AppNews,
    AppBreak,
    AppVideo,
    AppFriend,
    AppActivity,
    AppContact
  }
}
</script>

<style>

</style>