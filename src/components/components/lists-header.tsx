import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Fragment } from 'vue-frag'

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
      data: this.data,
      columnID: this.data.$columnID,
      isExpand: this.isExpand
    }
  }

  render(h: CreateElement): VNode {
    const data = this.data
    const { status, title, left, right } = this.$scopedSlots

    // 左侧-状态插槽
    const renderStatusSlot = () => {
      if (!status) return data.$columnStatus
      return status({
        h,
        data: this.data,
      })
    }
    // 左侧-title插槽
    const renderTitleSlot = () => {
      if (!title) return data.$columnTitle
      return title({
        h,
        data: this.data,
      })
    }
    // 左侧插槽
    const renderLeftSlot = () => {
      if (!left) return
      return left({
        h,
        data: this.data,
      })
    }
    const renderLeft = () => {
      // 左侧插槽的优先级最高
      if (renderLeftSlot()) {
        return renderLeftSlot()
      }

      return (
        <fragment>
          {
            renderStatusSlot() && <span class={['status', data.$columnStatusType]}>{renderStatusSlot()}</span>
          }
          {
            renderTitleSlot() && <span class="title">{renderTitleSlot()}</span>
          }
        </fragment>
      )
    }
    const renderRightSlot = () => {
      if (!right) return
      return right({
        h,
        data: this.data,
      })
    }
    return (
      <div class="el-lists_header">
        <div class="header_left">{renderLeft()}</div>
        {renderRightSlot() && <div class="header_right">{renderRightSlot()}</div>}
        {this.data.$columnExtraData.length > 0 && <i class={[this.isExpand ? 'el-icon-arrow-down' : 'el-icon-arrow-right']} onClick={this.toggleExpand} />}
      </div>
    )
  }
}
