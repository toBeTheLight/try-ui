<template>
  <ul>
    <router-link to="nav">
      <li>
        nav-scroll
      </li>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: 'nav-scroll',
    props: {
      navChecked: {
        Object,
        default: null
      }
    },
    created () {
    }
  }
</script>

<style lang="less" scoped="">
@import '../src/base/base.less';
li{
  font-size: 40*@px;
  line-height: 1.5;
}
</style>
