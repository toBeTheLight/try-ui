<template>
  <nav class="bg nav">
    <navScroll  ref="navScroll">
      <ul slot="nav" class="nav-content">
        <li class="nav-item" :class="['nav-item', {'active':index === activeIndex}]" v-for="(item, index) of navList" v-text="item.value" @click="clickHandler(index)"></li>
      </ul>
      <button slot="button" class="btn bg iconfont icon-add1"></button>
    </navScroll>
  </nav>
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
        ],
        activeIndex: 0
      }
    },
    methods: {
      clickHandler (index) {
        this.activeIndex = index
        this.$refs.navScroll.scrollTo(document.querySelectorAll('nav .nav-item')[index])
      }
    },
    components: {
      navScroll
    }
  }
</script>

<style lang="less" scoped>
@import url("../../src/base/base.less");
.bg {
  background-color: grey; 
}
.nav {
  font-size: 34*@px;
  line-height: 3;
  color: white;
  
}
.nav-content {
  display: inline-block;
  overflow: visible;
  white-space: nowrap;
  .nav-item{
    display: inline-block;
    padding: 0 30*@px;
    &.active {
      color: deepskyblue;
    }
  }
}
.btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 70*@px;
  height: 70*@px;
  color: deepskyblue;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, .6), 0 0 0 0 transparent, 0 0 0 0 transparent, 0 0 0 0 transparent;
  opacity: .9;
}
.icon-add1 {
  font-size: 40*@px;
  font-weight: bold;
}
</style>