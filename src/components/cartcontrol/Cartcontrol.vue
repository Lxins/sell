<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)"></div>
    </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
   import Vue from 'vue'

   export default {
     props: {
       food: {
         type: Object
       }
     },
     created() {

     },
     methods: {
       addCart(event) {
         if (!event._constructed) {
           return  // pc下 不会再次触发事件
         }
         if (!this.food.count) {
           Vue.set(this.food, 'count', 1)
         } else {
           this.food.count++
         }
       },
       decreaseCart(event) {
         if (!event._constructed) {
           return  // pc下 不会再次触发事件
         }
         if (this.food.count) {
           this.food.count--
         }
       }
     }
   }
</script>

<style lang="sass">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-count, .cart-add
      display: inline-block
    .cart-decrease, .cart-add
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-decrease

    .cart-count
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add

    .fade-enter-active, .fade-leave-active
      transition: .4s
    .fade-enter, .fade-leave-to
      transform: translateX(25px) rotateZ(360deg)
      opacity: 0

</style>

