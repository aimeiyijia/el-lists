import Vue, { DirectiveOptions, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { debounce } from 'ts-debounce'

// 用于存储全局性的resize事件
const globalEventListener = {
  f: () => { }
}

interface IHTMLElement extends HTMLElement {
  f: () => void
  offsetTop: number
  offsetParent: HTMLElement
}

interface IOffset {
  offset: number
}

function getOffsetTop(elem: IHTMLElement): number {
  let top = elem.offsetTop;
  let parent = elem.offsetParent;
  while (parent) {
    top += parent.offsetTop;
    parent = parent.offsetParent as IHTMLElement;
  }
  return top;
}

// 表格从页面底部开始的高度。

const calcTableHeight = (element: IHTMLElement, offset: IOffset) => {
  const wiH = window.innerHeight || 400

  const offsetTop = getOffsetTop(element)

  const elOB = offset.offset || 40

  const height = wiH - elOB - offsetTop
  return height
}

const doResize = (el: IHTMLElement, binding: DirectiveBinding) => {
  const height = calcTableHeight(el, binding.value)
  el.style.height = `${height}px`
}

const directive: DirectiveOptions = {
  bind(el, binding, vnode) {
    const elType = el as unknown as IHTMLElement
    const resizeListener = () => doResize(elType, binding)
    globalEventListener.f = debounce(resizeListener, 100)
    window.addEventListener('resize', globalEventListener.f)
    // 立刻执行一次
    doResize(elType, binding)
  },
  update(el, binding, vnode) {
    window.removeEventListener('resize', globalEventListener.f)

    const elType = el as unknown as IHTMLElement
    const resizeListener = () => doResize(elType, binding)
    globalEventListener.f = debounce(resizeListener, 100)
    window.addEventListener('resize', globalEventListener.f)

    doResize(el as unknown as IHTMLElement, binding)
  },
  unbind() {
    window.removeEventListener('resize', globalEventListener.f)
  },
}

Vue.directive('height-adaptive', directive)
