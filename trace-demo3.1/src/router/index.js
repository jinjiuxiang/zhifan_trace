import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  base:"/v4/",
  routes: [
    {
      path: '/',
      name: 'login',
      component:resolve => require(['@/components/login2'],resolve)
    },
    {
      path: '/search',
      name: 'search',
      component:resolve => require(['@/components/search'],resolve)
    },
    {
      path: '/detail',
      name: 'detail',
      component:resolve => require(['@/components/detail'],resolve)
    },
  ]
})
