import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import { Pagination } from 'element-ui';
import '../directives/height-adaptive';
import '../styles/index.scss';
declare interface IHeigthDirectives {
    offset: number;
}
declare interface IRowProps {
    titleProp: string;
    statusProp: string;
    extraProp: string;
    statusTypeProp: string;
}
export default class extends Vue {
    private readonly data;
    private readonly columns;
    private readonly rowProps;
    private readonly height;
    readonly directives?: boolean | IHeigthDirectives;
    readonly pagination: Pagination | undefined | boolean;
    readonly total: number | undefined;
    readonly container?: string | Element;
    private elListsContainer;
    isShowPag: boolean;
    private defPagination;
    onPaginationChanged(): void;
    get mergeProps(): IRowProps;
    get listsData(): any[];
    get hasData(): boolean;
    getValueByKey(key: string, row: any): any;
    transformDataToListData(o: any): any[];
    mounted(): void;
    setPagination(): void;
    setTableScrollListener(): void;
    pageSizeChange(pageSize: number): void;
    currentChange(currentPage: number): void;
    listScroll(e: MouseEvent): MouseEvent;
    emitPageChangeEvent(): {
        pageSize: number;
        currentPage: number;
    };
    emitSizeChangeEvent(): {
        pageSize: number;
        currentPage: number;
    };
    emitPrevClick(): {
        pageSize: number;
        currentPage: number;
    };
    emitNextClick(): {
        pageSize: number;
        currentPage: number;
    };
    render(h: CreateElement): VNode;
}
export {};
