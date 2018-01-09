<template>
    <section>
        <div class="course-classify w1200">
            <ul>
                <router-link tag="a" v-for="(val, key) in navList" :to="'/' + val.id">{{ val.title }}</router-link>
            </ul>
        </div>
        <div class="course-view w1200">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <router-view></router-view>
            </transition>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Courseroute',
    created(){
        this.createNavigation([{
            title: '课程视频'
        }])

        var _this = this
        this.$http.get('/api/courseClass', {
            params: {}
        })
        .then(function (response){
            if (response.data.errCode == 1){
                _this.navList = response.data.info
            }
        })
        .catch(function (error){
            console.log(error)
        })
    },
    data(){
        return {
            navList: []
        }
    },
    methods: {
        ...mapActions([
            'createNavigation'
        ])
    },
}
</script>

<style>
    .course-classify {
        height: 36px;
        padding: 40px 0;
        text-align: center;
    }
    .course-classify ul {
        height: 100%;
    }
    .course-classify ul a {
        display: inline-block;
        line-height: 34px;
        padding: 0 16px;
        border: 1px solid #808080;
        color: #808080;
        font-size: 12px;
        margin: 0 4px;
        -webkit-transition: all .4s ease;
        transition: all .4s ease;
    }
    .course-classify ul a:hover,
    .course-classify ul a.router-link-active {
        background: #e90500;
        border-color: #e90500;
        color: #fff;
    }
    .course-view {

    }
</style>