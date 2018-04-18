<template>
  <div id="app">
    <TryButton @click="showMessageBox" size="small">消息弹窗</TryButton>
    <TryDatePicker v-model="date"/>
    <TryInput v-model="inputVal"/>
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
