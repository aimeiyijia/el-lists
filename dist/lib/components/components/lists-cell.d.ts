import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/themes/light.css';
import { ICell } from 'types/index.d';
export default class extends Vue {
    private readonly data;
    private readonly columnData;
    private instance;
    createTooltip(el: HTMLElement, content: string): import("tippy.js").Instance<import("tippy.js").Props>;
    isShowTooltip(item: ICell): void;
    hideTooltip(): void;
    render(h: CreateElement): VNode;
}
