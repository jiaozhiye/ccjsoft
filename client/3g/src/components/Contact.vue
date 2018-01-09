<template>
    <div class="contact-wrapper">
        <h2 class="title">联系我们</h2>
        <div class="contact-list">
            <ul>
                <li v-for="(val, key) in list" :key="key">{{ val }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data(){
        return {
            list: [
                '总部：吉林省长春市卫星路星城国际B座1700',
                '高新校区：飞跃路东北亚文化创意科技园D栋4F',
                '净月校区：净月大学城复地嘉年华A1栋4F',
                '咨询热线：400-618-0431'
            ]
        }
    }
}
</script>

<style>
    .contact-wrapper {
        width: 100%;
    }
    .contact-wrapper > .title {
        font-size: .4rem;
        color: rgba(255, 255, 255, .9);
        line-height: .8rem;
        text-align: center;
        margin-top: .2rem;
    }
    .contact-wrapper > .tit-desc {
        font-size: .25rem;
        line-height: .4rem;
        text-align: center;
        color: rgba(255, 255, 255, .4);
    }

    .contact-list {
        padding: .3rem .3rem 0;
    }
    .contact-list ul li {
        height: .6rem;
        height: .6rem;
        font-size: .24rem;
        text-align: center;
    }
</style>