<template src="./template.html">
</template>

<script>
import TryDatePanel from './cmpts/datePanel/DatePanel.vue'
import TryInput from '../input/Input.vue'
import clickoutside from '../../directives/clickoutside'

export default {
  props: ['value'],
  data () {
    return {
      isOpen: false,
      currentValue: this.value || ''
    }
  },
  methods: {
    openPanel () {
      this.isOpen = true
    },
    closePanel () {
      this.isOpen = false
    },
    selectDate (value) {
      this.closePanel()
      this.currentValue = value
      this.$emit('input', value)
    }
  },
  directives: {
    clickoutside
  },
  components: {
    TryDatePanel,
    TryInput
  }
}
</script>

<style src="./style.less" lang="less"></style>
