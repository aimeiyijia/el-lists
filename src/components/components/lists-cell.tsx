import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode } from 'vue'
import ListsCell from './lists-cell'
import Clamp from '../utils/Clamp'

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

  mounted() {
    // const hrContentEls = document.querySelectorAll(`.el-lists_item .${this.data.prop}`)
    // console.log(hrContentEls, '元素')
    // hrContentEls.forEach(el => {
    //   Clamp(2, el)
    // })
  }

  render() {
    const cellData = Object.assign({}, { scopedSlots: {} }, this.data)
    // console.log(cellData, 'cell数据')
    const { customTitle, customRender } = cellData.scopedSlots
    const renderTitle = () => {
      if(customTitle){
        cellData.customTitle = this.$scopedSlots[customTitle]
      }
      if (cellData.customTitle) {
        return cellData.customTitle(cellData)
      }
      return cellData.label
    }
    const renderValue = () => {
      if(customRender){
        cellData.customRender = this.$scopedSlots[customRender]
      }
      if (cellData.customRender) {
        return cellData.customRender(cellData)
      }
      return cellData.columnsValue
    }
    return (
      <div class="el-lists_item">
        <span class="name">{renderTitle()}</span>
        ：
        <span class={['data', cellData.prop]}>
          {renderValue()}
        </span>
      </div>
    )
  }
}
