import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { Row, Col } from 'element-ui'
import ListsCell from './lists-cell'

interface ICell {
  columnsValue: string
  col?: Col
  label?: string
  prop?: string
  showTooltip?: boolean | string
}

interface IListData {
  title: string,
  status: number,
  cellData: ICell[]
}

interface ILayout {
  row?: Row
  col?: Col
}
@Component({
  name: 'ListsBody',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => { } }) private readonly data!: IListData
  @Prop({ default: () => { } }) private readonly layout!: ILayout
  // mounted() {
  //   console.log(this.layout, '主体数据')
  // }

  render() {
    const cellData = this.data.cellData
    const { row = { gutter: 20 }, col = {} } = this.layout
    const renderOperaSlot = () => {
      if (!this.$scopedSlots.hasOwnProperty('opera')) return
      return this.$scopedSlots.opera!(this.data)
    }
    return (
      <div class="el-lists_main">
        <div class="el-lists_content">
          <el-row {...{ props: row }}>
            {
              cellData.map((cell: ICell) => {
                return (
                  <el-col {...{ props: Object.assign({}, col, cell.col) }}>
                    <lists-cell data={cell} {... { scopedSlots: this.$scopedSlots }}></lists-cell>
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
