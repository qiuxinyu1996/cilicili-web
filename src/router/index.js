import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        components: {
            main: () => import('../pages/Index.vue'),
        }
    }
]

const router = new VueRouter({
    routes
})

export default router