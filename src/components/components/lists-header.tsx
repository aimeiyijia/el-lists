import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
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
  name: 'ListsHeader'
})
export default class extends Vue {
  @Prop({ default: () => {} }) private readonly data!: IListData
  created() {
    // console.log(this.data, '头数据')
  }
  render() {
    const data = this.data
    return (
      <div class="el-lists_header">
        <span class="status">{data.status}</span>
        <span class="title">{data.title}</span>
      </div>
    )
  }
}
