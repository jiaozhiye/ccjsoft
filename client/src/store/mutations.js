/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by: jzy
 * @Last Modified time: 2017/9/19
 */
import * as types from './types'

const mutations = {
    [types.WINHEIGHT](state){
        state.winHeight = window.innerHeight
    },
    [types.STHEIGHT](state, param){
        state.stHeight = param.st
    },
    [types.NAVIGATION](state, param){
        state.navLocation = param.navLocation
    }
}

export default mutations