<template>
  <nav class="nav">
    <div class="ul-wrapper" ref="toucharea"  @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler" :style="transformStyle">
      <slot name="nav">
      </slot>
    </div>
    <slot name="button" v-if="hasButton">
    </slot>
  </nav>
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
        _touchO.startX = event.touches[0].clientX
        _touchO.prevX = _touchO.startX
        _touchO.startTime = new Date().getTime()
        _touchO.prevTime = _touchO.startTime
        event.preventDefault() 
        return false
      },
      touchmoveHandler (event) {
        if (!_touchO.canScroll) {
          return
        }
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
        let deltaX = nowX - _touchO.prevX
        this.transformStyle = addTransformPrefix(`transform:translate3d(${_touchO.translateX_num(direct, deltaX)}px,0,0)`)
        _touchO.prevX = nowX
        _touchO.prevTime = nowTime
        event.preventDefault() 
        return false
      },
      touchendHandler (event) {
        if (!_touchO.canScroll) {
          return
        }
        if (event.touches.length === 0) {
          _touchO.prevX = ''
        } else {
          return
        }
        let endTime = new Date().getTime()
        let stayTime = endTime - _touchO.prevTime
        let distance = _touchO.distance_num(this.mode)
        _touchO.autoScroll.call(this, distance, tweenO)
        event.preventDefault() 
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
    }
  }
</script>

<style lang="less" scoped>
@import '../../../src/base/base.less';
.nav {
  position: relative;
  overflow: hidden;
  height: 100*@px;
  width: 100%;
  line-height: 100*@px;
  background-color: rgb(187, 33, 51);
  font-size: 30*@px;
  .ul-wrapper{
    display: inline-block;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 70*@px;
    height: 70*@px;
    background-color: rgb(187, 33, 51);
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, .6), 0 0 0 0 transparent, 0 0 0 0 transparent, 0 0 0 0 transparent;
    opacity: .9;
  }
}
</style>
