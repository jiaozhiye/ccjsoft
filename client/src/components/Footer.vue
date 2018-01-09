<template>
    <footer class="footer">
        版权所有：{{ copy }}
    </footer>
</template>

<script>

export default {
    name: 'Footer',
    data(){
        return {
            copy: '吉软国际 Copyright (c) 2013 All Rights Reserved V 1.8.5 吉ICP备12000318号-1'
        }
    },
    created(){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?8e5cf96c6915c5c67cc24baeaff6d573";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
        })();
    }
}
</script>

<style>
    .footer {
        position: relative;
        height: 44px;
        line-height: 44px;
        background: rgb(33, 33, 33);
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, .4);
    }
</style>