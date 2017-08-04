<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-center">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <strar :size="36" :score="seller.serviceScore"></strar>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <strar :size="36" :score="seller.foodScore"></strar>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @ratingtypeSelect="ratingtypeSelect" @contentToggle="contentToggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings && ratings.length">
          <li v-show="needShow(ratings.rateType,ratings.text)" v-for="rating in ratings" class="rating-item" :key="rating.id">
            <div class="avatar">
               <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <strar :size="24" :score="rating.score"></strar>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item" :key="item.id">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Strar from '@/components/star/Star'
  import Split from '@/components/split/Split'
  import Ratingselect from '@/components/ratingselect/Ratingselect'

  const ERR_OK = 0
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.ratingsScrol = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      ratingtypeSelect(type) {
        this.selectType = type
        // this.$nextTick(() => {
        //   this.scroll.refresh()
        // })
      },
      contentToggle(onlyContent) {
        this.onlyContent = onlyContent
        // this.$nextTick(() => {
        //   this.scroll.refresh()
        // })
      }
    },
    components: {
      Strar,
      Split,
      Ratingselect
    }
  }
</script>

<style lang="sass">
  .ratings
    position: absolute
    top: 174px
    bottom: 0   // 撑满高度
    left: 0
    width:: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, .1)
        text-align: center
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgba(7, 17, 27, .5)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        .score-wrapper, .delivery-wrapper
          margin-bottom: 8px
          font-size: 0
          .title, .star, .score
            display: inline-block
            vertical-align: top
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            margin: 0 12px
          .score
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153, 0)
          .delivery
            margin-left: 12px
            line-height: 18px
            font-size: 12px
            color: rgba(147, 153, 159, .9)
</style>

