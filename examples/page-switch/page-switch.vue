<template>
  <div class="wrapper">
    <button @click="toPageTwo">跳转至页面二</button>
    <p>请勿将手指滑动至屏幕外</p>
    <page-switch :preLoad="false" :loadPage="loadPage" :pagesList="pagesList" ref="pageSwitch" :pageChanged="pageChanged"></page-switch>
  </div>
</template>

<script>
  import {PageOne, PageTwo, PageThree, PageFour} from './children'
  import {Loading} from './children'
  import pageSwitch from '@c/page-switch'
  export default {
    data () {
      return {
        pagesList: [PageOne, PageTwo, PageThree, PageFour],
        loadPage: Loading
      }
    },
    components: {
      pageSwitch
    },
    methods: {
      toPageTwo () {
        this.$refs.pageSwitch.showPage(1)
      },
      pageChanged () {
        console.log('翻页成功')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url('../../src/base/base.less');
  .wrapper{
    height: 100%;
    width: 100%;
    font-size: 40*@px;
  }
  button {
    height: 100*@px;
    font-size: 40*@px;
    background-color: deepskyblue;
    border-radius: 5*@px;
    padding: 20*@px;
  }
</style>