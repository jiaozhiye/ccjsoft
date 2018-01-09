<template>
    <section class="main">
        <AppTeacherInfo></AppTeacherInfo>
        <AppContact></AppContact>
    </section>
</template>

<script>
import AppTeacherInfo from 'components/TeacherInfo.vue'
import AppContact from 'components/Contact.vue'

export default {
    name: 'Teachermain',
    data(){
        return {
            
        }
    },
    components: {
        AppTeacherInfo,
        AppContact
    }
}
</script>

<style>
    .main {
        width: 100%;
        background: rgb(17, 17, 17);
        position: relative;
    }
</style>