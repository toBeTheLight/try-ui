let _touchO = {
  startX: 0,
  startY: 0,
  endX: 0,
  translateX: 0,
  width: 375,
  inited: false,
  direct: 'x',
  directInited: false,
  onTransition: false
}
_touchO.init = function (that) {
  if (this.inited) {
    return 
  }
  this.width = that.$el.offsetWidth
  this.inited = true
}
export default _touchO
