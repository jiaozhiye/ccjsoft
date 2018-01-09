/**
 * @Author: jzy
 * @Date: 2017/9/19
 * @Last Modified by:   jzy
 * @Last Modified time: 2017-12-06 12:23:34
 */
import AppCourseInfo from 'components/CourseInfo.vue'

const routes = {
    routes: [
        {
            path: '/:id',
            component: AppCourseInfo
        },
        {
            path: '*',
            redirect: '/7'
        }
    ]
}

export default routes