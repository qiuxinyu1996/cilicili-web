import Vue from 'vue'
import VueRouter from 'vue-router'
import vue from '@/main'
import axios from 'axios'

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
        },
        meta: { isAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        components: {
            main: () => import('../pages/Login.vue'),
        }
    },
    {
        path: '/index',
        name: 'index',
        components: {
            main: () => import('../pages/Index.vue'),
        },
        meta: { isAuth: true }
    },
    {
        path: '/play',
        name: 'play',
        components: {
            main: () => import('../pages/Play.vue'),
        },
        meta: { isAuth: true }
    }
]

const router = new VueRouter({
    routes
})

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    console.log(vue)
    if (to.meta.isAuth) {
        console.log('该页面需要认证')
        axios.post("/api/user/check",{
            token: localStorage.getItem('token')
        }).then(
            (resp) => {
                console.log(resp)
                if(!resp.data.success) {
                    vue.$router.push({name: 'login'})
                    vue.$message.error('您还没有登录~~');
                    console.log('认证失败，请登陆后重试')
                } else {
                    vue.$store.commit('setUser', JSON.parse(localStorage.getItem('userInfo')))
                    next()
                    console.log('认证成功')   
                }
            }
        ).catch(
            (err) => {
                console.log(err)
                vue.$router.push({name: 'login'})
                vue.$message.error('服务器连接异常');
            }
        )
    } else {
        next()
    }
})

export default router