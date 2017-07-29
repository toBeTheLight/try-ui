let getStyle = function (el, name) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el).name
  } else {
    return el.currentStyle
  }
}
