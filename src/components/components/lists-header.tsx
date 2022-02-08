import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
interface ITitle {
  status: string
  title: string
}
@Component({
  name: 'ListsHeader'
})
export default class extends Vue {
  @Prop({ default: () => { } }) private readonly data!: ITitle
  created() {
    console.log(this.data, '头数据')
  }
  render() {
    const data = this.data
    return (
      <div class="el-lists_header">
        <span class="status">{data.status}</span>
        <span class="title">{data.title}</span>
      </div>
    )
  }
}
