import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

import  {guid} from '../utils'

import ListsBase from './lists-base'

import '../styles/index.scss'

@Component({
  name: 'ElLists',
  components: { ListsBase },
})
export default class extends Vue {

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    this.data.forEach((o: any) => {
      o.columnID = guid()
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

  render(h: CreateElement): VNode {

    const renderLists = () => {
      return cloneDeep(this.listsData).map((list) => {
        const attrs = {
          props: {
            ...this.$attrs,
            data: list,
          },
          scopedSlots: this.$scopedSlots
        }
        return <lists-base  {...attrs}></lists-base>
      })
    }

    console.log(renderLists())

    return (
      <div class="el-lists-container">
        {renderLists()}
      </div>
    )
  }
}
