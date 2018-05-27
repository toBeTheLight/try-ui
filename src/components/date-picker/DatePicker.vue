<template>
  <div class="try-datepicker" v-clickoutside="closePanel">
    <TryInput @focus="openPanel" v-model="currentValue"/>
    <TryDatePanel
      v-show="isOpen"
      class="try-datepicker__panel"
      @selectDate="selectDate"/>
  </div>
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

<style lang="less">
.try-datepicker {
  position: relative;
  display: inline-block;
}
.try-datepicker__panel {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
