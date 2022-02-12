import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Row, Col } from 'element-ui'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'

import ListsHeader from './lists-header'
import ListsBody from './lists-body'

import '../styles/index.scss'

@Component({
  name: 'ElLists',
  components: { ListsHeader, ListsBody },
})
export default class extends Vue {

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 展开状态
  private isExpand = false

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    this.data.forEach((o: any) => {
      let cellData: any[] = []
      let extraData: any[] = []
      cellData = this.confgDataToListData(o)
      if (o.extra) {
        o.extra.forEach((m: any) => {
          extraData.push(this.confgDataToListData(m))
        })
      }
      this.$set(o, 'cellData', cellData)
      this.$set(o, 'extraData', extraData)
      listsData.push(o)
    })
    return listsData
  }



  // 将this.data转换成符合列表要求的结构
  confgDataToListData(o: any) {
    const cellData: any[] = []
    cloneDeep(this.columns).forEach((c: any) => {
      const a: any = { columnsValue: '' }
      a.columnsValue = o[c.prop]
      Object.assign(a, c)
      cellData.push(a)
    })
    return cellData
  }

  // mounted() {
  //   console.log(this, '实例插槽')
  // }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  handleExpandChange(isExpand: boolean) {
    this.isExpand = isExpand
    console.log(isExpand)
  }

  render(h: CreateElement): VNode {
    const scopedSlots = this.$scopedSlots
    const layout = this.$attrs.layout || {}
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
          bodyVnodes.push(<lists-body v-show={this.isExpand} {...extraDataAttrs} />)
        })
      }
      return bodyVnodes
    }
    const renderLists = () => {
      return cloneDeep(this.listsData).map((list) => {
        const attrs = {
          props: {
            data: list,
            layout
          },
          scopedSlots
        }

        return (
          <div class="el-lists">
            <lists-header {...attrs} {... { on: { 'expand-change': this.handleExpandChange } }} />
            {renderBody(list)}
          </div>
        )
      })
    }
    return (
      <div class="el-lists-container">
        {renderLists()}
      </div>
    )
  }
}
