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
         <span class="icon" :class="classMap[seller.supports[0].type]"></span>
         <span class="text"> {{seller.supports[0].description}} </span>
       </div>
     </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
   <div class="bulletin-wrapper">
     <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
     <i class="icon-keyboard_arrow_right"></i>
   </div>
   <div class="background">
     <img :src="seller.avatar" width="100%" height="100%">
   </div>
  </header>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="sass">
  @import "../../common/sass/mixin.sass"

  .header
    position: relative
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
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              @include bg-image('decrease_1')
            &.discount
               @include bg-image('discount_1')
            &.guarantee
               @include bg-image('guarantee_1')
            &.invoice
               @include bg-image('invoice_1')
            &.special
               @include bg-image('special_1')
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
        margin-top: 7px
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
      margin-top: -8px
</style>