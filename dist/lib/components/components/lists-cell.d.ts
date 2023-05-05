import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
export default class extends Vue {
    private readonly data;
    private readonly columnData;
    private toolTip;
    mounted(): void;
    createTootip(): void;
    showTooltip(): void;
    hideTooltip(): void;
    render(h: CreateElement): VNode;
}
