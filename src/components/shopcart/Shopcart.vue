<template>
  <div ref="shopcartList">
    <div class="shopcart">
      <div @click="toggleList" class="centent">
        <div class="centent-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="centent-right">
          <div @click.stop.prevent="pay" class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div v-show="listShow" class="shopcart-list">
          <div class="list-herder border-1px">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="shop in selectFoods" class="food" :key="shop.id">
                <span class="name">{{shop.name}}</span>
                <div class="price">
                  <span>￥{{shop.price * shop.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="shop"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div @click="listHide" v-show="listShow" class="list-mask"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from '@/components/cartcontrol/Cartcontrol'

  export default {
    props: {
      selectFoods: {  // 选中的商品数据
        type: Array,
        default() {
          return [
            // {
            //   price: 10,
            //   count: 3
            // }
          ]
        }
      },
      deliveryPrice: {  // 配送费
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        listState: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          return false
        }
        let show = !this.listState

        // 点击取反后执行BScroll
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.listState = !this.listState
      },
      listHide() {
        this.listState = true
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
          this.listState = true
        })
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          return alert('你赚了，只需' + this.totalPrice + '元')
        }
      }
    },
    components: {
      Cartcontrol
    }
  }
</script>

<style lang="sass">
  @import "../../common/sass/mixin.sass"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .centent
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, .4)
      .centent-left
        flex: 1
        .logo-wrapper, .price, .desc
          display: inline-block
          vertical-align: top
        .logo-wrapper
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            vertical-align: top
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 9px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
        .price
          margin-top: 12px
          padding-right: 12px
          line-height: 24px
          box-sizing: border-box  // 右边框高度
          border-right: 1px solid rgba(255, 255, 255, .1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .centent-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.move-enter-active, &.move-leave-active
        transition: .7s
      &.move-enter, &.move-leave-to
        transform: translate3d(0, 100%, 0)
      .list-herder
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        @include border-1px(rgba(7, 17, 27, .1))
        .title
          float: left
          line-height: 40px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, .6)
      z-index: 40
      &.fade-enter-active, &.fade-leave-active
        transition: .5s
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
