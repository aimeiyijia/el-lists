import { VNode, CreateElement } from 'vue';
import ElListsMergePropsMixins from './mixins/props';
declare const default_base: import("vue-class-component/lib/declarations").VueClass<ElListsMergePropsMixins>;
export default class extends default_base {
    private readonly data;
    private readonly columns;
    readonly colAttrs?: object;
    get listsData(): any[];
    get hasData(): boolean;
    transformDataToListData(o: any): any[];
    render(h: CreateElement): VNode;
}
export {};
