import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Row, Col } from 'element-ui'
import ListsCell from './lists-cell'

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
    const { row = { gutter: 20 }, col = { span: 6 } } = this.layout
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
                return (
                  <el-col {...{ props: Object.assign({}, col, cell.col) }}>
                    <lists-cell columnData={this.data} data={cell} {... { scopedSlots: this.$scopedSlots }}></lists-cell>
                  </el-col>
                )
              })
            }
          </el-row>
        </div>
        <div class="el-lists_opera">
          {renderOperaSlot()}
        </div>
      </div>
    )
  }
}
