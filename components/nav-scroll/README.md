# nav-scroll
横向滚动导航条
取消了组件内样式,样式使用时由父组件定义
## 功能
左右超出回弹，手指离开自动滚动，即点即停

## api

### 内容: slot
组件提供了两个slot

#### slot: nav
导航主体  
此部分请以内容撑开,推荐使用`display:inline-block`
#### slot: button
功能button,非必需。  
可选择插入一个button

### 输出: 功能函数

#### scrollTo: function
滚动至某子元素。接受参数为子元素。  
#### update: function
导航主体内容更新后更新状态(this.$nextTick内调用)，无参数。

### 示例
http://localhost:8080/#/nav

```html
<template>
  <nav class="bg nav">
    <navScroll :hasButton="true" ref="navScroll">
      <ul slot="nav" class="nav-content">
        <li class="nav-item" :class="['nav-item', {'active':index === activeIndex}]" v-for="(item, index) of navList" v-text="item.value" @click="clickHandler(index)"></li>
      </ul>
      <button slot="button" class="btn bg iconfont icon-add1"></button>
    </navScroll>
  </nav>
</template>
```
```js
updateList () {
  this.navList.push(data)
  this.$nextTick(() => {
    this.$refs.navScroll.update()
    this.$refs.navScroll.scrollTo(lastNode)
  })
}
```
