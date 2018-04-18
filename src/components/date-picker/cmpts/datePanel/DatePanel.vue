<template src="./template.html">
</template>

<script>
import { dateDetails, boundaryTime, fillDateMatrix } from './utils'

export default {
  data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      dateRightNow: null,
      dateSelected: null,
      dateShown: null,
      dateMatrix: []
    }
  },
  methods: {
    initMain (date) {
      this.initDateRightNow()
      this.initDateSelected()
      this.initDateShown()
      this.initPanel()
    },
    // 当前时间
    initDateRightNow () {
      this.dateRightNow = dateDetails(new Date())
      console.log(this.dateRightNow)
    },
    // 选择时间 v-model
    initDateSelected () {
      // 同步当前时间
      if (!this.dateSelected) {
        this.dateSelected = Object.assign({}, this.dateRightNow)
      } else {
        // 或传入时间

      }
    },
    initDateShown () {
      this.dateShown = Object.assign({}, this.dateSelected)
    },
    initPanel () {
      let res = boundaryTime(new Date(`${this.dateShown.year}/${this.dateShown.month}/01`))
      this.dateMatrix = fillDateMatrix(res)
    },
    changeDateShown (num, type) {
      switch (type) {
        case 'year':
          this.changeYear(num)
          break
        case 'month':
          this.changeMonth(num)
          break
      }
    },
    changeYear (num) {
      this.dateShown.year += num
      this.initPanel(new Date(`${this.dateShown.year}/${this.dateShown.month}/01`))
    },
    changeMonth (num) {
      let month = this.dateShown.month + num
      if (month <= 0) {
        this.dateShown.year -= 1
        month = 12
      } else if (month >= 12) {
        month = month % 12
        this.dateShown.year += 1
      }
      this.dateShown.month = month
      this.initPanel(new Date(`${this.dateShown.year}/${this.dateShown.month}/01`))
    },
    selectDate (cell) {
      this.$emit('selectDate', `${cell.year}/${cell.month}/${cell.date}`)
    }
  },
  created () {
    this.date = new Date()
    this.initMain(this.date)
  }
}
</script>

<style src="./style.less" lang="less">
</style>
