<template src="./template.html">
</template>

<script>
import { boundaryTime, fillDatePanel } from './utils'

export default {
  data () {
    return {
      year: '',
      month: '',
      dateRows: [[], [], [], [], [], []]
    }
  },
  methods: {
    initDate (date) {
      let res = boundaryTime(date)
      let {now} = boundaryTime(date)
      this.year = now.year
      this.month = now.month
      this.initPanel(res)
    },
    initPanel (res) {
      this.dateRows = fillDatePanel(res)
    },
    changeYear (num) {
      this.date = new Date(`${this.year + num}/${this.month}/01`)
      this.initDate(this.date)
    },
    changeMonth (num) {
      let month = this.month + num
      if (month <= 0) {
        this.year -= 1
        month = 12
      } else if (month >= 12) {
        month = month % 12
        this.year += 1
      }
      this.month = month
      this.date = new Date(`${this.year}/${this.month}/01`)
      this.initDate(this.date)
    },
    selectDate (cell) {
      alert(`${cell.year}/${cell.month}/${cell.date}`)
    }
  },
  created () {
    this.date = new Date()
    this.initDate(this.date)
  }
}
</script>

<style src="./style.less" lang="less">
</style>
