/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by: jzy
 * @Last Modified time: 2017/9/19
 */
import * as types from './types'

const actions = {
    createWinHeight ({commit}){
        commit({
            type: types.WINHEIGHT
        })
    },
    createScrollTopHeight ({commit}, param){
        commit({
            type: types.STHEIGHT,
            st: param
        })
    },
    createNavigation ({commit}, param){
        if (typeof param == 'undefined' || !(param instanceof Array)){
            param = []
        }
        commit({
            type: types.NAVIGATION,
            navLocation: param
        })
    }
}

export default actions
