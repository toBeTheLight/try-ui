<template>
  <div class="try-datepanel">
    <div class="try-datepanel__toggle">
      <button @click="changeDateShown(-1, 'year')">《</button>
      <button @click="changeDateShown(-1, 'month')"></button>
      <h3>{{dateShown.year}}年{{dateShown.month}}月</h3>
      <button @click="changeDateShown(1, 'month')">></button>
      <button @click="changeDateShown(1, 'year')">》</button>
    </div>
    <table>
      <thead class="try-datepanel__header">
        <th v-for="day in weeks" :key="day">{{day}}</th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in dateMatrix" :key="index">
          <td
            @click="selectDate(cell)"
            class="try-datepanel__cell"
            :class="[cell.type]"
            v-for="cell in row"
            :key="cell.date">{{cell.date}}</td>
        </tr>
      </tbody>
    </table>
  </div>
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

<style lang="less">
@import (reference) '~@/assets/css/var.less';

.try-datepanel {
  display: flex;
  flex-direction: column;
  width: 290px;
  .baseBorder;
  &__toggle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .smallPadding;
  }
  &__header {
    text-align: center;
  }
  &__cell {
    cursor: pointer;
    color: #333;
    font-size: 16px;
    text-align: center;
    padding: 10px;
    &:hover {
      background-color: #eee;
    }
    &.next, &.prev{
      opacity: .6;
    }
  }
}
</style>
