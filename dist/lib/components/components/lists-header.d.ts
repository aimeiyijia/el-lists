import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import { IListData } from 'types/index.d';
export default class extends Vue {
    private readonly data;
    private readonly expand;
    private readonly titleTooltip;
    private isExpand;
    private toolTip;
    created(): void;
    mounted(): void;
    private toggleExpand;
    emitExpandChangeEvent(): {
        data: IListData;
        columnID: string;
        isExpand: boolean;
    };
    createTooltip(): void;
    showTooltip(): void;
    hideTooltip(): void;
    render(h: CreateElement): VNode;
}
