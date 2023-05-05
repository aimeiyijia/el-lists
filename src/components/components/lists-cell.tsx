import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import ListsCell from './lists-cell'

import ToolTip from '../shared/toolTip'

import { ICell } from 'types/index.d'

@Component({
  name: 'ListsCell',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => {} }) private readonly data!: ICell
  @Prop({ default: () => [] }) private readonly columnData!: ICell[]

  private toolTip: any = null

  mounted() {
    this.createTootip()
  }

  createTootip() {
    this.toolTip = new ToolTip(this, 'data')
  }

  showTooltip() {
    this.toolTip && this.toolTip.showTooltip()
  }

  hideTooltip() {
    this.toolTip && this.toolTip.hideTooltip()
  }

  render(h: CreateElement): VNode {
    const cellData = Object.assign({}, { scopedSlots: {} }, this.data)
    const { customTitle, customRender } = cellData.scopedSlots
    const renderTitle = () => {
      if (customTitle) {
        cellData.customTitle = this.$scopedSlots[customTitle]
      }
      if (cellData.customTitle) {
        return cellData.customTitle({
          h,
          data: this.columnData,
          cellData
        })
      }
      return cellData.label
    }
    const renderValue = () => {
      if (customRender) {
        cellData.customRender = this.$scopedSlots[customRender]
      }
      if (cellData.customRender) {
        return cellData.customRender({
          h,
          data: this.columnData,
          cellData
        })
      }
      return cellData.$columnsValue
    }

    return (
      <div
        class="el-lists_item"
        {...{
          on: {
            mouseover: this.showTooltip,
            mouseout: this.hideTooltip,
            click: () =>
              this.$emit('current-click', {
                data: this.columnData,
                cellData
              })
          }
        }}
      >
        <span class="name">{renderTitle()}</span>：
        <span class={['data', cellData.prop]}>{renderValue()}</span>
      </div>
    )
  }
}
