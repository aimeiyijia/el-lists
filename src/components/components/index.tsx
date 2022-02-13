import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import { Pagination, TableColumn } from 'element-ui'

import { guid } from '../utils'

import ListsBase from './lists-base'

import PagStore from '../utils/store'

import '../styles/index.scss'
declare class ElTableTsDefPagination {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
  background: boolean
}

@Component({
  name: 'ElLists',
  components: { ListsBase },
})
export default class extends Vue {

  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => [] }) private readonly columns!: object[]

  // 分页
  @Prop({ type: [Boolean, Object], default: () => { return { pageSize: 10, currentPage: 1 } } }) readonly pagination: Pagination | undefined | boolean
  @Prop({ type: Number, default: 0 }) readonly total: number | undefined

  // 表格组件的 bodyWrapper元素
  private elListsContainer: any = null

  // 是否展示分页器
  isShowPag = true

  // 默认分页配置
  private defPagination: ElTableTsDefPagination = {
    currentPage: 1,
    pageSizes: [10, 20, 30, 50],
    pageSize: 10,
    layout: 'prev, pager, next, sizes, total',
    background: true,
  }

  @Watch('pagination', { deep: true })
  onPaginationChanged() {
    this.setPagination()
  }

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

  mounted() {

    this.setPagination()

    this.setTableScrollListener()

  }





  // 设置分页配置
  setPagination() {
    const pagination = this.pagination
    if (isBoolean(pagination)) {
      this.isShowPag = (pagination as boolean)
    }
    if (isObject(pagination)) {
      this.isShowPag = true
      Object.assign(this.defPagination, pagination)
      const { pageSize, currentPage } = this.defPagination
      PagStore.setCurrentPage(currentPage)
      PagStore.setPageSize(pageSize)
    }
  }

  // 设置表格滚动监听器
  setTableScrollListener() {
    const elListsContainer: any = (this.$refs['el-lists-container'] as HTMLElement).querySelector('.el-scrollbar__wrap')
    this.elListsContainer = elListsContainer

    elListsContainer.addEventListener('scroll', this.listScroll)
    this.$once('hook:beforeDestroy', () => {
      this.elListsContainer.removeEventListener('scroll', this.listScroll)
    })
  }

  pageSizeChange(pageSize: number): void {
    PagStore.pageSize = pageSize
    this.emitSizeChangeEvent()
  }

  currentChange(currentPage: number): void {
    PagStore.setCurrentPage(currentPage)
    this.emitPageChangeEvent()
  }


  @Emit('scroll')
  listScroll(e: MouseEvent) {
    e.preventDefault()
    return e
  }


  @Emit('page-change')
  emitPageChangeEvent() {
    return {
      pageSize: PagStore.pageSize,
      currentPage: PagStore.currentPage
    }
  }

  @Emit('size-change')
  emitSizeChangeEvent() {
    return {
      pageSize: PagStore.pageSize,
      currentPage: PagStore.currentPage
    }
  }

  @Emit('prev-click')
  emitPrevClick() {
    return {
      pageSize: PagStore.pageSize,
      currentPage: PagStore.currentPage - 1
    }
  }

  @Emit('next-click')
  emitNextClick() {
    return {
      pageSize: PagStore.pageSize,
      currentPage: PagStore.currentPage + 1
    }
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

    const renderPageSlot = () => {
      if (!this.$scopedSlots.hasOwnProperty('pagination')) return
      return this.$scopedSlots.pagination!({
        total: this.total,
        config: omit(this.defPagination, ['pageSize', 'currentPage'])
      })
    }

    return (
      <div class="el-lists" ref="el-lists">
        <div class="el-lists-container" ref="el-lists-container">
          <el-scrollbar
            native={false}
            noresize={true}
          >
            {renderLists()}
          </el-scrollbar>

        </div>
        {this.isShowPag && (
          <el-pagination
            {...{ props: this.defPagination }}
            total={this.total}
            {...{
              on: {
                'size-change': this.pageSizeChange,
                'current-change': this.currentChange,
                'prev-click': this.emitPrevClick,
                'next-click': this.emitNextClick
              }
            }}
          >
            {renderPageSlot() && <span class="el-pagination__slot">{renderPageSlot()}</span>}
          </el-pagination>
        )}
      </div>

    )
  }
}
