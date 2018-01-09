<template>
    <section class="main">
        <article class="view-wrapper w1200">
            <div class="video-box fl">
                <video :src="detail.description" controls width="100%" id="video"></video>
            </div>
            <div class="course-video-list fr">
                <ul>
                    <li class="text_overflow_cut" v-for="(val, key) in courseList" :key="key" :class="{selected: val.id == detailId}" @click.stop="handleClick(val.id)">
                        <i class="lnr lnr-camera-video"></i>
                        <span>{{ (key+1) + '.' + val.title }}</span>
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
            <div class="course-content" v-html="detail.content"></div>
        </article>
        <AppContact></AppContact>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

import 'common/js/url_operation.js'
import AppContact from 'components/Contact.vue'
import $ from 'jquery'

export default {
    name: 'Courseviewmain',
    created(){
        const _this = this
        this.getDetailData(this.detailId, function(){
            _this.createNavigation([
                {
                    title: _this.detail.claname,
                    link: '/course/#/' + _this.detail.classid
                },
                {
                    title: _this.detail.title
                }
            ])
            // 获取分类下视频列表
            _this.getCourseList(_this.detail.classid, function(){
                _this.setActiveStyle()
            })
        })
        // 页面滚动条定位
        setTimeout(function(){
            $('html').scrollTop(600)
        }, 0)
    },
    data(){
        return {
            detailId: JZY.util.urlOperation.getPathParams(),
            detail: {},
            courseList: []
        }
    },
    methods: {
        ...mapActions([
            'createNavigation'
        ]),
        getDetailData(_id, callback){
            const _this = this
            this.$http.get('/api/view', {
                params: {
                    id: _id
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.detail = response.data.info
                    callback && callback()
                }
            })
            .catch(function (error){
                console.log(error)
            })
        },
        getCourseList(_cid, callback){
            const _this = this
            this.$http.get('/api/courseList', {
                params: {
                    cid: _cid
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.courseList = response.data.info
                    callback && callback()
                }
            })
            .catch(function (error){
                console.log(error)
            })
        },
        handleClick(_id){
            this.getDetailData(_id)
            let oTar = event.target
            while (oTar != null && oTar.nodeName != 'LI'){
                oTar = oTar.parentNode
            }
            $(oTar).addClass('selected').siblings().removeClass('selected')
        },
        setActiveStyle(){
            setTimeout(function(){
                let t = $('.course-video-list').find('li.selected').get(0).offsetTop
                $('.course-video-list').scrollTop(t)
            }, 0)
        }
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
    .video-box {
        width: 860px;
        height: 484px;
    }
    video::-internal-media-controls-download-button {
        display: none;
    }
    video::-webkit-media-controls-enclosure {
        overflow: hidden;
    }
    video::-webkit-media-controls-panel {
        width: calc(100% + 30px); 
    }
    .course-video-list {
        width: 310px;
        height: 484px;
        position: relative;
        overflow-y: auto;
    }
    .course-video-list ul li {
        height: 36px;
        line-height: 36px;
        padding: 0 5px 0 10px;
        background: rgba(255, 255, 255, .2);
        margin-bottom: 4px;
        cursor: pointer;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .course-video-list ul li span {
        position: relative;
        top: -1px;
    }
    .course-video-list ul li:hover,
    .course-video-list ul li.selected {
        color: rgb(231, 26, 31);
    }
    .course-content {
        width: 860px;
        min-height: 500px;
        padding: 40px 0;
        font-size: 16px;
        line-height: 34px;
        overflow: hidden;
    }
</style>