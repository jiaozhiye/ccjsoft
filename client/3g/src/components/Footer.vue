<template>
    <footer class="footer">{{ copy }}</footer>
</template>

<script>
export default {
    name: 'Footer',
    data(){
        return {
            copy: '吉软国际 Copyright (c) 吉ICP备12000318号-1'
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
        background: #212121;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .24rem;
    }
</style>