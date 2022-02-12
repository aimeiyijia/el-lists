import Component from './components'

function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.component('el-lists', Component)
}
Component.install = install

// auto plugin install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue
}
if (GlobalVue) {
  GlobalVue.use(Component)
}

// export default
export default Component
