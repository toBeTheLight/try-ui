<template>
  <input
    class="try-input"
    @keyup.esc="escHandler"
    @focus="focusHandler"
    @blur="blurHandler"
    @change="changeHandler"
    @input="inputHandler"
    @compositionstart="compositionHandler"
    @compositionupdate="compositionHandler"
    @compositionend="compositionHandler"
    v-model="currentValue"
    :type="type"
  />
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
    blurHandler (event) {
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
    },
    escHandler (event) {
      this.$emit('keyup.esc', event)
    }
  }
}
</script>

<style lang="less">
@import (reference) '~@/assets/css/var.less';

.try-input {
  width: 200px;
  .normalPadding;
  .baseBorder;
  &:hover {
    .hoverBorder;
  }
  &:focus {
    .hoverBorder;
    .focusShadow;
    .focusOutline
  }
  &[readonly]:focus {
    .focusOutline
  }
}
</style>
