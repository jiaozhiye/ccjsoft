/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by: jzy
 * @Last Modified time: 2017/9/19
 */
const getters = {
    getWindowHeight (state){
        return state.winHeight
    },
    getScrollTop (state){
        return state.stHeight
    },
    getNavLocation (state){
        var locationStr = ''
        for (var i = 0; i < state.navLocation.length; i++){
            if (typeof state.navLocation[i].link != 'undefined' && state.navLocation[i].link != ''){
                locationStr += ' - ' + '<a href="'+ state.navLocation[i].link +'">'+ state.navLocation[i].title +'</a>'
            } else {
                locationStr += ' - ' + state.navLocation[i].title
            }
        }
        return locationStr
    }
}

export default getters
