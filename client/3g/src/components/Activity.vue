<template>
    <div class="activity-wrapper">
        <h2 class="title">活动展示</h2>
        <h4 class="tit-desc">你有故事我有酒，与你我他共话天地</h4>
        <div class="activity-list">
            <ul class="clearFix">
                <li v-for="(val, key) in list" :key="key">
                    <a :href="'#/view/' + val.id" class="img_wrapper">
                        <img class="img" :src="val.img_src">
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
    name: 'Activity',
    created(){
        const _this = this;
        this.$http.get('/api/activity', {
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
                title: '进入活动展示',
                link: '#/list/5'
            }
        }
    },
    components: {
        AppMore
    }
}
</script>

<style>
    .activity-wrapper {
        width: 100%;
    }
    .activity-wrapper > .title {
        font-size: .4rem;
        color: rgba(255, 255, 255, .9);
        line-height: .8rem;
        text-align: center;
        margin-top: .2rem;
    }
    .activity-wrapper > .tit-desc {
        font-size: .25rem;
        line-height: .4rem;
        text-align: center;
        color: rgba(255, 255, 255, .4);
    }

    .activity-list {
        padding: 0 .3rem;
    }
    .activity-list ul li {
        float: left;
        width: 50%;
        padding-top: .2rem;
    }
    .activity-list ul li:nth-of-type(2n+1) {
        padding-right: .1rem;
    }
    .activity-list ul li:nth-of-type(2n) {
        padding-left: .1rem;
    }
    
</style>