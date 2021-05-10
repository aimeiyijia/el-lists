import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import ElLists from './components/index.js'

import App from '@/App.vue'
import '@/icons/components'

Vue.use(ElementUI)
Vue.use(ElLists)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
