// https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js

let clickHandler

export default {
  bind (el, bind, vnode) {
    clickHandler = (e) => {
      if (el.contains(e.target)) {
        return false
      }
      if (bind.value && typeof bind.value === 'function') {
        bind.value(e)
      }
    }
    document.addEventListener('click', clickHandler)
  },
  update () {
  },
  unbind () {
    document.removeEventListener('click', clickHandler)
  }
}
