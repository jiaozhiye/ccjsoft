<template>
    <div class="list-page-wrapper w1200">
        <div class="list-wrapper">
            <ul class="clearFix">
                <li v-for="(val, key) in list" :key="key">
                    <a :href="'/view/' + val.id" class="view">
                        <span class="img_wrapper fl">
                            <img class="img" :src="val.img_src">
                        </span>
                        <h3 class="fr">{{ val.title }}</h3>
                        <p class="fr">{{ val.description | cutString }}</p>
                    </a>
                    <div class="list-bottom">
                        <dl>
                            <h4>作者：{{ val.author }}</h4>
                            <h5>{{ val.time | dateTime }}</h5>
                        </dl>
                        <a :href="'/view/' + val.id" class="more">
                            <span>
                                <i class="lnr lnr-chevron-right"></i><i class="lnr lnr-arrow-right"></i>
                            </span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div id="page_box"></div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

import 'common/js/url_operation.js'
import $ from 'jquery'
import 'common/js/page-index.js'
export default {
    name: 'Listinfo',
    created(){
        const _this = this
        this.$http.get('/api/list', {
            params: {
                cid: _this.classifyId
            }
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info.list
                _this.totail = response.data.info.totalPage

                _this.createNavigation([{
                    title: _this.list[0].claname
                }])
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            classifyId: JZY.util.urlOperation.getPathParams(),
            list: [],
            totail: 0
        }
    },
    filters: {
        dateTime(input){
            return input.slice(0, 4) + '-' + input.slice(4, 6) + '-' + input.slice(6, 8)
        },
        cutString(input){
            return JZY.util.cutstring(input, 240)
        }
    },
    methods: {
        ...mapActions([
            'createNavigation'
        ]),
        getListData(index){
            const _this = this
            this.$http.get('/api/pageindex', {
                params: {
                    cid: _this.classifyId,
                    pageno: index
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.list = response.data.info
                }
            })
            .catch(function (error){
                console.log(error)
            })
        }
    },
    updated(){
        if (this.list.length == 0 || this.totail == 0){
            return
        }
        if (typeof this.__ismount__ == 'undefined'){
            const _this = this
            // 实例化分页组件
            const pageIndex = new JZY.component.PageIndex({
                totalPage: this.totail,
                currentPage: 1,
                maxShowLength: 5,
                $$wrapper: $('#page_box'),
                selectIndexCallback: function(index, noPrevIndex, noBackIndex){
                    _this.getListData(index - 1)
                }
            })
            pageIndex.init()
            this.__ismount__ = 'mounted'
        }
    }
}
</script>

<style>
    .list-page-wrapper {}
    .list-wrapper {
        min-height: 840px;
    }
    .list-wrapper ul {
        width: 1240px;
        overflow: hidden;
    }
    .list-wrapper ul li {
        width: 588px;
        height: 348px;
        float: left;
        border: 1px solid rgba(255, 255, 255, .2);
        margin: 70px 30px 0 0;
        position: relative;
    }
    .list-wrapper ul li .view {
        display: block;
        height: 200px;
        padding: 30px;
    }
    .list-wrapper ul li .view span {
        display: block;
        width: 200px;
        height: 200px;
    }
    .list-wrapper ul li .view span > .img {
        height: 100%;
        width: auto;
        -webkit-transition: all .4s ease-out;
        transition: all .4s ease-out;
    }
    .list-wrapper ul li .view h3 {
        width: 290px;
        line-height: 26px;
        padding: 20px 0;
        font-size: 24px;
        font-weight: bold;
        color: #808080;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .list-wrapper ul li .view p {
        width: 290px;
        line-height: 24px;
        color: #808080;
    }
    .list-wrapper ul li .view:hover h3 {
        color: #0554d7;
    }
    .list-wrapper ul li .view:hover span > .img {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .list-wrapper ul li .list-bottom {
        width: 100%;
        height: 80px;
        background: rgba(255, 255, 255, .2);
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .list-wrapper ul li .list-bottom dl {
        width: 50%;
        float: left;
    }
    .list-wrapper ul li .list-bottom dl h4 {
        font-size: 16px;
        font-weight: bold;
        padding: 18px 0 0 20px;
    }
    .list-wrapper ul li .list-bottom dl h5 {
        font-size: 14px;
        padding: 4px 0 0 20px;
    }
    .list-wrapper ul li .list-bottom .more {
        display: block;
        width: 50px;
        height: 50px;
        color: #808080;
        border: 1px solid #808080;
        float: right;
        margin: 14px 20px 0 0;
        overflow: hidden;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .list-wrapper ul li .list-bottom .more > span {
        display: block;
        position: relative;
        -webkit-transition: all .4s ease-out;
        transition: all .4s ease-out;
    }
    .list-wrapper ul li .list-bottom .more > span > .lnr {
        display: block;
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 25px;
        -webkit-transform: scale(1, .8);
        transform: scale(1, .8);
    }
    .list-wrapper ul li .list-bottom .more:hover {
        color: #0554d7;
        border-color: #0554d7;
    }
    .list-wrapper ul li .list-bottom .more:hover > span {
        -webkit-transform: translate3d(0, -50px, 0);
        transform: translate3d(0, -50px, 0);
    }

    #page_box {
        padding: 40px 0;
    }
    /*
    * pager index
    */
    .JZY_page_index {
        line-height: 35px;
        text-align: center;
        color: #808080;
    }
    .JZY_page_index * {
        font-family: simsun;
        font-size: 12px;
        padding: 0;
        margin: 0;
    }
    .JZY_page_index .JZY_page_number,
    .JZY_page_index .JZY_page_number li,
    .JZY_page_index input {
        text-align: center;
        display: inline-block;
        border-radius: 2px;
    }
    .JZY_page_index .JZY_page_number,
    .JZY_page_index .JZY_page_number li,
    .JZY_page_index button,
    .JZY_page_index input {
        vertical-align: top;
    }
    .JZY_page_index .JZY_page_number li {
        margin: 0 2px;
    }
    .JZY_page_index .JZY_page_number .JZY_index,
    .JZY_page_index button,
    .JZY_page_index input {
        width: 35px;
        height: 35px;
        margin: 0 2px;
        cursor: pointer;
        box-sizing: border-box;
    }
    .JZY_page_index .JZY_page_number .JZY_index:focus,
    .JZY_page_index button:focus,
    .JZY_page_index input:focus {
        outline: none;
    }
    .JZY_page_index input {
        cursor: auto;
        color: #808080;
        background: rgba(255, 255, 255, .2);
    }
    .JZY_page_index button {
        width: auto;
        padding: 0 15px;
        background: none;
        color: #808080;
    }
    .JZY_page_index .JZY_index,
    .JZY_page_index button,
    .JZY_page_index input {
        border: solid 1px #808080;
    }
    .JZY_page_index .JZY_page_number .JZY_index,
    .JZY_page_index .JZY_page_prev,
    .JZY_page_index .JZY_page_next,
    .JZY_page_index .JZY_page_jump {
        background: rgba(255, 255, 255, .2);
        color: #808080;
    }
    .JZY_page_index .JZY_page_number .JZY_index.JZY_current_index {
        color: #fff;
        border: none;
        background: none;
    }
    .JZY_page_index .JZY_total_page {
        margin-left: 15px;
        margin-right: 10px;
    }
    .JZY_page_index .JZY_page_jump {
        margin-left: 10px;
        margin-right: 0;
    }
</style>