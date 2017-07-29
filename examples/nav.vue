<template>
  <navScroll :hasButton='true'>
    <ul slot="nav">
      <li v-for="(item, index) of navList" v-text="item.value"></li>
    </ul>
    <button slot="button"></button>
  </navScroll>
</template>

<script>
  import navScroll from '@c/nav-scroll'
  export default {
    data () {
      return {
        navList: [
          {
            value: '一一一',
            id: 0
          },
          {
            value: '二二二',
            id: 2
          },
          {
            value: '三三三',
            id: 3
          },
          {
            value: '四四四',
            id: 4
          },
          {
            value: '五五五',
            id: 5
          },
          {
            value: '六六六',
            id: 6
          },
          {
            value: '七七七',
            id: 7
          },
          {
            value: '八八八',
            id: 8
          },
          {
            value: '九九九',
            id: 9
          },
          {
            value: '十十十',
            id: 10
          },
          {
            value: '十一十一',
            id: 11
          },
          {
            value: '十二十二',
            id: 12
          }
        ]
      }
    },
    components: {
      navScroll
    }
  }
</script>

<style lang="less" scoped>
@import url("../src/base/base.less");
ul {
  display: inline-block;
  overflow: visible;
  color: white;
  white-space: nowrap;
  // transition: all .1s linear;
  li{
    display: inline-block;
    padding: 0 30*@px;
  }
}
</style>