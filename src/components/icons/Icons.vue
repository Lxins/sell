<template>
  <span>
     <span class="icon" :class="icon"></span>
  </span>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String
      }
    }
  }
</script>

<style lang="sass">
  @import "../../common/sass/mixin.sass"

  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
  .icon-1
    .icon
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px 12px
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
  .icon-2
    .icon
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      &.decrease
        @include bg-image('decrease_2')
      &.discount
        @include bg-image('discount_2')
      &.guarantee
        @include bg-image('guarantee_2')
      &.invoice
        @include bg-image('invoice_2')
      &.special
        @include bg-image('special_2')
  .icon-3
    .icon
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px 12px
      &.decrease
        @include bg-image('decrease_3')
      &.discount
          @include bg-image('discount_3')
      &.guarantee
          @include bg-image('guarantee_3')
      &.invoice
          @include bg-image('invoice_3')
      &.special
          @include bg-image('special_3')
  .icon-4
    .icon
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      &.decrease
        @include bg-image('decrease_4')
      &.discount
        @include bg-image('discount_4')
      &.guarantee
        @include bg-image('guarantee_4')
      &.invoice
        @include bg-image('invoice_4')
      &.special
        @include bg-image('special_4')
</style>

