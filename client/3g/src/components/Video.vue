<template>
    <div class="video-wrapper">
        <h2 class="title">孵化产品</h2>
        <h4 class="tit-desc">每一次挑战都是在自我超越，只为遇见更好的自己</h4>
        <div class="video-list">
            <ul>
                <a class="vbox" v-for="(val, key) in list" :key="key" :href="'#/videoView/' + val.id" :style="{backgroundImage: 'url('+ val.img_src +')'}">
                    <span>{{ val.title }}</span>
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Video',
    created(){
        const _this = this;
        this.$http.get('/api/videoList', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            list: []
        }
    }
}
</script>

<style>
    .video-wrapper {
        width: 100%;
    }
    .video-wrapper > .title {
        font-size: .4rem;
        color: rgba(255, 255, 255, .9);
        line-height: .8rem;
        text-align: center;
        margin-top: .2rem;
    }
    .video-wrapper > .tit-desc {
        font-size: .25rem;
        line-height: .3rem;
        text-align: center;
        color: rgba(255, 255, 255, .4);
    }
    .video-list {
        padding: 0 .3rem;
        margin: .2rem 0;
        min-height: 2.5rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
    .video-list ul {
        height: 100%;
        font-size: 0;
        white-space: nowrap;
    }
    .video-list ul a.vbox {
        display: inline-block;
        vertical-align: top;
        width: calc((100vw - .6rem)/2 - .15rem);
        height: calc(((100vw - .6rem)/2 - .15rem) * .75);
        margin-right: .3rem;
        position: relative;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }
    .video-list ul a.vbox::before {
        content: "";
        position: absolute;
        left: .15rem;
        bottom: .15rem;
        width: .4rem;
        height: .4rem;
        background: url(../../../src/assets/images/video-play.png) no-repeat;
        background-size: 100% 100%;
        z-index: 2;
    }
    .video-list ul a.vbox::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: .75rem;
        width: 100%;
        background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, .4));
    }
    .video-list ul a.vbox span {
        position: absolute;
        right: .15rem;
        bottom: .25rem;
        color: rgb(255, 255, 255);
        font-size: .24rem;
        z-index: 2;
    }
</style>