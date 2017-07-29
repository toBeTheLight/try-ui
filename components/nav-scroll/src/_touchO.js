/* eslint-disable no-unused-vars */
import {addTransformPrefix, tween} from '@/util'
import tweenO from './tweenO'
/* eslint-enable no-unused-vars */
// 非组件相关变量
let _touchO = {
  listWidth: '',
  wrapperWidth: '',
  buttonWidth: 0,
  startX: '',
  prevX: '',
  startTime: '',
  translateX: 0,
  // maxTranslateX为负
  maxTranslateX: '',
  maxOverX: 150,
  speed: 0,
  timer: null,
  inited: false,
  canScroll: true,
  misuse: false
}
// touchmove改变量计算
_touchO.translateX_num = function (direct, deltaX) {
  let x = this.translateX + deltaX
  let moreX, k
  if (x > 0) {
    if (direct === 'right') {
      moreX = this.maxOverX - this.translateX
      moreX > 0 ? k = moreX / this.maxOverX : k = 0
      deltaX = deltaX * k
      x = this.translateX + deltaX
    }
  } else if (x < this.maxTranslateX) {
    if (direct === 'left') {
      moreX = this.maxOverX - (this.maxTranslateX - this.translateX)
      moreX > 0 ? k = moreX / this.maxOverX : k = 0
      deltaX = deltaX * k
      x = this.translateX + deltaX
    }
  }
  this.translateX = x
  return x
}

_touchO.init = function (vm, hasButton) {
  if (!this.inited) {
  this.listWidth = this.width_num(vm.$slots.nav[0].elm)
  console.log(this.listWidth)
  this.wrapperWidth = this.width_num(vm.$el)
  if (hasButton) {
    this.buttonWidth = this.width_num(vm.$slots.button[0].elm)
  }
  this.inited = true
  // 非可滑动长度
  if (this.listWidth < this.wrapperWidth - this.buttonWidth) {
    this.canScroll = false
    return
  } else {
    this.canScroll = true
  }
    this.maxTranslateX = 0 - (this.listWidth - this.wrapperWidth) - this.buttonWidth
  }
  this.inited = true
}

_touchO.width_num = function (el) {
  return Number(window.getComputedStyle(el).width.replace('px', ''))
}
_touchO.distance_num = function (mode) {
  let nowX = _touchO.translateX
  let distance
  let a = 3 / 500
  tweenO.start = nowX
  tweenO.mode = mode
  distance = this.speed * Math.abs(this.speed / a)
  // 左回弹
  if (nowX > 0) {
    tweenO.mode = 'elastic'
    distance = 0 - nowX
  // 右回弹
  }else if (nowX <= _touchO.maxTranslateX) {
    distance = _touchO.maxTranslateX - nowX
    tweenO.mode = 'elastic'
  } else if(new Date().getTime() - this.prevTime > 100) {
    distance = 0
    // 自动滑动超出
  }else if (nowX + distance > 0) {
    distance = 0 - nowX
  // 自动滑动超出
  } else if (nowX + distance <= _touchO.maxTranslateX) {
    distance = _touchO.maxTranslateX - nowX
  }
  return distance
}

_touchO.autoScroll = function (change, tweenO, mode) {
  let that = this
  let tweenFun = tween[mode] || tween[tweenO.mode]
  tweenO.time = 0
  _touchO.timer = setInterval(function () {
    if (tweenO.time >= tweenO.step) {
      clearInterval(_touchO.timer)
    }
//  document.write(`${_touchO.translateX}/r/n`)
    _touchO.translateX = tweenFun(tweenO.time, tweenO.start, change, tweenO.step)
    that.transformStyle = addTransformPrefix(`transform:translate3d(${_touchO.translateX}px,0,0)`)
    tweenO.time++
  }, tweenO.duration / tweenO.step)
}
_touchO.reInit = function () {
  this.inited = false
}
export default _touchO
