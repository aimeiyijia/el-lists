import { Vue } from 'vue-property-decorator';
export declare interface IRowProps {
    titleProp: string;
    statusProp: string;
    extraProp: string;
    statusTypeProp: string;
}
export default class extends Vue {
    private readonly rowProps;
    get mergeProps(): IRowProps;
}
