<template>
    <section class="list-wrapper">
        <h4 class="colum-title">{{ columTitle }}</h4>
        <div class="list-box">
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
                {{ loadMsg }}
            </dl>
        </div>
    </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'List',
    created(){
        this.getListData()
        // 页面滚动条定位
        document.documentElement.scrollTop = 0
    },
    data(){
        return {
            _cid: -1,
            list: [],
            columTitle: '', // 分类名称
            totail: 0, // 总共多少页
            curIndex: 0, // 当前第几页
            state: 'ready', // 状态变量
            loadMsg: '加载中...'
        }
    },
    computed: {
        ...mapGetters([
            'getScrollTop', 'getWindowHeight'
        ])
    },
    methods: {
        getCid(){
            let _cid = this.$route.params.id
            if (typeof _cid != 'undefined' && _cid > 0){
                this._cid = _cid
            } else {
                this._cid = -1
            }
        },
        getListData(){
            const _this = this

            this.getCid()
            if (this._cid < 0){
                return
            }

            this.$http.get('/api/list', {
                params: {
                    cid: _this._cid
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.list = response.data.info.list
                    _this.totail = response.data.info.totalPage
                    _this.columTitle = _this.list[0].claname
                }
            })
            .catch(function (error){
                console.log(error)
            })
        },
        getPageIndexData(){
            if (this.state != 'ready'){
                return
            }
            this.state = 'stop'
            const _this = this

            if (++this.curIndex >= this.totail){
                this.loadMsg = '已到最后'
                return
            }

            this.getCid()
            if (this._cid < 0){
                return
            }

            this.$http.get('/api/pageindex', {
                params: {
                    cid: _this._cid,
                    pageno: _this.curIndex
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.list = _this.list.concat(response.data.info)
                }
                _this.state = 'ready'
            })
            .catch(function (error){
                console.log(error)
            })
        },
        getPageHeight(){
            return document.body.clientHeight
        },
        lazyLoad(){
            if (this.getPageHeight() - this.getScrollTop - this.getWindowHeight < 50){
                this.getPageIndexData()
            }
        }
    },
    watch: {
        getScrollTop(){
            this.lazyLoad()
        },
        $route(){
            this.getListData()
        }
    }
}
</script>

<style>
    .list-wrapper {

    }

    .colum-title {
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .4rem;
        margin: 0 .3rem;
        border-bottom: 2px solid rgba(255, 255, 255, .3)
    }

    .list-box {
        padding: 0 .3rem;
    }
    .list-box ul li {
        height: 2rem;
        padding: .2rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, .4);
    }
    .list-box ul li:last-child {
        /* border-bottom: none; */
    }
    .list-box ul li > a {
        display: flex;
        height: 100%;
    }
    .list-box ul li > a span {
        width: 1.6rem;
        height: 1.6rem;
    }
    .list-box ul li > a span img {
        height: 100%;
        width: auto;
    }
    .list-box ul li > a .con_right {
        flex: 1;
        margin-left: .25rem;
        display: flex;
        flex-direction: column;
    }
    .list-box ul li > a .con_right h5 {
        font-size: .32rem;
        line-height: .4rem;
        margin-bottom: .1rem;
    }
    .list-box ul li > a .con_right p {
        font-size: .24rem;
        line-height: 1.5em;
        color: rgba(255, 255, 255, .2);
        overflow: hidden;
    }

    .list-box dl {
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .28rem;
    }
</style>