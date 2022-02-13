import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

import  {guid} from '../utils'

import ListsHeader from './lists-header'
import ListsBody from './lists-body'

import '../styles/index.scss'

@Component({
  name: 'ListsBase',
  components: { ListsHeader, ListsBody },
})
export default class extends Vue {

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly layout!: {}

  // 展开状态
  private expandParams = {
    isExpand: false,
    columnID: ''
  }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  handleExpandChange(params: any) {
    this.expandParams = params
  }

  render(h: CreateElement): VNode {
    const scopedSlots = this.$scopedSlots
    const layout = this.layout || {}
    const renderBody = (list: any) => {
      const bodyVnodes = []
      const attrs = {
        props: {
          data: list,
          layout
        },
        scopedSlots
      }
      bodyVnodes.push(<lists-body {...attrs} />)
      if (list.extraData) {
        list.extraData.map((e: any) => {
          const cloneList = cloneDeep(list)
          cloneList.cellData = e
          const extraDataAttrs = {
            props: {
              data: cloneList,
              layout
            },
            scopedSlots
          }
          bodyVnodes.push(<lists-body v-show={this.expandParams.columnID === list.columnID && this.expandParams.isExpand} {...extraDataAttrs} />)
        })
      }
      return bodyVnodes
    }

    const attrs = {
      props: {
        data: this.data,
        layout
      },
      scopedSlots
    }
    return  (
        <div class="el-lists_single">
          <lists-header {...attrs} {... { on: { 'expand-change': this.handleExpandChange } }} />
          {renderBody(this.data)}
        </div>
      )
  }
}
