import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import { IListData } from 'types/index.d';
export default class extends Vue {
    private readonly data;
    private isExpand;
    private toggleExpand;
    emitExpandChangeEvent(): {
        data: IListData;
        columnID: string;
        isExpand: boolean;
    };
    render(h: CreateElement): VNode;
}
