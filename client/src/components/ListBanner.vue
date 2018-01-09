<template>
    <div class="list-banner">
        <div class="list-banner-bg"></div>
    </div>
</template>

<script>
export default {
    name: 'Listbanner',
    data(){
        return {
            
        }
    }
}
</script>

<style>
    .list-banner {
        height: 650px;
        width: 100%;
        overflow: hidden;
    }
    .list-banner .list-banner-bg {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-attachment: fixed;
        background-image: url(../assets/images/list-banner.jpg);
    }
</style>