import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import omit from 'lodash/omit'

import ListsHeader from './lists-header'
import ListsBody from './lists-body'

import '../styles/index.scss'

interface StyleConfig {
  operaWd: number
}

interface Item {
  columnsValue: string
  bootstrap?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
}

@Component({
  name: 'ElLists',
  components: {ListsHeader, ListsBody},
})
export default class extends Vue {

  @Prop({ default: {} }) private readonly styleConfig!: StyleConfig

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    this.data.forEach((o: any) => {
      const item: any[] = []
      this.columns.forEach((c: any) => {
        const a: Item = { columnsValue: '' }
        a.columnsValue = o[c.prop]
        o = omit(o, [c.prop])
        Object.assign(a, c)
        item.push(a)
      })
      listsData.push(Object.assign(o, { item }))
    })
    return listsData
  }

  get contentWd() {
    const width = this.styleConfig.operaWd + 48
    return `calc(100% - ${width + 'px'})`
  }

  get operaWd() {
    return this.styleConfig.operaWd
  }

  created() {
    console.log(this.listsData, '数据')
  }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  render(h: CreateElement): VNode {
    const renderLists = () => {
      return this.listsData.map((list) => {
        const titleData = omit(list, ['item'])
        return <div class="el-lists">
          <lists-header data={titleData}></lists-header>
          <lists-body data={list.item}></lists-body>
        </div>
      })
    }
    return <div class="el-lists-container">
      {renderLists()}
    </div>
  }
}
