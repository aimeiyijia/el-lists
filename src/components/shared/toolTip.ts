import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/animations/scale-extreme.css'
import 'tippy.js/themes/light.css'
import type { ComponentInstance } from 'vue'

class ToolTip {
  toolTipInstance: any = null
  instance: ComponentInstance | null = null
  elClassName = ''
  constructor(instance: ComponentInstance, elClassName: string) {
    this.instance = instance
    this.elClassName = elClassName
  }

  showTooltip() {
    if (this.instance && this.instance.$el) {
      const box = this.instance.$el.querySelector(
        `.${this.elClassName}`
      ) as HTMLElement
      if (box.scrollWidth > box.offsetWidth) {
        this.toolTipInstance = this.createTooltip(box, box.innerHTML)
      }
    }
  }

  createTooltip(el: HTMLElement, content: string) {
    const instance = tippy(el, {
      allowHTML: true,
      content,
      animation: 'scale-extreme',
      theme: 'light'
    })
    return instance
  }

  hideTooltip() {
    if (this.toolTipInstance) {
      this.toolTipInstance.destroy()
    }
  }
}

export default ToolTip
