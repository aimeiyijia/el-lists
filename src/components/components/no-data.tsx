import { Vue, Component } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'
const noDataPng = require('../assets/images/noData.png')
@Component({
  name: 'NOData',
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return (
      <div class="el-lists_nodata">
        <el-image src={ noDataPng }></el-image>
        <span>暂无数据</span>
      </div>
    )
  }
}
