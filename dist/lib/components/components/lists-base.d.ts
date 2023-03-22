import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import '../styles/index.scss';
export default class extends Vue {
    private readonly data;
    private readonly layout?;
    private readonly expand;
    private expandParams;
    listScroll(e: MouseEvent): void;
    handleExpandChange(params: any): void;
    render(h: CreateElement): VNode;
}
