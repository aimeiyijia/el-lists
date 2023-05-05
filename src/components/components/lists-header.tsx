import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Fragment } from 'vue-frag'

import ToolTip from '../shared/toolTip'

import { IListData } from 'types/index.d'
@Component({
  name: 'ListsHeader',
  components: { Fragment }
})
export default class extends Vue {
  @Prop({ default: () => {} }) private readonly data!: IListData

  @Prop({ default: false }) private readonly expand!: boolean
  @Prop({ default: false }) private readonly titleToolTip!: boolean
  // 展开状态
  private isExpand = false

  private toolTip: any = null

  created() {
    this.isExpand = this.expand
    this.emitExpandChangeEvent()
  }

  mounted() {
    if (this.titleToolTip) {
      this.toolTip = new ToolTip(this, 'title')
    }
  }

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

  showTooltip() {
    this.toolTip && this.toolTip.showTooltip()
  }

  hideTooltip() {
    this.toolTip && this.toolTip.hideTooltip()
  }

  render(h: CreateElement): VNode {
    const data = this.data
    const {
      insertLeft,
      status,
      insertMiddle,
      title,
      insertRight,
      left,
      right
    } = this.$scopedSlots

    // 左侧-状态插槽
    const renderStatusSlot = () => {
      if (!status) return data.$columnStatus
      return status({
        h,
        data: this.data
      })
    }
    // 左侧-title插槽
    const renderTitleSlot = () => {
      if (!title) return data.$columnTitle
      return title({
        h,
        data: this.data
      })
    }
    // 左侧-在状态插槽左边的插槽
    const renderInsertLeft = () => {
      if (!insertLeft) return ''
      return insertLeft({
        h,
        data: this.data
      })
    }
    // 状态与title中间的插槽
    const renderInsertMiddle = () => {
      if (!insertMiddle) return ''
      return insertMiddle({
        h,
        data: this.data
      })
    }
    // 左侧-在title插槽右边的插槽
    const renderInsertRight = () => {
      if (!insertRight) return ''
      return insertRight({
        h,
        data: this.data
      })
    }
    // 左侧插槽
    const renderLeftSlot = () => {
      if (!left) return
      return left({
        h,
        data: this.data
      })
    }
    const renderLeft = () => {
      // 左侧插槽的优先级最高
      if (renderLeftSlot()) {
        return renderLeftSlot()
      }

      return (
        <fragment>
          {renderInsertLeft()}
          {renderStatusSlot() && (
            <div class={['status', data.$columnStatusType]}>
              {renderStatusSlot()}
            </div>
          )}
          {renderInsertMiddle()}
          {renderTitleSlot() && (
            <div
              class={
                ['title', this.titleToolTip ? 'title-tooltip' : '']
              }
              {...{
                on: {
                  mouseover: this.showTooltip,
                  mouseout: this.hideTooltip
                }
              }}
            >
              {renderTitleSlot()}
            </div>
          )}
          {renderInsertRight()}
        </fragment>
      )
    }
    const renderRightSlot = () => {
      if (!right) return
      return right({
        h,
        data: this.data
      })
    }
    return (
      <div class="el-lists_header">
        <div class="header_left">{renderLeft()}</div>
        {renderRightSlot() && (
          <div class="header_right">{renderRightSlot()}</div>
        )}
        {this.data.$columnExtraData &&
          this.data.$columnExtraData.length > 0 && (
            <i
              class={[
                this.isExpand ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
              ]}
              onClick={this.toggleExpand}
            />
          )}
      </div>
    )
  }
}
