## 事件

input开发时要注意处理这几个和输入有关的事件
```
input // 输入框内容改变
change // 输入框值改变
compositionstart // 需拼写输入法开始拼写
compositionupdate // 需拼写输入法拼写值的改变
compositionend  // 需拼写输入法当前拼写值结束
```

## 顺序

* 聚焦：
  * 无事件触发
* 拼音拼写（中文、韩语等）
  * 开始拼写：
    1. compositionstart
    2. compositionupdate
    3. input
  * 继续拼写：
    1. compositionupdate
    2. input
  * 结束拼写（包括确定输入/所有拼音）：
    1. compositionupdate
    2. input
    3. compositionend
* 直写（英文等）
  * 输入框内容变化：input
* 失去焦点：
  * change

## 组件绑定值的变化

需要在直接拼写的`input`事件和拼音拼写的`compositionend`阶段对外同步v-model，由于在拼音拼写阶段同样会触发`input`事件，所以需要额外处理，判断是否在**拼音拼写**中。
