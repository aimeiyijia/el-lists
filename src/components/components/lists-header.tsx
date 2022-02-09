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
  @Prop({ default: () => { } }) private readonly data!: IListData
  created() {
    console.log(this, '头数据')
  }
  render() {
    const data = this.data
    const { status, title, middle, right } = this.$scopedSlots
    const renderStatusSlot = () => {
      if (!status) return data.status
      return status(this.data)
    }
    const renderTitleSlot = () => {
      if (!title) return data.status
      return title(this.data)
    }
    const renderMiddleSlot = () => {
      if (!middle) return
      return middle(this.data)
    }
    const renderRightSlot = () => {
      if (!right) return
      return right(this.data)
    }
    return (
      <div class="el-lists_header">
        <div class="header_left">
          <span class="status">{renderStatusSlot()}</span>
          <span class="title">{renderTitleSlot()}</span>
        </div>
        <div class="header_middle">{renderMiddleSlot()}</div>
        <div class="header_right">{renderRightSlot()}</div>
      </div>
    )
  }
}
