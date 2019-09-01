import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Readme from '@/views/Readme.vue'
import Roman from '@/views/Roman.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/roman/sorting',
      name: 'roman',
      component: Roman
    },
    {
      // using children in route for dynamic route
      path: '/:username',
      component: {
        render(c) {
          return c('router-view');
        }
      },
      children: [
        {
          path: '',
          name: 'user',
          component: User
        },
        {
          path: ':project',
          name: 'readme',
          component: Readme
        },
      ]
    },
  ]
})
