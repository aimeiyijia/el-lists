import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import ListsCell from './lists-cell'

interface ICell {
  columnsValue: string
  bootstrap?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
}
@Component({
  name: 'ListsBody',
  components: {ListsCell}
})
export default class extends Vue {
  @Prop({ default: () => [] }) private readonly data!: ICell[]
  created() {
    console.log(this.data, '主体数据')
  }
  render() {
    const cellData = this.data
    return (
      <div class="el-lists_main">
        <div class="el-lists_content">
          <el-row>
            {
              cellData.map((cell: ICell) => {
                return <el-col>
                  <lists-cell data={cell}></lists-cell>
                </el-col>
              })
            }
          </el-row>
        </div>
        <div class="el-list_opera"></div>
      </div>
    )
  }
}
