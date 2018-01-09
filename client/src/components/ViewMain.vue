<template>
    <section class="main">
        <article class="view-wrapper w1200">
            <h2 class="title">{{ detail.title }}</h2>
            <span class="arc-descinfo">创建时间: {{ detail.time | dateTime }}　作者：{{ detail.author }}</span>
            <div class="content" v-html="detail.content"></div>
        </article>
        <AppContact></AppContact>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

import 'common/js/url_operation.js'
import AppContact from 'components/Contact.vue'

export default {
    name: 'Viewmain',
    created(){
        const _this = this
        this.$http.get('/api/view', {
            params: {
                id: _this.detailId
            }
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.detail = response.data.info
                _this.createNavigation([
                    {
                        title: _this.detail.claname,
                        link: '/list/' + _this.detail.classid
                    },
                    {
                        title: _this.detail.title
                    }
                ])
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            detailId: JZY.util.urlOperation.getPathParams(),
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
    },
    methods: {
        ...mapActions([
            'createNavigation'
        ])
    },
    components: {
        AppContact
    }
}
</script>

<style>
    .main {
        width: 100%;
        background: rgb(17, 17, 17);
        position: relative;
    }
    .view-wrapper {
        padding: 50px 0;
    }
    .view-wrapper > h2 {
        line-height: 26px;
        padding: 20px 0 10px;
        font-size: 24px;
        font-weight: bold;
        color: #808080;
        text-align: center;
    }
    .view-wrapper > .arc-descinfo {
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #808080;
        font-size: 12px;
    }
    .view-wrapper > .content {
        font-size: 16px;
        line-height: 34px;
        min-height: 800px;
        padding: 40px 0;
        overflow: hidden;
    }
</style>