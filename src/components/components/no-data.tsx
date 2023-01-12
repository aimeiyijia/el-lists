import { Vue, Component } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
@Component({
  name: 'NOData',
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return (
      <div class="el-lists_nodata">
        <el-empty></el-empty>
      </div>
    )
  }
}
