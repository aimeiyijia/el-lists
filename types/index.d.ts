
import Vue from 'vue'
import { Row, Col } from 'element-ui'
// for future
// export interface InstallationOptions {}
// export function install (vue: typeof Vue, options: InstallationOptions): void

// now
export function install(vue: typeof Vue): void



export interface IScopedSlots {
  customRender?: string
  customTitle?: string
}
export interface ICell {
  columnsValue: string
  col?: {}
  label?: string
  prop?: string
  hidden?: boolean | ((data: any, cell: any) => boolean)
  showTooltip?: boolean | string
  scopedSlots?: IScopedSlots
  customRender?: any
  customTitle?: any
}

export interface IListData {
  $columnID: string
  $columnTitle?: string
  $columnStatus?: number
  $columnStatusType?: string
  $cellData: ICell[]
  $columnExtraData: ICell[]
}

export interface ILayout {
  row?: Row
  col?: Col
  operaStyleClass?: string
  operaStyle?: Object
}

