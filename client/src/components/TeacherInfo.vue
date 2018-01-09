<template>
    <div class="teacher-info w1200">
        <div class="teac-wrapper">
            <ul :style="{transform: 'translate3d(' + moveLen + ', 0, 0)'}">
                <li v-for="(val, key) in list" :key="key">
                    <p class="teac-pic img_wrapper"><img class="img" :src="val.img_src" :alt="val.name"></p>
                    <h3 class="title">
                        {{ val.name }}
                        <span class="sub-title">{{ val.course }}</span>
                    </h3>
                    <div class="teac-con">
                        <div class="teac-box" v-html="val.content"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="teac-range-box">
            <p :style="{transform: 'translateX(' + offsetLeftLen + ')'}"></p>
        </div>
        <div class="teac-bottom">
            <ul class="clearFix">
                <li v-for="(val, key) in list" :key="key" :class="{selected: key == curIndex}">
                    <p><img :src="val.img_src" :alt="val.name"></p>
                    <h4>{{ val.name }}</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

import $ from 'jquery'

export default {
    name: 'Teacherinfo',
    created(){
        const _this = this

        this.createNavigation([{
            title: '师资力量'
        }])

        this.$http.get('/api/teacher', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.list = response.data.info
                _this.totail = response.data.info.length
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            list: [],
            totail: 7,
            curIndex: 0
        }
    },
    computed: {
        offsetLeftLen(){
            var len = 20;
            if (this.totail > 0){
                len = Math.floor(1200 / (this.totail * 2) + this.curIndex * (1200 / this.totail))
            }
            return len + 'px'
        },
        moveLen(){
            return -1 * 1200 * this.curIndex + 'px'
        }
    },
    methods: {
        ...mapActions([
            'createNavigation'
        ])
    },
    updated(){
        if (this.list.length == 0 || this.totail == 0){
            return
        }
        if (typeof this.__ismount__ == 'undefined'){
            const _this = this
            
            $('.teac-bottom').off('click').on('click', 'li', function(ev){
                _this.curIndex = $(this).index()
            })

            this.__ismount__ = 'mounted'
        }
    }
}
</script>

<style>
    .teacher-info {
        min-height: 700px;
        padding-top: 100px;
    }
    .teac-wrapper {
        height: 400px;
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .teac-wrapper ul {
        position: absolute;
        width: 10000px;
        height: 400px;
        left: 0;
        top: 0;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .teac-wrapper ul li {
        width: 1200px;
        height: 100%;
        float: left;
        position: relative;
    }
    .teac-wrapper ul li .teac-pic {
        position: absolute;
        left: 30px;
        top: 0;
        width: 300px;
        height: 300px;
    }
    .teac-wrapper ul li h3.title {
        padding: 30px 0 30px 380px;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        color: #e71a1f;
    }
    .teac-wrapper ul li h3 .sub-title {
        font-size: 12px;
        color: #808080;
        padding-left: 5px;
    }
    .teac-wrapper ul li .teac-con {
        height: 300px;
        background: rgba(255, 255, 255, .2);
    }
    .teac-wrapper ul li .teac-con .teac-box {
        padding: 20px 20px 0 380px;
        font-size: 12px;
        line-height: 30px;
        color: rgba(255, 255, 255, .7);
    }

    .teac-range-box {
        height: 20px;
        position: relative;
    }
    .teac-range-box p {
        position: absolute;
        top: 0;
        left: auto;
        margin-left: -20px;
        width: 40px;
        height: 20px;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .teac-range-box p:after {
        display: block;
        width: 0;
        height: 0;
        border-top: 20px solid rgba(255, 255, 255, .2);
        border-right: 20px solid transparent;
        border-left: 20px solid transparent;
        content: '';
    }

    .teac-bottom {
        height: 170px;
        padding-bottom: 60px;
    }
    .teac-bottom ul {
        height: 100%;
        display: flex;
    }
    .teac-bottom ul li {
        height: 100%;
        flex: auto;
        cursor: default;
    }
    .teac-bottom ul li p {
        width: 106px;
        height: 106px;
        margin: 10px auto 0;
        cursor: pointer;
        overflow: hidden;
    }
    .teac-bottom ul li p img {
        width: 100px;
        height: 100px;
        border: 3px solid #999;
    }
    .teac-bottom ul li h4 {
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        padding-top: 5px;
    }
    .teac-bottom ul li.selected p img {
        border-color: #fff;
    }
    .teac-bottom ul li.selected h4 {
        color: #fff;
    }
</style>