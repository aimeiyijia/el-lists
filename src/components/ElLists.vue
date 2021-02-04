<template>
  <div class="el-lists">
    <div class="el-list" v-for="(list, key) in listData" :key="key">
      <div class="el-list_head">
        <span class="status">{{ list.status }}</span>
        <span class="title">{{ list.title }}</span>
      </div>
      <div class="el-list_content">
        <div
          class="el-list_item"
          v-for="(list, index) in list.item"
          :key="index"
        >
          <span class="name">{{ list.label + '：' }}</span>
          <span class="data">{{ list.VALUE }}</span>
        </div>
      </div>
    </div>
    <el-pagination
      class="el-lists_pagination"
      v-bind="pagination"
      :total="total"
      @size-change="this.pageSizeChange"
      @current-change="this.currentChange"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'

interface Pagination {
  pageSize: number | undefined | null
  currentPage: number | undefined | null
}

@Component({
  name: 'el-lists',
})
export default class extends Vue {
  @Prop(Number) readonly loading: Boolean | undefined
  @Prop({ default: () => [] }) private readonly data!: object[]
  @Prop({ default: () => [] }) private readonly columns!: object[]
  @Prop({ type: [Object, Boolean], default: false })
  private readonly pagination: Pagination | undefined | null
  @Prop({ type: Number, default: 0 }) private readonly total!: Number

  private pageSize = 20
  private currentPage = 1

  get listData() {
    let listData = []
    this.data.forEach(o => {
      let title = o.title
      let status = o.status
      let statusName = o.statusName
      let item = []
      this.columns.forEach(c => {
        let a = {}
        a.VALUE = o[c.prop]
        Object.assign(a, c)
        item.push(a)
      })
      listData.push({ title, status, statusName, item })
    })
    // const data = this.group(listData, listData.length / this.data.length)
    console.log(listData)
    return listData
  }

  group(array, subGroupLength) {
    var index = 0
    var newArray = []

    while (index < array.length) {
      newArray.push(array.slice(index, (index += subGroupLength)))
    }

    return newArray
  }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }
  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.emitPageChangeEvent()
  }
  currentChange(currentPage: number) {
    this.currentPage = currentPage
    this.emitPageChangeEvent()
  }
  emitPageChangeEvent() {
    this.$emit('page-change', {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    })
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
