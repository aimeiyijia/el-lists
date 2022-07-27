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

interface IParams {
  offset?: number
  container?: string | HTMLElement
}

function getInnerHeight(elem: HTMLElement) {
  const computed = getComputedStyle(elem);
  const padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

  return elem.clientHeight - padding
}

function query(el: string | HTMLElement): HTMLElement {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    return selected as HTMLElement
  } else {
    return el
  }
}

function getOffsetTop(elem: HTMLElement, inContainer: boolean): number {
  let top = elem.offsetTop;
  if (inContainer) return top

  let parent = elem.offsetParent as HTMLElement;
  while (parent) {
    top += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }
  return top;
}

// 表格从页面底部开始的高度。

const calcTableHeight = (element: HTMLElement, params: IParams) => {
  const defaultHeight = 400

  let containerEl: HTMLElement = document.body
  if (params.container) {
    const queryEl = query(params.container)
    if (queryEl) {
      queryEl.style.position = 'relative'
      containerEl = queryEl
    }
  }

  const containerHeight = getInnerHeight(containerEl) || defaultHeight
  const topOffset = getOffsetTop(element, !!params.container)

  const bottomOffset = params.offset || 0

  let height = containerHeight - bottomOffset - topOffset

  // 高度是负数，将被设置为默认高度
  if (height <= 0) {
    console.warn('表格高度为负，已设置为默认高度(400)，请检查body元素或指定的容器元素高度')
    height = defaultHeight
  }

  return height
}

const doResize = (el: IHTMLElement, binding: DirectiveBinding, vnode: VNode) => {
  const height = calcTableHeight(el, binding.value)
  el.style.height = `${height}px`
  const {componentInstance: $ElLists} = vnode!.children![0] as any
  if($ElLists){
    console.log($ElLists, '实例')
    $ElLists.update()
  }
}

const directive: DirectiveOptions = {
  bind(el, binding, vnode) {
    const elType = el as unknown as IHTMLElement
    const resizeListener = () => doResize(elType, binding, vnode)
    globalEventListener.f = debounce(resizeListener, 100)
    window.addEventListener('resize', globalEventListener.f)
    // 立刻执行一次
    doResize(elType, binding, vnode)
  },
  update(el, binding, vnode) {
    window.removeEventListener('resize', globalEventListener.f)

    const elType = el as unknown as IHTMLElement
    const resizeListener = () => doResize(elType, binding, vnode)
    globalEventListener.f = debounce(resizeListener, 100)
    window.addEventListener('resize', globalEventListener.f)

    doResize(el as unknown as IHTMLElement, binding, vnode)
  },
  unbind() {
    window.removeEventListener('resize', globalEventListener.f)
  },
}

Vue.directive('height-adaptive', directive)
