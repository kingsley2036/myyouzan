import  Vue from 'vue'
import Router from 'vue-router'
import member from '../components/member.vue'
import address from '../components/address.vue'
import all from '../components/all.vue'
import form from '../components/form.vue'
Vue.use(Router);

let routes = [{
  path: '/',
  component: member,
}, {
  path: '/address',
  component: address,
  children: [{
    path: '',
    redirect: 'all'
  },
    {
      path: 'all',
      name: 'all',
      component: all
    }, {
      path: 'form',
      name: 'form',
      component: form
    }
  ]

}

];

//创建ROUTER示例
let router = new Router({
  routes
});

export default router
