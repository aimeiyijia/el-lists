import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import ListsCell from './lists-cell'

interface ICell {
  columnsValue: string
  col?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
}

interface IListData {
  title: string,
  status: number,
  cellData: ICell[]
}
@Component({
  name: 'ListsBody',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => {} }) private readonly data!: IListData
  mounted() {
    // console.log(this, '主体数据')
  }

  render() {
    const cellData = this.data.cellData
    const renderOperaSlot = () => {
      if (!this.$scopedSlots.hasOwnProperty('opera')) return
      return this.$scopedSlots.opera!(this.data)
    }
    return (
      <div class="el-lists_main">
        <div class="el-lists_content">
          <el-row gutter={20}>
            {
              cellData.map((cell: ICell) => {
                return (
                  <el-col {...{ props: cell.col }}>
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
