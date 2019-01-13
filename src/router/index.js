import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home/home'
import Message from '../page/message/message'
import Create from '../page/create/create'
import User from '../page/user/user'
import Signin from '../page/signin/signin'
import Usero from '../page/user-o/usero'
import All from '../components/all/all'
import Ask from '../components/ask/ask'
import Job from '../components/job/job'
import Good from '../components/good/good'
import Test from '../components/test/test'
import Detail from '../components/detail/topic-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '(/|/home)',
      redirect: '/home/all'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/all',
          component: All
        },
        {
          path: '/home/good',
          component: Good
        },
        {
          path: '/home/dev',
          component: Test
        },
        {
          path: '/home/ask',
          component: Ask
        },
        {
          path: '/home/job',
          component: Job
        }
      ]
    },
    {
      path: '/topic/create',
      component: Create
    },
    {
      path: '/my/message',
      component: Message
    },
    {
      path: '/user/:name',
      component: User,
      meta: {requireAuth:true}
    },
    {
      path: '/sigin',
      component: Signin
    },
    {
      path: '/topic/:id',
      component: Detail
    },
    {
      path: '/usero/:id',
      component: Usero
    }
  ]
})