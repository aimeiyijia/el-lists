import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import { Fragment } from 'vue-frag'
import cloneDeep from 'lodash/cloneDeep'

import ListsHeader from './lists-header'
import ListsBody from './lists-body'

import { ILayout } from 'types/index.d'

import '../styles/index.scss'

@Component({
  name: 'ListsBase',
  components: { ListsHeader, ListsBody, Fragment }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private readonly data!: object[]

  @Prop({ default: () => {} }) private readonly layout?: ILayout

  @Prop({ default: false }) private readonly expand!: boolean
  // 展开状态
  private expandParams = {
    isExpand: false,
    columnID: ''
  }

  listScroll(e: MouseEvent) {
    e.preventDefault()
    this.$emit('scroll', e)
  }

  handleExpandChange(params: any) {
    this.expandParams = params
    this.$emit('expand', params)
  }

  render(h: CreateElement): VNode {
    const scopedSlots = this.$scopedSlots
    const { expand } = scopedSlots
    const layout = this.layout || {}
    const renderBody = (list: any) => {
      const bodyVnodes = []
      const attrs = {
        props: {
          data: list,
          layout
        },
        on: this.$listeners,
        scopedSlots
      }
      bodyVnodes.push(<lists-body {...attrs}></lists-body>)

      const renderSlotsOrExtraData = () => {
        if (expand) {
          return expand({
            data: list,
            h
          })
        }
        if (list.$columnExtraData) {
          const Vnodes: JSX.Element[] = []
          list.$columnExtraData.map((e: any) => {
            const cloneList = cloneDeep(list)
            cloneList.$cellData = e
            const extraDataAttrs = {
              props: {
                data: cloneList,
                layout
              },
              on: this.$listeners,
              scopedSlots
            }
            Vnodes.push(
              <lists-body
                v-show={
                  this.expandParams.columnID === list.$columnID &&
                  this.expandParams.isExpand
                }
                {...extraDataAttrs}
              ></lists-body>
            )
          })
          return Vnodes
        }
        return []
      }

      bodyVnodes.push(
        <div
          class="el-lists_expand"
          v-show={
            this.expandParams.columnID === list.$columnID &&
            this.expandParams.isExpand
          }
        >
          {renderSlotsOrExtraData()}
        </div>
      )

      return bodyVnodes
    }

    const attrs = {
      props: {
        data: this.data,
        expand: this.expand,
        layout
      },
      scopedSlots
    }
    return (
      <div class="el-lists_single">
        <lists-header
          {...attrs}
          {...{
            on: { ...this.$listeners, 'expand-change': this.handleExpandChange }
          }}
        ></lists-header>
        {renderBody(this.data)}
      </div>
    )
  }
}
