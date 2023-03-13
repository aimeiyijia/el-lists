import { Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import { Pagination } from 'element-ui';
import '../directives/height-adaptive';
import '../styles/index.scss';
export declare class ElListsDefPagination {
    currentPage: number;
    pageSizes: number[];
    pageSize: number;
    layout: string;
    background: boolean;
}
export declare interface IHeigthDirectives {
    offset: number;
}
export declare interface IRowProps {
    titleProp: string;
    statusProp: string;
    extraProp: string;
    statusTypeProp: string;
}
export default class extends Vue {
    private readonly listsData;
    private readonly hasDataFlag;
    private readonly rowProps;
    private readonly height;
    readonly directives?: boolean | IHeigthDirectives;
    readonly pagination: Pagination | undefined | boolean;
    readonly total: number | undefined;
    readonly container?: string | Element;
    private elListsContainer;
    isShowPag: boolean;
    private defPagination;
    get hasData(): boolean;
    onPaginationChanged(): void;
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
