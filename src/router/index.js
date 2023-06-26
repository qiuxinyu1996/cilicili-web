import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        components: {
            main: () => import('../pages/Index.vue'),
        }
    },
    {
        path: '/index',
        name: 'index',
        components: {
            main: () => import('../pages/Index.vue'),
        }
    },
    {
        path: '/play',
        name: 'play',
        components: {
            main: () => import('../pages/Play.vue'),
        }
    }
]

const router = new VueRouter({
    routes
})

export default router