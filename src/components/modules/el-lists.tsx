import { Component, Prop, Mixins } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { guid, getValueByKey } from '../utils/index'
import ElListsBase from '../components/index'
import ElListsMergePropsMixins from './mixins/props'
@Component({
  name: 'ElLists',
  components: { ElListsBase }
})
export default class extends Mixins(ElListsMergePropsMixins) {
  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    const { titleProp, statusProp, extraProp, statusTypeProp } = this.mergeProps
    this.data.forEach((o: any) => {
      let cellData: any[] = []
      const singleColumnExtraData: any[] = []
      o.$columnID = guid()
      cellData = this.transformDataToListData(o)

      o.$columnTitle = getValueByKey(titleProp, o)
      o.$columnStatus = getValueByKey(statusProp, o)
      o.$columnStatusType = getValueByKey(statusTypeProp, o)

      const singleColumnExtra = getValueByKey(extraProp, o)
      if (singleColumnExtra) {
        singleColumnExtra.forEach((m: any) => {
          singleColumnExtraData.push(this.transformDataToListData(m))
        })
      }
      this.$set(o, '$cellData', cellData)
      this.$set(o, '$columnExtraData', singleColumnExtraData)
      listsData.push(o)
    })
    return listsData
  }

  get hasData() {
    if (this.data && this.data.length && this.data.length > 0) return true
    return false
  }

  // 将this.data转换成符合列表要求的结构
  transformDataToListData(o: any) {
    const cellData: any[] = []
    cloneDeep(this.columns).forEach((c: any) => {
      const cols: any = { $columnsValue: '' }
      cols.$columnsValue = getValueByKey(c.prop, o)
      Object.assign(cols, c)
      cellData.push(cols)
    })
    return cellData
  }

  render(h: CreateElement): VNode {
    return (
      <el-lists-base
        {...{
          props: {
            ...this.$attrs,
            listsData: this.listsData,
            hasDataFlag: this.hasData
          },
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }}
      ></el-lists-base>
    )
  }
}
