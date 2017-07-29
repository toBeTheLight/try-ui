## nav-scroll
横向滚动导航条

### 功能
左右超出回弹，手指离开自动滚动，即点即停

### api

组件提供了两个slot

#### slot:nav
导航主体
此部分请以内容撑开,推荐使用`display:inline-block`
#### slot:button
功能button
可选择插入一个button,同时请向组件内传入`:hasButton='true'`
#### scrollTo
滚动至某子元素。
组件添加`ref=navScroll`,使用this.$refs.navScroll.scrollTo(el),参数为目标子元素(也可接受具体数值)
#### update
导航主体内容更新后更新状态(this.$nextTick内调用)
导航组件添加`ref=navScroll`,使用this.$refs.navScroll.update()

### 示例
```html
<template>
  <navScroll :hasButton='true' ref="navScroll">
    <ul slot="nav">
      <li v-for="(item, index) of navList" v-text="item.value"></li>
    </ul>
    <button slot="button"></button>
  </navScroll>
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