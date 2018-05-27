<template>
  <div id="app">
    <span>button</span>
    <TryButton @click="showMessageBox" size="small">消息弹窗</TryButton>
    <span>date-picker</span>
    <TryDatePicker v-model="date"/>
    <span>input</span>
    <TryInput v-model="inputVal" @blur="blurHandler" @focus="blurHandler"/>
    <span>select</span>
    <TrySelect v-model="selectVal" :options="selectOptions"></TrySelect>
  </div>
</template>

<script>
import TryButton from './components/button/Button.vue'
export default {
  name: 'App',
  data () {
    return {
      testData: 'testData',
      inputVal: '1',
      selectVal: '',
      selectOptions: [{value: 1, label: '第一项'}, {value: 2, label: '第二项'}],
      date: ''
    }
  },
  methods: {
    testMethod () {
      alert(this.testData)
    },
    showMessageBox () {
      console.log(1)
      this.$TryMessageBox({
        title: '消息提示',
        message: '是否提交？'
      }).then(() => {
        this.testMethod()
      }).catch(() => {
        console.log('err')
      })
    },
    blurHandler (event) {
      console.log(event)
    }
  },
  components: {
    TryButton
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
