<template>
    <div class="friend-wrapper">
        <h2 class="title">优秀校友</h2>
        <h4 class="tit-desc">在这我们每天都更新那些关于你的故事</h4>
        <div class="friend-list">
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
    name: 'Friends',
    created(){
        const _this = this;
        this.$http.get('/api/friend', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info.slice(0, 4)
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
                title: '进入优秀校友',
                link: '#/list/4'
            }
        }
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .friend-wrapper {
        width: 100%;
    }
    .friend-wrapper > .title {
        font-size: .4rem;
        color: rgba(255, 255, 255, .9);
        line-height: .8rem;
        text-align: center;
        margin-top: .2rem;
    }
    .friend-wrapper > .tit-desc {
        font-size: .25rem;
        line-height: .4rem;
        text-align: center;
        color: rgba(255, 255, 255, .4);
    }

    .friend-list {
        padding: 0 .3rem;
    }
    .friend-list ul li {
        height: 2rem;
        padding: .2rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, .4);
    }
    .friend-list ul li:last-child {
        /* border-bottom: none; */
    }
    .friend-list ul li > a {
        display: flex;
        height: 100%;
    }
    .friend-list ul li > a span {
        width: 1.6rem;
        height: 1.6rem;
    }
    .friend-list ul li > a .con_right {
        flex: 1;
        margin-left: .25rem;
        display: flex;
        flex-direction: column;
    }
    .friend-list ul li > a .con_right h5 {
        font-size: .32rem;
        line-height: .4rem;
        margin-bottom: .1rem;
    }
    .friend-list ul li > a .con_right p {
        font-size: .24rem;
        line-height: 1.5em;
        color: rgba(255, 255, 255, .2);
        overflow: hidden;
    }
</style>