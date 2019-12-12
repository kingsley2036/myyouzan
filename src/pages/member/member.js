

import Vue from "vue"
import  Router from 'vue-router'
import member from './components/member'
import address from './components/address'
Vue.use(Router);

let routes=[{
  path:'/',
  component:member ,
},{
  path: '/address',
  component: address
}

];


//创建ROUTER示例
let router=new Router({
  routes
});

//根组件注入
new Vue({
  el:'#app',
  router,
});

