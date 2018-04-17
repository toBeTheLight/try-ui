import TryButton from './button/Button.vue'
import TryDatePicker from './date-picker/DatePicker.vue'

let all = {
  TryButton,
  TryDatePicker
}

export default function installElementCmpts (Vue) {
  for (let name in all) {
    if (all.hasOwnProperty(name)) {
      Vue.component(name, all[name])
    }
  }
}
