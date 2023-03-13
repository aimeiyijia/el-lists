import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

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
  name: 'ElListsMergePropsMixins'
})
export default class extends Vue {
  @Prop({ default: () => defaultRowProps })
  private readonly rowProps!: IRowProps

  get mergeProps() {
    return Object.assign({}, defaultRowProps, this.rowProps)
  }
}
