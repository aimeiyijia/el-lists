import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
export default class extends Vue {
    render(h: CreateElement): VNode;
}
