import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  base:"/v3/",
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component:resolve => require(['@/components/index'],resolve)
    },
    {
      path: '/index',
      name: 'index2',
      component:resolve => require(['@/components/index2'],resolve)
    },
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
    {
      path: '/newty',
      name: 'newty',
      component:resolve => require(['@/components/newWay'],resolve)
    },
    {
      path: '/newT',
      name: 'newT',
      component:resolve => require(['@/components/newT'],resolve)
    },
    {
      path: '/antV',
      name: 'antV',
      component:resolve => require(['@/components/antV'],resolve)
    },
  ]
})
