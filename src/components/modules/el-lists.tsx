import { Component, Prop, Mixins } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash.clonedeep'
import { guid, getValueByKey } from '../utils/index'
import { judgeAndMask } from '../utils/maskData'
import ElListsIndex from '../components/index'
import ElListsMergePropsMixins from './mixins/props'
@Component({
  name: 'ElLists',
  components: { ElListsIndex }
})
export default class extends Mixins(ElListsMergePropsMixins) {
  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 更加统一化的列配置项
  @Prop({ type: Object, default: () => {} }) readonly colAttrs?: object

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
      const mergeCols = Object.assign({}, this.colAttrs, c)
      const { mask = true, prop } = mergeCols
      const cols: any = { $columnsValue: '' }
      const value = getValueByKey(prop, o)
      cols.$columnsValue = mask ? judgeAndMask(value) : value
      Object.assign(cols, c)
      cellData.push(cols)
    })
    return cellData
  }

  render(h: CreateElement): VNode {
    return (
      <el-lists-index
        {...{
          props: {
            ...this.$attrs,
            rowProps: this.mergeProps,
            listsData: this.listsData,
            hasDataFlag: this.hasData
          },
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }}
      ></el-lists-index>
    )
  }
}
