<template>
    <nav class="nav fr">
        <ul>
            <li>
                <a href="/list/1"><span data-title="新闻资讯">新闻资讯</span></a>
            </li>
            <li>
                <a href="/course/#/7"><span data-title="课程视频">课程视频</span></a>
            </li>
            <li>
                <a href="http://a.51jsoft.com" target="_blank"><span data-title="论坛">论坛</span></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style>
    .nav {
        height: 100%;
    }
    .nav ul li {
        height: 60px;
        float: left;
        position: relative;
    }
    .nav ul li > a {
        display: block;
        height: 40px;
        line-height: 40px;
        position: relative;
        top: 10px;
        padding: 0 12px;
        /*font-size: 16px;*/
        overflow: hidden;
    }

    .nav ul li > a span {
        color: #808080;
        position: relative;
        display: block;
        -webkit-transition: -webkit-transform .3s linear;
        transition: transform .3s linear;
    }

    .nav ul li > a span:before {
        content: attr(data-title);
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        text-align: center;
    }

    .nav ul li:hover > a span {
        color: #fff;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
</style>