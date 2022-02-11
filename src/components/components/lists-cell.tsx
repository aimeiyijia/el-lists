import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import ListsCell from './lists-cell'
import isBoolean from 'lodash/isBoolean'

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/animations/scale-extreme.css'
import 'tippy.js/themes/light.css'

interface IScopedSlots {
  customRender?: string
  customTitle?: string
}
interface ICell {
  columnsValue: string
  col?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
  scopedSlots?: IScopedSlots
  customRender?: any
  customTitle?: any
}


@Component({
  name: 'ListsCell',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private readonly data!: ICell

  private instance: any = null

  mounted() {
    // const hrContentEls = document.querySelectorAll(`.el-lists_item .${this.data.prop}`)
    // console.log(hrContentEls, '元素')
    // hrContentEls.forEach(el => {
    //   Clamp(2, el)
    // })
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

  isShowTooltip(item: ICell, elRef: string) {
    if(!isBoolean(item.showTooltip)) return console.error('showTooltip must be boolean')
    if (item.showTooltip) {
      const box = this.$el.querySelector('.data') as HTMLElement
      if (box.scrollWidth > box.offsetWidth) {
        this.instance = this.createTooltip(
          box,
          box.innerHTML
        )
      }
    }
  }

  hideTooltip() {
    if (this.instance) {
      this.instance.destroy()
    }
  }





  render(h: CreateElement): VNode {
    const cellData = Object.assign({}, { scopedSlots: {} }, this.data)
    // console.log(cellData, 'cell数据')
    const { customTitle, customRender } = cellData.scopedSlots
    const renderTitle = () => {
      if (customTitle) {
        cellData.customTitle = this.$scopedSlots[customTitle]
      }
      if (cellData.customTitle) {
        return cellData.customTitle(cellData)
      }
      return cellData.label
    }
    const renderValue = () => {
      if (customRender) {
        cellData.customRender = this.$scopedSlots[customRender]
      }
      if (cellData.customRender) {
        return cellData.customRender(cellData)
      }
      return cellData.columnsValue
    }

    return (
      <div class="el-lists_item"
        ref={JSON.stringify(cellData)}
        {...{
          on: {
            mouseover: () => this.isShowTooltip(cellData, JSON.stringify(cellData)),
            mouseout: this.hideTooltip
          }
        }}>
        <span class="name">{renderTitle()}</span>
        ：
        <span class={['data', cellData.prop]}>
          {renderValue()}
        </span>
      </div>
    )
  }
}
