<template>
    <section>
        <article class="view-wrapper">
            <h3 class="title">{{ detail.title }}</h3>
            <h5 class="desc">创建时间: {{ detail.time | dateTime }}　作者：{{ detail.author }}</h5>
            <div class="content">
                <div class="prism-player" id="J_prismPlayer"></div>
            </div>
            <AppBreak></AppBreak>
            <h4 class="about-video">相关视频</h4>
            <div class="video-box">
                <ul class="clearFix">
                    <li v-for="(val, key) in list" :key="key">
                        <a :href="'#/videoView/' + val.id" :style="{backgroundImage: 'url('+ val.img_src +')'}">
                            <span>{{ val.title }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </article>
    </section>
</template>

<script>
import AppBreak from 'components/Break.vue'

export default {
    name: 'Video-view',
    created(){
        this.detailId = this.$route.params.id
        this.getDetailInfo(this.aliplayer)
        this.getVideoList()
    },
    data(){
        return {
            detailId: -1,
            detail: {},
            list: [],
            player: null
        }
    },
    watch :{
        $route(){
            this.detailId = this.$route.params.id
            this.getDetailInfo(this.aliplayer)
        }
    },
    methods: {
        aliplayer(_videoSrc){
            if (this.player == null){
                /* aliplayer */
                this.player = new Aliplayer({
                    id: 'J_prismPlayer',
                    autoplay: true,
                    isLive: false,
                    playsinline: true,
                    width: '100%',
                    height: '100%',
                    controlBarVisibility: 'always',
                    useH5Prism: true,
                    useFlashPrism: false,
                    source: _videoSrc,
                    skinLayout: [
                        {
                            "name": "controlBar",
                            "align": "blabs",
                            "x": 0,
                            "y": 0,
                            "children": [
                                {"name":"progress","align":"tlabs","x":0,"y":0},
                                {"name":"playButton","align":"tl","x":15,"y":26},
                                {"name":"fullScreenButton","align":"tr","x":20,"y":25},
                                {"name":"timeDisplay","align":"tl","x":10,"y":24},
                                {"name":"volume","align":"tr","x":20,"y":25}
                            ]
                        }
                    ]
                }, function(player){})
            } else {
                this.player.loadByUrl(_videoSrc)
            }
        },
        getDetailInfo(callback){
            const _this = this
            this.$http.get('/api/view', {
                params: {
                    id: _this.detailId
                }
            })
            .then(function (response){
                if (response.data.errCode == 1){
                    _this.detail = response.data.info
                    const vsrc = _this.detail.content.match(/src=\"([^\"]+)\"/)[1]
                    callback && callback(vsrc)
                }
            })
            .catch(function (error){
                console.log(error)
            })
        },
        getVideoList(){
            const _this = this
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
    components: {
        AppBreak
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
        padding: .2rem 0;
    }
    .view-wrapper > .content img {
        max-width: 100%;
    }

    .about-video {
        height: .8rem;
        line-height: .8rem;
        font-size: .32rem;
    }

    .video-box {}
    .video-box ul li {
        float: left;
        width: 50%;
        height: calc(((100vw - .6rem)/2 - .1rem) * .75);
        padding-top: .2rem;
    }
    .video-box ul li:nth-of-type(2n+1) {
        padding-right: .1rem;
    }
    .video-box ul li:nth-of-type(2n) {
        padding-left: .1rem;
    }
    .video-box ul li a {
        display: block;
        height: 100%;
        vertical-align: top;
        position: relative;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }
    .video-box ul li a::before {
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
    .video-box ul li a::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: .75rem;
        width: 100%;
        background: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, .4));
    }
    .video-box ul li a span {
        position: absolute;
        right: .15rem;
        bottom: .25rem;
        color: rgb(255, 255, 255);
        font-size: .24rem;
        z-index: 2;
    }

    /* aliplayer */
    .prism-player .prism-big-play-btn{width:90px;height:90px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -2px -2px no-repeat}.prism-player .prism-play-btn{width:27px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -2px -250px no-repeat}.prism-player .prism-live-display{width:56px;height:19px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -186px -2px no-repeat}.prism-player .prism-play-btn.playing{width:27px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -208px -269px no-repeat}.prism-player .prism-fullscreen-btn{width:30px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -124px -190px no-repeat}.prism-player .prism-fullscreen-btn.fullscreen{width:30px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -161px -183px no-repeat}.prism-player .prism-volume{width:33px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -199px -119px no-repeat}.prism-player .prism-volume.mute{width:33px;height:30px;background:url(//gw.alicdn.com/tps/TB1YuE3KFXXXXaAXFXXXXXXXXXX-256-512.png) -164px -151px no-repeat}.prism-player{background-color:#000;position:relative}.prism-player .prism-ErrorMessage,.prism-player .prism-cover{width:100%;height:100%;background-color:#000;background-repeat:no-repeat;background-position:center;background-size:contain;position:absolute;top:0;left:0}.prism-player a{text-decoration:none}.prism-player .x5-full-screen{object-fit:fill;object-position:50% 50%}.prism-player .x5-top-left{object-fit:contain;object-position:0 0}.prism-player .prism-ErrorMessage{z-index:99;display:none}.prism-player .prism-ErrorMessage .prism-error-content{margin-top:20px;padding:0 5px}.prism-player .prism-ErrorMessage .prism-error-content p{text-align:center;font-size:12px;color:#fff}.prism-player .prism-ErrorMessage .prism-error-operation{margin-top:10px;margin-bottom:10px;padding-bottom:5px;border-bottom:1.5px;border-bottom-color:rgba(255,255,255,.15);border-bottom-style:dotted;text-align:center}.prism-player .prism-ErrorMessage .prism-error-operation a{width:72px;height:32px;line-height:32px;vertical-align:top;display:inline-block;margin-left:10px}.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh{color:#21c5e0;border:1px solid #21c5e0}.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:hover{color:#05d3f5;border-color:#05d3f5;cursor:pointer}.prism-player .prism-ErrorMessage .prism-error-operation a.prism-button-refresh:active{color:#026a7b;border-color:#026a7b}.prism-player .prism-ErrorMessage .prism-error-operation .prism-button-orange:visited{color:#05d3f5}.prism-player .prism-ErrorMessage .prism-detect-info{color:#fff;font-size:10px}.prism-player .prism-ErrorMessage .prism-detect-info p{padding:0 5px;word-break:break-all;margin:0 0 4px}.prism-player .prism-ErrorMessage .prism-detect-info span.info-label{display:inline-block;font-weight:700}.prism-player .prism-ErrorMessage .prism-detect-info span.info-content{color:gray}.prism-player .prism-big-play-btn{z-index:1000}.prism-player .prism-controlbar{width:100%;height:61px;position:relative;z-index:1}.prism-player .prism-controlbar .prism-controlbar-bg{background:rgba(0,0,0,.6);width:100%;height:50px;position:absolute;bottom:0;left:0;z-index:-1}.prism-player .prism-time-display{height:33px;line-height:33px;color:#666}.prism-player .prism-time-display .current-time{color:#fff}.prism-player .prism-progress{cursor:pointer;width:100%;height:6px;margin-top:5px;background-color:#363636;position:relative}.prism-player .prism-progress .prism-progress-loaded{position:absolute;top:0;left:0;width:0;height:100%;background-color:#7e2c1f}.prism-player .prism-progress .prism-progress-played{position:absolute;top:0;left:0;width:0;height:100%;background-color:#ee2a10}.prism-player .prism-progress .prism-progress-cursor{position:absolute;width:8px;height:8px;top:-5px;background-color:#5b5b5b;border:4px solid #fff;border-radius:8px;-webkit-box-shadow:0 0 5px #000;box-shadow:0 0 5px #000;overflow:hidden;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.prism-player .prism-loading{width:55px;height:55px;margin-top:-27px!important;margin-left:-27px!important}.prism-player .prism-loading .circle{background-color:rgba(0,0,0,0);border:5px solid;border-color:rgba(0,193,222,.2) rgba(0,193,222,.5) rgba(0,193,222,.7) rgba(0,193,222,.1);opacity:.9;border-radius:50px;width:45px;height:45px;margin:0 auto;-moz-animation:spinoffPulse .9s infinite linear;-webkit-animation:spinoffPulse .9s infinite linear}.prism-player .prism-hide{display:none}.prism-player .prism-snapshot-btn{color:#fff;border-color:#fff;border-width:1px;border-style:solid;padding:2px 5px;border-radius:4px}.prism-player .prism-snapshot-btn:hover{border-color:#e5e5e5;color:#e5e5e5;cursor:pointer}.prism-player .prism-snapshot-btn:active{color:#777;border-color:#777;cursor:pointer}.prism-player .prism-info-display{width:100%;color:#fff;font-size:20px;text-align:center;top:50%;position:absolute;z-index:900}@-moz-keyframes spinoffPulse{0%{-moz-transform:rotate(0)}100%{-moz-transform:rotate(360deg)}}@-webkit-keyframes spinoffPulse{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}:-webkit-full-screen{width:100%!important;height:100%!important}:-moz-full-screen{width:100%!important;height:100%!important}:-ms-full-screen{width:100%!important;height:100%!important}:-ms-fullscreen{width:100%!important;height:100%!important}:fullscreen{width:100%!important;height:100%!important}body.prism-full-window{padding:0;margin:0;height:100%;overflow-y:auto}.prism-fullscreen{position:fixed;overflow:hidden;z-index:99999;left:0!important;top:0!important;bottom:0!important;right:0!important;width:100%!important;height:100%!important}.prism-button{cursor:pointer;text-align:center;text-shadow:0 1px 1px rgba(0,0,0,.3);-webkit-border-radius:.5em;-moz-border-radius:.5em;border-radius:.5em;-webkit-box-shadow:0 1px 2px rgba(0,0,0,.2);-moz-box-shadow:0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 2px rgba(0,0,0,.2)}.prism-button-orange{color:#a56117;border:1px solid #a56117}.prism-button-orange:active,.prism-button-orange:hover{color:#d67400;border-color:#d67400}.prism-button-orange:visited{color:#d67400}.prism-center{position:absolute;left:50%;transform:translateX(-50%)}.prism-width90{width:90%}.prism-stream-selector{font-size:14px}.prism-stream-selector .current-stream-selector{color:#fff;background:#363636;border-radius:4px;text-align:center;width:70px;padding:2px 5px;display:none}.prism-stream-selector .current-stream-selector:hover{cursor:pointer;font-weight:700}.prism-stream-selector .stream-selector-tip{color:#fff;text-align:center;padding:2px 5px;display:none;position:absolute;bottom:61.5px;white-space:nowrap;left:43%;font-size:18px}.prism-speed-selector .speed-selector-list,.prism-stream-selector .stream-selector-list{position:absolute;bottom:28.5px;border-radius:4px;background:#363636;display:none;border-bottom-color:#faebd7;border-bottom-width:2px;border-bottom-style:solid}.prism-stream-selector .stream-selector-list{width:70px;color:#fff;padding:5px}.prism-stream-selector .stream-selector-list li{list-style-type:none;text-align:center;white-space:nowrap;padding:2px}.prism-stream-selector .stream-selector-list li span.current,.prism-stream-selector .stream-selector-list li.current{color:red}.prism-stream-selector .stream-selector-list li:hover{cursor:pointer;color:red}.prism-speed-selector{font-size:14px}.prism-speed-selector .current-speed-selector{color:#fff;background:#363636;border-radius:4px;text-align:center;width:75px;padding:2px 5px}.prism-speed-selector .current-speed-selector:hover{cursor:pointer;font-weight:700}.prism-speed-selector .speed-selector-list{width:75px;color:#fff;padding:5px}.prism-speed-selector .speed-selector-list li{list-style-type:none;text-align:center;white-space:nowrap;padding:2px}.prism-speed-selector .speed-selector-list li span.current,.prism-speed-selector .speed-selector-list li.current{color:red}.prism-speed-selector .speed-selector-list li:hover{cursor:pointer;color:red}

</style>