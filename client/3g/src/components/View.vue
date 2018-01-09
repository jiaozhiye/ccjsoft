<template>
    <section>
        <article class="view-wrapper">
            <h3 class="title">{{ detail.title }}</h3>
            <h5 class="desc">创建时间: {{ detail.time | dateTime }}　作者：{{ detail.author }}</h5>
            <div class="content" v-html="detail.content"></div>
        </article>
    </section>  
</template>

<script>
export default {
    name: 'View',
    created(){
        this.detailId = this.$route.params.id
        const _this = this
        this.$http.get('/api/view', {
            params: {
                id: _this.detailId
            }
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.detail = response.data.info
            }
        })
        .catch(function (error){
            console.log(error)
        })
        // 页面滚动条定位
        document.documentElement.scrollTop = 0
    },
    data(){
        return {
            detailId: -1,
            detail: {}
        }
    },
    filters: {
        dateTime(input){
            if (typeof input == 'undefined' || input.length < 8){
                return ''
            } else {
                return input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8)
            }
        }
    }
}
</script>

<style>
    .view-wrapper {
        padding: .2rem .3rem;
    }
    .view-wrapper > .title {
        line-height: .4rem;
        text-align: center;
        font-size: .36rem;
    }
    .view-wrapper > .desc {
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        font-size: .24rem;
    }
    .view-wrapper > .content {
        font-size: .28rem;
        line-height: 2em;
        padding-top: .2rem;
    }
    .view-wrapper > .content img {
        max-width: 100%;
    }
</style>