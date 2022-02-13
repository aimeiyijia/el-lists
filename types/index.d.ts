
import Vue from 'vue'
import { Row, Col } from 'element-ui'
// for future
// export interface InstallationOptions {}
// export function install (vue: typeof Vue, options: InstallationOptions): void

// now
export function install(vue: typeof Vue): void

export interface ICell {
  columnsValue: string
  col?: {}
  label?: string
  prop?: string
  showTooltip?: boolean | string
  scopedSlots?: IScopedSlots
  customRender?: any
  customTitle?: any
}

export interface IListData {
  columnID: string
  title?: string,
  status?: number,
  statusType?: string,
  cellData: ICell[],
  extraData: ICell[],
}

export interface ILayout {
  row?: Row
  col?: Col
}

export interface IScopedSlots {
  customRender?: string
  customTitle?: string
}

