import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash.clonedeep'
import { guid, getValueByKey } from '../utils/index'
import ElListsIndex from '../components/index'
import ElListsMergePropsMixins from './mixins/props'

@Component({
  name: 'ElLists',
  components: { ElListsIndex }
})
export default class extends Mixins(ElListsMergePropsMixins) {
  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly rows!: object[]

  // 拼装好的数据
  get listsData() {
    const listsData: any[] = []
    const mergeRows = this.mergeDataToRows(this.data, this.rows)
    mergeRows.forEach((o: any) => {
      let cellData: any[] = []
      o.$columnID = guid()
      cellData = this.mergerRowDataToCell(o)
      this.$set(o, '$cellData', cellData)
      listsData.push(o)
    })
    return listsData
  }

  get hasData() {
    if (this.data && Object.keys(this.data).length > 0) return true
    return false
  }

  mergeDataToRows(data: any, cols: any) {
    const { titleProp, statusProp, statusTypeProp, extraProp } = this.mergeProps
    const cloneData = cloneDeep(data)
    const cloneCols = cloneDeep(cols)
    return cloneCols.map((o: any) => {
      // 取出来行对应的值
      const data = cloneData[o.prop]
      const singleColumnExtraData: any[] = []
      const singleColumnExtra = getValueByKey(extraProp, data)
      if (singleColumnExtra) {
        singleColumnExtra.forEach((m: any) => {
          singleColumnExtraData.push(
            this.mergerRowDataToCell({
              cell: o.cell,
              $rowData: m
            })
          )
        })
      }
      Object.assign(o, {
        $columnTitle: getValueByKey(titleProp, data),
        $columnStatus: getValueByKey(statusProp, data),
        $columnStatusType: getValueByKey(statusTypeProp, data),
        $columnExtraData: singleColumnExtraData,
        $rowData: data || {}
      })
      return o
    })
  }

  mergerRowDataToCell(o: any) {
    const { cell, $rowData } = o
    const cloneCell = cloneDeep(cell)
    return cloneCell.map((o: any) => {
      return Object.assign(o, {
        $columnsValue: $rowData[o.prop]
      })
    })
  }

  render(h: CreateElement): VNode {
    return (
      <el-lists-index
        {...{
          props: {
            ...this.$attrs,
            listsData: this.listsData,
            hasDataFlag: this.hasData
          },
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }}
      ></el-lists-index>
    )
  }
}
