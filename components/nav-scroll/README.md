# nav-scroll
横向滚动导航条
取消了组件内样式,样式使用时由父组件定义
## 功能
左右超出回弹，手指离开自动滚动，即点即停

## api
组件提供了两个slot

#### slot:nav
导航主体  
此部分请以内容撑开,推荐使用`display:inline-block`
#### slot:button
功能button  
可选择插入一个button
#### scrollTo
滚动至某子元素。  
组件添加`ref=navScroll`,使用this.$refs.navScroll.scrollTo(el),参数为目标子元素(也可接受具体数值)
#### update
导航主体内容更新后更新状态(this.$nextTick内调用)
导航组件添加`ref=navScroll`,使用this.$refs.navScroll.update()

### 示例
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