import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import ListsCell from './lists-cell'

import { isBoolean, isFunction, isUndefined } from '../utils/types'

import { ICell, IListData, ILayout } from 'types/index.d'
@Component({
  name: 'ListsBody',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => { } }) private readonly data!: IListData
  @Prop({ default: () => { } }) private readonly layout!: ILayout

  render(h: CreateElement): VNode {
    const cellData = this.data.cellData
    const { row = { gutter: 20 }, col = { span: 6 }, operaStyle = {}, operaStyleClass = '' } = this.layout
    const renderOperaSlot = () => {
      if (!this.$scopedSlots.hasOwnProperty('opera')) return
      return this.$scopedSlots.opera!({
        data: this.data,
        h
      })
    }
    return (
      <div class="el-lists_main">
        <div class="el-lists_content">
          <el-row {...{ props: row }}>
            {
              cellData.map((cell: ICell) => {
                const { hidden } = cell
                let willHidden = false
                if (isFunction(hidden)) {
                  willHidden = (hidden as Function)(this.data, cell)
                } else {
                  willHidden = isBoolean(hidden) ? hidden as boolean : false
                }
                if (willHidden) return

                return (
                  <el-col {...{ props: Object.assign({}, col, cell.col) }}>
                    <lists-cell columnData={this.data} data={cell} {... { on: this.$listeners, scopedSlots: this.$scopedSlots }}></lists-cell>
                  </el-col>
                )
              }).filter(o => o)
            }
          </el-row>
        </div>
        <div class={['el-lists_opera', operaStyleClass]} style={operaStyle} >
          {renderOperaSlot()}
        </div>
      </div>
    )
  }
}
