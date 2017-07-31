<template>
  <div class="pages">
    <div class="pages-wrapper" :style="transformStyle" :class="transitionStyle" @transitionend="changePage" @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler">
      <div v-for="(item, index) in pagesList">
        <keep-alive>
          <component :is="getComponent(index)" :class="['page', {'page-left':index === showIndex - 1}, {'page-main':index === showIndex}, {'page-right':index === showIndex + 1}]" v-if="index === showIndex || index === showIndex - 1 || index === showIndex + 1"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  let pagePool = []
  import _touchO from './_touchO'
  import {addTransformPrefix} from '@/util'
  export default {
    props: {
      pagesList: {
        type: Array
      },
      loadPage: {
        type: Object
      },
      mainIndex: {
        type: Number,
        default: 0
      },
      pageChanged: {
        type: Function
      },
      preLoad: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        transformStyle: '',
        transitionStyle: '',
        showIndex: this.mainIndex
      }
    },
    methods: {
      getComponent (index) {
        if (this.preLoad){
          return this.pagesList[index]
        } else {
          if (this.pagesList[index]._page_loaded) {
            return this.pagesList[index]
          } else {
            return this.loadPage
          }
        }
      },
      touchstartHandler (event) {
        if (_touchO.onTransition) {
          return false
        }
        if (event.touches.length !== 1) {
          return false
        }
        _touchO.init(this)
        _touchO.startX = event.touches[0].clientX
        _touchO.startY = event.touches[0].clientY
        _touchO.prevX = _touchO.startX
        _touchO.direct = 'x'
        _touchO.directInited = false
        return false
      },
      touchmoveHandler (event) {
        event.preventDefault()
        if (_touchO.onTransition) {
          return false
        }
        if (event.touches.length !== 1) {
          return false
        }
        if (_touchO.direct === 'y') {
          return false
        } else if (_touchO.directInited) {
          let directX = nowX - _touchO.startX
          let directY = nowY - _touchO.startY
          if (Math.abs(directY) - Math.abs(directX)> 0) {
            _touchO.direct = 'y'
            _touchO.directInited = true
            return false
          }
        }
        let nowX = event.touches[0].clientX
        let nowY = event.touches[0].clientY
        let deltaX = nowX - _touchO.prevX
        let translateX = _touchO.translateX + deltaX
        _touchO.translateX += deltaX
        if (this.showIndex === 0) {
          if (_touchO.translateX >= 0) {
            _touchO.translateX = 0
          }
        } else if (this.showIndex === this.pagesList.length - 1) {
          if (_touchO.translateX <= 0) {
            _touchO.translateX = 0
          }
        }
        if (_touchO.translateX >= _touchO.width) {
          _touchO.translateX = _touchO.width
        } else if (_touchO.translateX <= -_touchO.width) {
          _touchO.translateX = -_touchO.width
        }
        this.transformStyle = addTransformPrefix(`transform:translate3d(${_touchO.translateX}px,0,0)`)
        _touchO.prevX = nowX
        _touchO.prevY = nowY
      },
      touchendHandler (event) {
        if (_touchO.onTransition) {
          return false
        }
        if (event.touches.length !== 0) {
          return false
        }
        if (_touchO.translateX === 0) {
          return false
        }
        _touchO.result = Math.round(_touchO.translateX / _touchO.width)
        _touchO.translateX = _touchO.result * _touchO.width
        this.transitionStyle = 'transitionSlow'
        _touchO.onTransition = true
        this.transformStyle = addTransformPrefix(`transform:translate3d(${_touchO.translateX}px,0,0)`)
      },
      changePage () {
        this.transitionStyle = ''
        _touchO.translateX = 0
        this.transformStyle = addTransformPrefix(`transform:translate3d(0,0,0)`)
        this.showIndex -= _touchO.result
        _touchO.onTransition = false
        this.pagesList[this.showIndex]._page_loaded = true
        console.log('change')
        if (this.pageChanged) {
          this.pageChanged()
        }
      },
      showPage (index) {
        if (typeof index === 'object') {
          index = this.pagesList.indexOf(index)
        }
        this.showIndex = index
        this.pagesList[this.showIndex]._page_loaded = true
      }
    },
    created () {
      this.pagesList[this.showIndex]._page_loaded = true
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../src/base/base.less';
  .pages {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .pages-wrapper{
    width: 100%;
    height: 100%;
  }
  .page {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .page-left{
    transform: translate3d(-100%, 0, 0);
  }
  .page-right{
    transform: translate3d(100%, 0, 0);
  }
  .transitionSlow {
    transition: all .2s linear;
  }
  /* 测试样式 */
 /*.page-left{
    background-color: greenyellow;
  }
  .page-main{
    background-color: yellowgreen;
  }
  .page-right{
    background-color: yellow;
  }*/
</style>