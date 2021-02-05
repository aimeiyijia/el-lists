<template>
  <div class="el-lists">
    <div class="el-list" v-for="(list, key) in listData" :key="key">
      <div class="el-list_head">
        <span class="status" v-if="$scopedSlots.status">
          <slot name="status" :row="list" />
        </span>
        <span class="status" v-else>{{ list.status }}</span>

        <span class="title" v-if="$scopedSlots.title">
          <slot name="status" :row="list" />
        </span>
        <span class="title" v-else>{{ list.title }}</span>
      </div>
      <div class="el-lists_main">
        <div class="el-list_content" :style="{ width: contentWd }">
          <el-row>
            <el-col
              :span="6"
              v-bind="item.bootstrap"
              v-for="(item, index) in list.item"
              :key="index"
            >
              <div class="el-list_item">
                <slot
                  name="itemName"
                  :row="{ item, list }"
                  v-if="$scopedSlots.itemName"
                />
                <span class="name" v-else>{{ item.label + '：' }}</span>
                <slot
                  name="itemData"
                  :row="{ item, list }"
                  v-if="$scopedSlots.itemData"
                />
                <span class="data" v-else>{{ item.VALUE }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="el-list_opera" :style="{ width: operaWd + 'px' }">
          234
          <slot name="opera" :row="list" v-if="$scopedSlots.opera"></slot>
        </div>
      </div>
    </div>
    <el-pagination
      v-if="isPaginationShow"
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
interface Pagination {
  pageSize: number | undefined | null
  currentPage: number | undefined | null
}

@Component({
  name: 'el-lists',
})
export default class extends Vue {
  @Prop(Number) readonly loading: Boolean | undefined

  @Prop({ default: () => {} }) private readonly styleConfig!: object

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  @Prop({ type: [Object, Boolean], default: false })
  private readonly pagination: Pagination | undefined | null

  @Prop({ type: Number, default: 0 }) private readonly total!: Number

  private pageSize: number = 10
  private currentPage: number = 1

  private get isPaginationShow(): boolean {
    return Boolean(this.pagination && this.pagination.pageSize)
  }

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
    console.log(listData)
    return listData
  }

  get contentWd() {
    const width = this.styleConfig.operaWd + 48
    return `calc(100% - ${width + 'px'})`
  }

  get operaWd() {
    return this.styleConfig.operaWd
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

  @Emit('page-change')
  emitPageChangeEvent(): Pagination {
    return {
      pageSize: this.pageSize,
      currentPage: this.currentPage,
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
