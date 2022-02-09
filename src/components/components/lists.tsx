import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Row, Col } from 'element-ui'
import omit from 'lodash/omit'

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

  // @Prop({ default: () => { } }) private readonly layout?: ILayout

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    this.data.forEach((o: any) => {
      const cellData: any[] = []
      this.columns.forEach((c: any) => {
        const a: any = { columnsValue: '' }
        a.columnsValue = o[c.prop]
        o = omit(o, [c.prop])
        Object.assign(a, c)
        cellData.push(a)
      })
      listsData.push(Object.assign(o, { cellData }))
    })
    return listsData
  }

  // mounted() {
  //   console.log(this, '实例插槽')
  // }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  render(h: CreateElement): VNode {
    const renderLists = () => {
      return this.listsData.map((list) => {
        const attrs = {
          props: {
            data: list,
            layout: this.$attrs.layout || {}
          },
          scopedSlots: this.$scopedSlots
        }
        return (
          <div class="el-lists">
            <lists-header {...attrs} />
            <lists-body {...attrs} />
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
