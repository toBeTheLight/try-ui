<template src="./template.html">
</template>

<script>
export default {
  props: {
    type: {
      default: 'text'
    },
    value: {
      require: true
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      currentValue: this.value === undefined ? '' : this.value,
      isOnComposition: false
    }
  },
  watch: {
    value (newVal) {
      if (this.currentValue === newVal) {
        return
      }
      this.currentValue = newVal
    }
  },
  methods: {
    focusHandler (event) {
      this.$emit('focus', event)
    },
    blurHandler () {
      this.$emit('blur', event)
    },
    changeHandler (event) {
      this.$emit('change', event)
    },
    inputHandler (event) {
      if (this.isOnComposition) {
        return
      }
      const value = event.target.value
      this.$emit('input', value)
    },
    compositionHandler (event) {
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.inputHandler(event)
      } else {
        this.isOnComposition = true
      }
    }
  }
}
</script>

<style src="./style.less" lang="less">
</style>
