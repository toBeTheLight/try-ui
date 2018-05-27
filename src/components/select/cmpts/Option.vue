<template>
  <li class="el-select--option"
    :class="{'el-select--option__selected': selected}">
    {{label}}
  </li>
</template>

<script>
export default {
  props: {
    option: {
      default () {
        return {}
      }
    },
    valueField: {
      default () {
        return 'value'
      }
    },
    labelField: {
      default () {
        return 'label'
      }
    },
    selected: {
      default () {
        return false
      }
    }
  },
  computed: {
    label () {
      let temp = this.option[this.labelField]
      if (temp === undefined || null) {
        return this.option[this.valueField]
      }
      return temp
    }
  }
}
</script>

<style lang="less">
@import (reference) '~@/assets/css/var.less';
.el-select--option {
  .normalPadding;
  cursor: pointer;
  &:hover {
    .hoverBg;
  }
}
.el-select--option__selected {
  .selectedLine;
}
</style>
