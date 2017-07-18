import Vue from 'vue'
import Router from 'vue-router'
import Resouce from 'vue-resource'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

import '@/common/sass/index.sass'

Vue.use(Router)
Vue.use(Resouce)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/', redirect: '/goods'
    }
  ]
})

