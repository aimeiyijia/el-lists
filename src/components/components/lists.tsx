import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
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

  mounted() {
    // console.log(this.$scopedSlots, '实例插槽')
  }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  render(h: CreateElement): VNode {
    // 分离插槽
    const { opera, status } = this.$scopedSlots
    const renderLists = () => {
      return this.listsData.map((list) => {
        return (
          <div class="el-lists">
            <lists-header data={list} />
            <lists-body data={list} {... { scopedSlots: { opera } }} />
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
