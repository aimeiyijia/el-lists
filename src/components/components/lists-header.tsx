import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Fragment } from 'vue-fragment'

import { IListData } from 'types/index.d'
@Component({
  name: 'ListsHeader',
  components: { Fragment }
})
export default class extends Vue {
  @Prop({ default: () => { } }) private readonly data!: IListData

  // 展开状态
  private isExpand = false

  private toggleExpand() {
    this.isExpand = !this.isExpand
    this.emitExpandChangeEvent()
  }

  @Emit('expand-change')
  emitExpandChangeEvent() {
    return {
      columnID: this.data.columnID,
      isExpand: this.isExpand
    }
  }

  render(h: CreateElement): VNode {
    const data = this.data
    const { status, title, left, right } = this.$scopedSlots
    const renderStatusSlot = () => {
      if (!status) return data.status
      return status(this.data)
    }
    const renderTitleSlot = () => {
      if (!title) return data.title
      return title(this.data)
    }
    const renderLeftSlot = () => {
      if (!left) return
      return left(this.data)
    }
    const renderLeft = () => {
      if (renderStatusSlot() || renderTitleSlot()) {
        return (
          <fragment>
            <span class={['status', data.statusType]}>{renderStatusSlot()}</span>
            <span class="title">{renderTitleSlot()}</span>
          </fragment>
        )
      }
      return renderLeftSlot()
    }
    const renderRightSlot = () => {
      if (!right) return
      return right(this.data)
    }
    return (
      <div class="el-lists_header">
        <div class="header_left">{renderLeft()}</div>
        {renderRightSlot() && <div class="header_right">{renderRightSlot()}</div>}
        {this.data.extraData.length > 0 && <i class={[this.isExpand ? 'el-icon-arrow-down' : 'el-icon-arrow-right']} onClick={this.toggleExpand} />}
      </div>
    )
  }
}
