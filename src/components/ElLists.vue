<template>
  <div class="el-lists-container">
    <div class="el-lists" v-height-adaptive>
      <div class="el-list" v-for="(list, key) in listData" :key="key">
        <div class="el-list_head">
          <!-- 状态 -->
          <span class="status" v-if="$scopedSlots.status">
            <slot name="status" :row="list" />
          </span>
          <span class="status" v-else>{{ list.status }}</span>
          <!-- 标题 -->
          <span class="title" v-if="$scopedSlots.title">
            <slot name="status" :row="list" />
          </span>
          <span class="title" v-else>{{ list.title }}</span>
        </div>
        <!-- 主体内容 -->
        <div class="el-lists_main">
          <div class="el-list_content" :style="{width: contentWd}">
            <el-row :gutter="20">
              <el-col
                v-for="(item, index) in list.item"
                :key="index"
                v-bind="item.bootstrap"
              >
                <div
                  class="el-list_item"
                  :ref="JSON.stringify(item)"
                  @mouseover="isShowTooltip(item, JSON.stringify(item))"
                  @mouseout="isShowTooltip(item, JSON.stringify(item))"
                >
                  <slot
                    name="itemName"
                    :row="{item, list}"
                    v-if="$scopedSlots.itemName"
                  />
                  <span class="name" v-else>{{ item.label + '：' }}</span>

                  <span v-if="$scopedSlots.itemData">
                    <slot name="itemData" :row="{item, list}" />
                  </span>
                  <span class="data" v-else>
                    {{ item.columnsValue }}
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="el-list_opera" :style="{width: operaWd + 'px'}">
            内置操作
            <slot name="opera" :row="list" v-if="$scopedSlots.opera"></slot>
          </div>
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
import _ from 'lodash'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling
import 'tippy.js/animations/scale-extreme.css'
import './directives'
// import {
//   addResizeListener,
//   removeResizeListener
// } from 'element-ui/src/utils/resize-event'
interface Pagination {
  pageSize: number | undefined | null
  currentPage: number | undefined | null
}

interface StyleConfig {
  operaWd: number
}

interface Item {
  columnsValue: string
}

@Component({
  name: 'el-lists'
})
export default class extends Vue {
  @Prop(Number) readonly loading: Boolean | undefined

  @Prop({ default: {} }) private readonly styleConfig!: StyleConfig

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  @Prop({ type: [Object, Boolean], default: false })
  private readonly pagination: Pagination | undefined | null

  @Prop({ type: Number, default: 0 }) private readonly total!: Number

  private pageSize = 10
  private currentPage = 1

  private get isPaginationShow(): boolean {
    return Boolean(this.pagination && this.pagination.pageSize)
  }

  get listData() {
    const listData: any[] = []
    this.data.forEach((o: any) => {
      const item: any[] = []
      this.columns.forEach((c: any) => {
        const a: Item = { columnsValue: '' }
        a.columnsValue = o[c.prop]
        o = _.omit(o, [c.prop])
        Object.assign(a, c)
        item.push(a)
      })
      console.log(item, '项目')
      listData.push(Object.assign(o, { item }))
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

  isShowTooltip(item, elRef) {
    // console.log(status)
    // console.log(item)
    // console.log(elRef)
    if (item.showTooltip === 'auto') {
      const box = (this.$refs[elRef] as HTMLElement[])[0]
      // console.log(box)
      if (box.scrollWidth > box.offsetWidth) {
        console.log('出现了省略号')
        tippy(box, {
          content: `${item.label}：${item.columnsValue}`,
          animation: 'scale-extreme'
        })
      } else {
        console.log('没有出现省略号')
      }
    }
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
      currentPage: this.currentPage
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
