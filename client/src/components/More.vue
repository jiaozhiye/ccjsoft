<template>
    <div class="app-more">
        <a @click.stop="handle" :href="linkurl">MORE<i class="lnr lnr-chevron-right"></i></a>
    </div>
</template>

<script>
export default {
    name: 'More',
    props: {
        linkurl: String,
        eventfn: Function
    },
    methods: {
        handle(){
            this.eventfn && this.eventfn()
        }
    }
}
</script>

<style>
    .app-more {
        display: block;
        width: 100%;
        height: 60px;
        padding: 20px 0;
        text-align: center;
    }
    .app-more a {
        display: inline-block;
        width: 298px;
        height: 58px;
        border: 1px solid rgba(255, 255, 255, .8);
        font-size: 18px;
        text-indent: 10px;
        color: rgba(255, 255, 255, .8);
        line-height: 58px;
        -webkit-transition: all .3s ease-out;
        transition: all .3s ease-out;
    }
    .app-more a .lnr-chevron-right {
        position: relative;
        top: 1px;
        left: -10px;
        color: rgba(255,255,255,.0);
        -webkit-transition: all .3s ease-out;
        transition: all .3s ease-out;
    }
    .app-more a:hover {
        background: #e71a1f;
        border-color: #e71a1f;
        color: rgb(255, 255, 255);
        text-indent: -10px;
    }
    .app-more a:hover .lnr-chevron-right {
        left: 10px;
        color: rgb(255, 255, 255);
    }
</style>