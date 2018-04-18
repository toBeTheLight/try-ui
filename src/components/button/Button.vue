<template src="./template.html"></template>

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
<style src="./style.less" lang="less"></style>
