import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { cloneDeep } from '../utils/index'
import omit from 'lodash/omit'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import { Pagination } from 'element-ui'

import '../directives/height-adaptive'

import NoData from './no-data'

import ListsBase from './lists-base'

import PagStore from '../utils/store'

import '../styles/index.scss'
export declare class ElListsDefPagination {
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
  background: boolean
}

export declare interface IHeigthDirectives {
  offset: number
}

export declare interface IRowProps {
  titleProp: string
  statusProp: string
  extraProp: string
  statusTypeProp: string
}

const defaultRowProps: IRowProps = {
  titleProp: 'title',
  statusProp: 'status',
  extraProp: 'extra',
  statusTypeProp: 'statusType'
}

@Component({
  name: 'ElListsBase',
  components: { ListsBase, NoData }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private readonly listsData!: object[]

  @Prop({ default: false }) private readonly hasDataFlag!: boolean

  @Prop({ default: () => defaultRowProps })
  private readonly rowProps!: IRowProps

  // 默认情况下是否展开同类list
  @Prop({ default: false }) private readonly expand!: boolean

  // 表格高度
  @Prop({ default: false }) private readonly height!: string | boolean

  // 内置指令的配置项
  @Prop({
    type: [Boolean, Object],
    default: () => {
      return { offset: 40 }
    }
  })
  readonly directives?: boolean | IHeigthDirectives

  // 分页
  @Prop({
    type: [Boolean, Object],
    default: () => {
      return { pageSize: 10, currentPage: 1 }
    }
  })
  readonly pagination: Pagination | undefined | boolean

  @Prop({ type: Number, default: 0 }) readonly total: number | undefined

  // 表格所在的容器元素ID或Element，必须指定容器的高度
  @Prop({ type: [String, Object], default: '' }) readonly container?:
    | string
    | Element

  // 表格组件的 bodyWrapper元素
  private elListsContainer: any = null

  // 是否展示分页器
  isShowPag = true

  // 默认分页配置
  private defPagination: ElListsDefPagination = {
    currentPage: 1,
    pageSizes: [10, 20, 30, 50],
    pageSize: 10,
    layout: 'prev, pager, next, sizes, total',
    background: true
  }

  get hasData() {
    return this.hasDataFlag
  }

  @Watch('pagination', { deep: true })
  onPaginationChanged() {
    this.setPagination()
  }

  mounted() {
    this.setPagination()

    this.setTableScrollListener()
  }

  // 设置分页配置
  setPagination() {
    const pagination = this.pagination
    if (isBoolean(pagination)) {
      this.isShowPag = pagination as boolean
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
    const elListsContainer: any = (
      this.$refs['el-lists-container'] as HTMLElement
    ).querySelector('.el-scrollbar__wrap')
    if (!elListsContainer) return
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
    const getDirectives = () => {
      if (isBoolean(this.directives) && !this.directives) {
        return []
      }
      return [
        {
          name: 'height-adaptive',
          value: {
            container: this.container,
            offset: (this.directives as IHeigthDirectives).offset
          }
        }
      ]
    }

    const getStyle = () => {
      if (isBoolean(this.height)) {
        if (this.height) return { height: 'auto' }
        return {}
      }
      return {
        height: this.height
      }
    }
    const renderLists = () => {
      return cloneDeep(this.listsData).map(list => {
        const attrs = {
          props: {
            ...this.$attrs,
            data: list,
            expand: this.expand
          },
          attrs: {
            rowProps: this.rowProps
          },
          on: this.$listeners,
          scopedSlots: this.$scopedSlots
        }
        return <lists-base {...attrs}></lists-base>
      })
    }

    const renderPageSlot = () => {
      if (
        !Object.prototype.hasOwnProperty.call(this.$scopedSlots, 'pagination')
      )
        return
      return this.$scopedSlots.pagination!({
        h,
        total: this.total,
        config: omit(this.defPagination, ['pageSize', 'currentPage'])
      })
    }

    const decideRender = () => {
      return this.hasData ? (
        <el-scrollbar native={false} noresize={true}>
          {renderLists()}
        </el-scrollbar>
      ) : (
        <no-data></no-data>
      )
    }

    return (
      <div class="el-lists" ref="el-lists">
        <div
          class="el-lists-container"
          ref="el-lists-container"
          style={getStyle()}
          {...{
            directives: getDirectives()
          }}
        >
          {decideRender()}
        </div>
        {this.hasData && this.isShowPag && (
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
            {renderPageSlot() && (
              <span class="el-pagination__slot">{renderPageSlot()}</span>
            )}
          </el-pagination>
        )}
      </div>
    )
  }
}
