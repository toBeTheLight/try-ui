# pages-scroll
页面级滑动切换
## 功能
左右滑动过半，切换页面

## api

### 输入：props

#### pagesList: array
页面组件列表
#### mainIndex: number
初始显示页面索引，默认为0
#### preLoad: boolean
是否预先加载主页面两侧页面，默认为false(不加载)
#### pageChanged: function
页面滑动切换后回调函数
#### loading: vue-component
非预加载时页面默认视图

### 输出：功能函数

#### showPage: function
无过渡跳转至，接受索引参数(也接受pagesList中页面组件)


## 示例
```html
<template>
  <div class="wrapper">
    <button @click="toPageTwo">跳转至页面二</button>
    <pages-scroll :preLoad="false" :loadPage="loadPage" :pagesList="pagesList" ref="pagesScroll" :pageChanged="pageChanged"></pages-scroll>
  </div>
</template>
```
```js
  import {PageOne, PageTwo, PageThree, PageFour} from './children'
  import {Loading} from './children'
  import pagesScroll from '@c/pages-scroll'
  export default {
    data () {
      return {
        pagesList: [PageOne, PageTwo, PageThree, PageFour],
        loadPage: Loading
      }
    },
    components: {
      pagesScroll
    },
    methods: {
      toPageTwo () {
        this.$refs.pagesScroll.showPage(1)
      },
      pageChanged () {
        console.log('翻页成功')
      }
    }
  }
```
