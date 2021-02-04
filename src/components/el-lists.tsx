import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import './index.scss'

interface Pagination {
  pageSize: number | undefined | null
  currentPage: number | undefined | null
}

@Component({
  name: 'el-lists'
})
export default class extends Vue {

  @Prop(Number) readonly loading: Boolean | undefined
  @Prop({ default: () => [] }) private readonly data!: object[]
  @Prop({ default: () => [] }) private readonly columns!: object[]
  @Prop({ type: [Object, Boolean], default: false }) private readonly pagination: Pagination | undefined | null
  @Prop({ type: Number, default: 0 }) private readonly total!: Number
  private pageSize = 20
  private currentPage = 1

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

  render(h: CreateElement): VNode {

    const rederList = o => {
      return (
        <div class="el-list">
          <div class="el-list_title"></div>
          <div class="el-list_content">
            <div class="el-list_item">
              <span class="name">数据名称</span>
              <span class="data">数据</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div class="el-lists" v-loading={this.loading}>
        {rederList({data: this.data,columns: this.columns})}
        {this.pagination && (
          <el-pagination
            {...{ props: this.pagination }}
            total={this.total}
            on-size-change={this.pageSizeChange}
            on-current-change={this.currentChange}
          />
        )}
      </div>
    )
  }
}
