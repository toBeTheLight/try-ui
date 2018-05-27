<template>
  <button @click.stop="clickHandle" :class="`try-button try-button--${size}`">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      default: 'normal',
      type: String
    }
  },
  methods: {
    clickHandle (event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style lang="less">
@import (reference) '~@/assets/css/var.less';

.try-button {
  .baseBorder;
  & +.try-button {
    margin-left: 10px;
  }
}

.try-button--large {
  .largePadding;
}
.try-button--normal {
  .normalPadding;
}
.try-button--small {
  .smallPadding;
}
</style>
