import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import ListsCell from './lists-cell'

interface ICell {
  columnsValue: string
  col?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
}
@Component({
  name: 'ListsCell',
  components: { ListsCell }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private readonly data!: ICell
  created() {
    // console.log(this.data, '单数据')
  }
  render() {
    const cellData = this.data
    return (
      <div
        class="el-lists_item"
      >
        <span class="name">{cellData.label + '：'}</span>

        <span class="data">
          {cellData.columnsValue}
        </span>
      </div>
    )
  }
}
