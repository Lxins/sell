<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 组件状态缓存到内存里，再次触发直接从内存里把组件状态恢复  -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {urlParse} from '@/common/js/util'
  import Header from '@/components/header/Header'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        }
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          // this.seller = response.data
          // Vue 不能检测到对象属性的添加或删除 所以创建一个新的对象，让它包含原对象的属性和新的属性
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    },
    components: {
      'v-header': Header
    }
  }
</script>

<style lang="sass" rel="stylesheet/sass">

  @import "./common/sass/mixin.sass"


  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      @include border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex: 1
        text-align: center
        a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
