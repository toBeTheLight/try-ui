// 单选，不可输入
<template>
  <div class="try-select"
    v-clickoutside="closeDrop">
    <try-input
      readonly="readonly"
      @click="openDrop"
      @blur="blurHandler"
      @focus="focusHandler"
      @keydown.native.esc.stop.prevent="closeDrop"
      v-model="selectedLabel">
    </try-input>
    <ul class="try-select--drop"
      :style="`dropTop:${dropTop}px`"
      v-show="isDropOpen">
      <try-option @click.native="selectOption(option)"
        v-for="(option, index) in options"
        :key="index"
        :selected="selectedOption === option"
        :label-field="labelField"
        :value-field="valueField"
        :option="option">
      </try-option>
    </ul>
  </div>
</template>

<script>
import TryOption from './cmpts/Option.vue'
import clickoutside from '../../directives/clickoutside'

export default {
  props: {
    value: {
      default: ''
    },
    options: {
      default () {
        return []
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
    }
  },
  data () {
    return {
      isDropOpen: false,
      selectedValue: '',
      selectedLabel: '',
      selectedOption: {},
      dropTop: ''
    }
  },
  watch: {
    value: {
      handler (newValue) {
        this.selectedOption = this.options.find(el => {
          return el[this.valueField] === this.value
        })
      },
      immediate: true
    },
    selectedOption: {
      handler (newOption) {
        if (newOption === undefined) {
          return
        }
        this.selectedValue = newOption[this.valueField]
        this.selectedLabel = this.makeCurrentLabel(newOption)
      },
      immediate: true
    }
  },
  methods: {
    makeCurrentLabel (option) {
      let temp = option[this.labelField]
      if (temp === undefined || null) {
        return this.currentValue
      } else {
        return temp
      }
    },
    focusHandler (event) {
      this.openDrop()
      this.$emit('focus', event)
    },
    blurHandler (event) {
      this.$emit('blur', event)
    },
    closeDrop () {
      this.isDropOpen = false
    },
    openDrop () {
      this.isDropOpen = true
      this.dropTop = this.$el.offsetHeight
    },
    selectOption (option) {
      this.selectedOption = option
      this.closeDrop()
    },
    escHandler (event) {
      console.log(event.key)
      this.closeDrop()
    }
  },
  directives: {
    clickoutside
  },
  components: {
    TryOption
  }
}
</script>
<style lang="less">
@import (reference) '~@/assets/css/var.less';

.try-select {
  display: inline-block;
  position: relative;
}
.try-select--drop {
  .baseBorder;
  position: absolute;
  width: 100%;
  left: 0;
}
</style>
