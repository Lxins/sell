<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="item.id" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <v-icon v-show="item.type>0" class="icon-3" :icon="classMap[item.type]"></v-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="ul">
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook" ref="foodList">
          <h1 class="tittle">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="food in item.foods" :key="food.id" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}价</span><span>好评率{{food.rating}}%</span>
                </div>
                <prices :food="food"></prices>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
     <shopcart :food="selectedFood" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import Icons from '@/components/Icons/Icons'
  import Shopcart from '@/components/shopcart/Shopcart'
  import Prices from '@/components/prices/Prices'
  import Cartcontrol from '@/components/cartcontrol/Cartcontrol'
  import Food from '@/components/food/Food'
  import BScroll from 'better-scroll'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {} // food
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() { // 选中的商品数据
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {  // DOM更新
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return  // pc下 不会再次触发事件
        }
        let foodList = this.$refs.foodList

        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return  // pc下 不会再次触发事件
        }
        this.selectedFood = food // food数据
        this.$refs.food.show()
      },
      _initScroll() {
        this.menuScrol = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3  // 除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      'v-icon': Icons,
      Shopcart,
      Prices,
      Cartcontrol,
      Food
    }
}
</script>

<style lang="sass">
  @import "../../common/sass/mixin.sass"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            @include border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          @include border-1px(rgba(7, 17, 27, .1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .tittle
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        @include border-1px(rgba(7, 17, 27, .1))
        &:last-child
          @include border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
  </style>

