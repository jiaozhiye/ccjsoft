<template>
    <section class="main">
        <AppListInfo></AppListInfo>
        <AppContact></AppContact>
    </section>
</template>

<script>
import AppListInfo from 'components/ListInfo.vue'
import AppContact from 'components/Contact.vue'

export default {
    name: 'Listmain',
    data(){
        return {
            
        }
    },
    components: {
        AppListInfo,
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