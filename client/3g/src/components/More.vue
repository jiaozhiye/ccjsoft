<template>
    <a class="more-btn" :href="link">{{ msg }} <i class="lnr lnr-chevron-right"></i></a>     
</template>

<script>
export default {
    name: 'More',
    props: {
        msg: String,
        link: String
    }
}
</script>

<style>
    .more-btn {
        display: block;
        height: 1rem;
        line-height: 1rem;
        font-size: .36rem;
        text-align: center;
    }
    .more-btn i {
        position: relative;
        top: 2px;
    }
</style>