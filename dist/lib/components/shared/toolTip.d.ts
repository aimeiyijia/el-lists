import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';
import 'tippy.js/themes/light.css';
import type { ComponentInstance } from 'vue';
declare class ToolTip {
    toolTipInstance: any;
    instance: ComponentInstance | null;
    elClassName: string;
    constructor(instance: ComponentInstance, elClassName: string);
    showTooltip(): void;
    createTooltip(el: HTMLElement, content: string): import("tippy.js").Instance<import("tippy.js").Props>;
    hideTooltip(): void;
}
export default ToolTip;
