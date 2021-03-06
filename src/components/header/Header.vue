<template>
  <header class="header">
   <div class="content-wrapper">
    <div class="avatar">
      <img width="64" height="64" :src="seller.avatar">
    </div>
    <div class="content">
       <div class="title">
         <span class="brand"></span>
         <span class="name">{{seller.name}}</span>
       </div>
       <div class="description">
         {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <!-- 异步操作 不判断会报错 -->
       <div v-if="seller.supports" class="supports">
         <v-icon class="icon-1" :icon="classMap[seller.supports[0].type]"></v-icon>
         <span class="text"> {{seller.supports[0].description}} </span>
       </div>
     </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
   <div class="bulletin-wrapper" @click="showDetail">
     <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
     <i class="icon-keyboard_arrow_right"></i>
   </div>
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%">
   </div>
   <transition name="fade">
   <div v-show="detailShow" class="detail">
     <div class="detail-wrapper clearfix">
       <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <v-flex :flexNum="0"></v-flex>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-tiem" v-for="item in seller.supports" :key="item.id">
            <v-icon class="icon-2" :icon="classMap[item.type]"></v-icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <v-flex :flexNum="1"></v-flex>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
       </div>
     </div>
     <div class="detail-close">
       <i class="icon-close" @click="hideDetail"></i>
     </div>
   </div>
   </transition>
  </header>
</template>

<script>
import Star from '@/components/star/Star'
import Flex from '@/components/flex/Flex'
import Icons from '@/components/Icons/Icons'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    Star,
    'v-icon': Icons,
    'v-flex': Flex
  }
}
</script>

<style lang="sass">

  @import "../../common/sass/mixin.sass"

  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, .5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 14px
        .title
          margin: 2px 0 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            @include bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
          .name
            font-size: 16px
            line-height: 18px
            font-weight: bold
            margin-left: 6px
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 25px
        border-radius: 14px
        background: rgba(0, 0, 0, .2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, .2)
      // font-size: 0   white-space的省略号 会不显示
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        @include bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
        font-weight: 200
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-to
      opacity: 0
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, .8)
      backdrop-filter: blur(10px)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px
          .supports
            width: 80%
            margin: 0 auto
            .supports-tiem
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-weight: 200
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0
        clear: both
        font-size: 32px
</style>
