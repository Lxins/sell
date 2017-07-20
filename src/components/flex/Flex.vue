<template>
  <div :class="fN">
     <!-- 用内嵌元素在一些安卓浏览器上宽度有问题 -->
    <div class="title">
      <div class="line"></div>
      <div class="text">{{info[flexNum]}}</div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        flexNum: {
          type: Number
        }
      },
      computed: {
        fN() {
          return 'flex-' + this.flexNum
        }
      },
      created() {
        this.info = ['优惠信息', '商家公告']
      }
    }

</script>

