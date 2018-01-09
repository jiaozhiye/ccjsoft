<template>
    <div class="list-page-wrapper w1200">
        <div class="course-box">
            <ul class="clearFix">
                <li v-for="(val, key) in list" :key="key">
                    <a :href="'/courseView/' + val.id">
                        <span class="img_wrapper"><img class="img" :src="val.img_src"></span>
                        <h4 class="text_overflow_cut">{{ val.title }}</h4>
                    </a>
                </li>
            </ul>
            <dl class="no-info" v-if="!totalList.length">暂无数据...</dl>
        </div>
        <div id="page_box"></div>
    </div>
</template>

<script>
import $ from 'jquery'
import 'common/js/page-index.js'

export default {
    name: 'Courseinfo',
    data(){
        return {
            totalList: [],
            list: [],
            totalPage: 0,
            pageIndex: null
        }
    },
    methods: {
        getCoursesList(_cid, callback){
            var _this = this
            this.$http.get('/api/courseList', {
                params: {
                    cid: _cid
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.totalList = response.data.info
                    _this.list = _this.totalList.slice(0, 12)
                    _this.totalPage = Math.ceil(_this.totalList.length / 12)
                } else {
                    _this.totalList = []
                    _this.list = []
                    _this.totalPage = 0
                }
                callback && callback()
            })
            .catch(function (error){
                console.log(error)
            })
        },
        pageIndexFunc(){
            const _this = this

            if (this.totalPage == 0){
                if (this.pageIndex != null){
                    this.pageIndex.remove()
                    this.pageIndex = null
                }
                return
            }

            if (this.pageIndex != null){
                this.pageIndex.update({
                    totalPage: this.totalPage,
                    currentPage: 1
                })
            } else {
                this.pageIndex = new JZY.component.PageIndex({
                    totalPage: this.totalPage,
                    currentPage: 1,
                    maxShowLength: 5,
                    $$wrapper: $('#page_box'),
                    selectIndexCallback: function(index, noPrevIndex, noBackIndex){
                        _this.list = _this.totalList.slice((index - 1) * 12, index * 12)
                    }
                })
            }
            this.pageIndex.init()
        }
    },
    created(){
        const _this = this
        this.getCoursesList(this.$route.params.id, function(){
            // 实例化分页组件
            _this.pageIndexFunc()
        })
    },
    watch: {
        $route(to, from){
            const _this = this
            this.getCoursesList(this.$route.params.id, function(){
                // 更新分页组件
                _this.pageIndexFunc()
            })
        }
    }
}
</script>

<style>
    .course-box {
        min-height: 810px;
    }
    .course-box ul {
        width: 1220px;
    }
    .course-box ul li {
        width: 285px;
        height: 250px;
        float: left;
        margin: 20px 20px 0 0;
    }
    .course-box ul li a {
        display: block;
        overflow: hidden;
    }
    .course-box ul li a > span {
        height: 200px;
    }
    .course-box ul li a > span:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, .7);
        background-image: url(../assets/images/video-play.png);
        background-position: 50% 0;
        background-repeat: no-repeat;
        background-size: 72px 72px;
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .course-box ul li a > h4 {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        background: rgba(255, 255, 255, .1);
    }
    .course-box ul li a:hover > span:after {
        opacity: 1;
        visibility: visible;
        background-position: 50% 50%;
    }

    .course-box .no-info {
        text-align: center;
        padding-top: 100px;
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