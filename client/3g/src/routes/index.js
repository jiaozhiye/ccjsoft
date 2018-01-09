import Home from 'components/Home.vue'
import List from 'components/List.vue'
import View from 'components/View.vue'
import VideoView from 'components/VideoView.vue'

const routes = {
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/list/:id',
            component: List
        },
        {
            path: '/view/:id',
            component: View
        },
        {
            path: '/videoView/:id',
            component: VideoView
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
    scrollBehavior (to, from, savedPosition){
        return { x: 0, y: 0 }
    }
}

export default routes