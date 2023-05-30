import { Vue, Component, Prop } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
import type { Empty } from 'element-ui'
@Component({
  name: 'NOData'
})
export default class extends Vue {
  @Prop({ default: () => ({}) })
  private readonly empty!: Empty

  render(h: CreateElement): VNode {
    const { emptyImage, emptyDefault, emptyDescription } = this.$scopedSlots
    // 组装插槽及作用域插槽
    const scopedSlots: any = {}
    if (emptyDefault) {
      Object.assign(scopedSlots, {
        default: emptyDefault
      })
    }
    if (emptyDescription) {
      Object.assign(scopedSlots, {
        description: emptyDescription
      })
    }
    const slots = []
    const customScopedSlots: any = {}
    for (const slot in scopedSlots) {
      slots.push({ name: slot, value: [h('template')] })
      // 插槽额外增加h函数，便于生成vnode
      customScopedSlots[slot] = () => {
        return scopedSlots[slot]({ h })
      }
    }
    return (
      <div class="el-lists_nodata">
        <el-empty
          {...{
            props: this.empty,
            scopedSlots: {
              image: emptyImage,
              ...customScopedSlots
            }
          }}
        >
          {slots.map(o => {
            return <template slot={o.name}>{o.value}</template>
          })}
        </el-empty>
      </div>
    )
  }
}
