<template>
    <div class="news-wrapper">
        <h2 class="title">新闻资讯</h2>
        <h4 class="tit-desc">了解吉软最新动态</h4>
        <div class="news-list">
            <ul>
                <li v-for="(val, key) in list" :key="key">
                    <a :href="'#/view/' + val.id">
                        <span class="img_wrapper">
                            <img class="img" :src="val.img_src">
                        </span>
                        <div class="con_right">
                            <h5>{{ val.title }}</h5>
                            <p>{{ val.description }}</p>
                        </div>
                    </a>
                </li>
            </ul>
            <dl>
                <AppMore :msg="moreInfo.title" :link="moreInfo.link"></AppMore>
            </dl>
        </div>
    </div>
</template>

<script>
import AppMore from 'components/More.vue'

export default {
    name: 'News',
    created(){
        const _this = this;
        this.$http.get('/api/newsList', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info.slice(0, 2)
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            list: [],
            moreInfo: {
                title: '进入新闻资讯',
                link: '#/list/1'
            }
        }
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .news-wrapper {
        width: 100%;
    }
    .news-wrapper > .title {
        font-size: .4rem;
        color: rgba(255, 255, 255, .9);
        line-height: .8rem;
        text-align: center;
        margin-top: .2rem;
    }
    .news-wrapper > .tit-desc {
        font-size: .25rem;
        line-height: .4rem;
        text-align: center;
        color: rgba(255, 255, 255, .4);
    }

    .news-list {
        padding: 0 .3rem;
    }
    .news-list ul li {
        height: 2rem;
        padding: .2rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, .4);
    }
    .news-list ul li:last-child {
        /* border-bottom: none; */
    }
    .news-list ul li > a {
        display: flex;
        height: 100%;
    }
    .news-list ul li > a span {
        width: 1.6rem;
        height: 1.6rem;
    }
    .news-list ul li > a .con_right {
        flex: 1;
        margin-left: .25rem;
        display: flex;
        flex-direction: column;
    }
    .news-list ul li > a .con_right h5 {
        font-size: .32rem;
        line-height: .4rem;
        margin-bottom: .1rem;
    }
    .news-list ul li > a .con_right p {
        font-size: .24rem;
        line-height: 1.5em;
        color: rgba(255, 255, 255, .2);
        overflow: hidden;
    }
</style>