<template>
  <div class="nav-scroll-wrapper">
    <div class="ul-wrapper" ref="toucharea" @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler" :style="transformStyle">
      <slot name="nav">
      </slot>
    </div>
    <slot name="button" v-if="hasButton">
    </slot>
  </div>
</template>

<script>
  import _touchO from './_touchO.js'
  import tweenO from './tweenO.js'
  import {addTransformPrefix, tween} from '@/util'
  
  export default {
    name: 'nav-scroll',
    props: {
      hasButton: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'quart'
      }
    },
    data () {
      return {
        transformStyle: ''
      }
    },
    methods: {
      touchstartHandler (event) {
        // 限制一根手指
        if (event.touches.length !== 1) {
          return false
        }
        clearInterval(_touchO.timer)
        // 处理元素长度 start相关
        _touchO.init(this, this.hasButton)
        // 初始化当次数值
        _touchO.speed = 0
        _touchO.startX = event.touches[0].clientX
        _touchO.prevX = _touchO.startX
        _touchO.startTime = new Date().getTime()
        _touchO.prevTime = _touchO.startTime
        return false
      },
      touchmoveHandler (event) {
        if (event.touches.length !== 1) {
          return
        }
        let nowX = event.touches[0].clientX
        let nowTime = new Date().getTime()
        // 即时速度
        _touchO.speed = (nowX - _touchO.startX) / (nowTime - _touchO.startTime)
        let direct = ''
        // 方向判断
        if (nowX - _touchO.prevX > 0) {
          direct = 'right'
        } else {
          direct = 'left'
        }
        _touchO.deltaX = nowX - _touchO.prevX
        this.transformStyle = addTransformPrefix(`transform:translate3d(${_touchO.translateX_num(direct)}px,0,0)`)
        _touchO.prevX = nowX
        _touchO.prevTime = nowTime
        event.preventDefault() 
        return false
      },
      touchendHandler (event) {
        if (!_touchO.canScroll) {
          return
        }
        if (event.touches.length !== 0) {
          return
        }
        let overTime = new Date().getTime() - _touchO.startTime < 200
        let misuse = Math.abs(_touchO.prevX - _touchO.startX) <= 1
        if ((overTime || Math.abs(_touchO.speed) < .1) && misuse) {
          return
        }
        _touchO.prevX = ''
        let distance = _touchO.distance_num(this.mode)
        _touchO.autoScroll.call(this, distance, tweenO)
        return false
      },
      scrollTo (el) {
        let target = {}
        _touchO.init(this, this.hasButton)
        if (typeof el === 'object') {
          target.width = _touchO.width_num(el) + Number(window.getComputedStyle(el).paddingLeft.replace('px',''))
          target.left = el.getBoundingClientRect().left + target.width / 2
          target.parentLeft = this.$refs.toucharea.getBoundingClientRect().left
          target.targetX = (_touchO.wrapperWidth / 2) - (target.left - target.parentLeft) 
        } else {
          target.targetX = el
        }
        let distance = _touchO.distance_num('linear', target.targetX)
        _touchO.autoScroll.call(this, distance, tweenO)
      },
      update() {
        _touchO.reInit()
      }
    },
    activated () {
      _touchO.reInit()
    }
  }
</script>

<style lang="less" scoped>
@import '../../../src/base/base.less';
.nav-scroll-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: transparent;
  .ul-wrapper{
    display: inline-block;
  }
}
</style>
