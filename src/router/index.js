import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Index from '@/components/pc/Index'
import Login from '@/components/pc/Login'
import Register from '@/components/pc/Register'
import mLogin from '@/components/mobile/mLogin'
import mIndex from '@/components/mobile/mIndex'
import oneCourseTable from '@/components/mobile/oneCourseTable'
import mRegister from '@/components/mobile/mRegister'

Vue.use(Router)

Vue.prototype.websiteUrl="http://47.105.83.179:8080"
export default new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      name:'Welcome',
      component:Welcome
    },
    {
      path:'/pIndex',
      name:'Index',
      component:Index
    },
    {
      path:'/pLogin',
      name:'Login',
      component:Login
    },
    {
      path:'/pRegister',
      name:'Register',
      component:Register
    },
    {
      path:'/mLogin',
      name:'mLogin',
      component:mLogin
    },
    {
      path:'/mIndex',
      name:'mIndex',
      component:mIndex
    },
    {
      path:'/oneCourseTable',
      name:'oneCourseTable',
      component:oneCourseTable
    },
    {
      path:'/mRegister',
      name:'mRegister',
      component:mRegister
    }
  ]
})
