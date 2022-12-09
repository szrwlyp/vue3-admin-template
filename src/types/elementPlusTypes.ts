/**
 * 按钮（button）公共配置
 * @param size 按钮尺寸
 * @param type 按钮类型
 * @param plain 是否为朴素按钮
 * @param text 是否为文字按钮
 * @param bg 是否显示文字按钮背景颜色
 * @param link 是否为链接按钮
 * @param round 是否为圆角按钮
 * @param circle 是否为圆形按钮
 * @param loading 是否为加载中状态
 * @param loadingIcon 自定义加载中状态图标组件
 * @param disabled 按钮是否为禁用状态
 * @param icon 按钮图标组件
 * @param autoInsertSpace 自动在两个中文字符之间插入空格
 * @param color 自定义按钮颜色, 并自动计算 hover 和 active 触发后的颜色
 */
interface PublicButton {
  size?: "large" | "small";
  type?: "primary" | "success" | "info" | "warning" | "danger";
  plain?: boolean;
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  loadingIcon?: boolean;
  disabled?: boolean;
  icon?: string;
  autoInsertSpace?: boolean;
  color?: string;
}

/**
 * 公共表格组件列（cloumn）接口
 * @param prop 字段名称 对应列内容的字段名
 * @param label 显示的标题
 * @param isChange 是否需要将数据转换成所需的内容
 * @param component 转换所需内容的组件
 * @param compOptions 组件选项配置
 */
export interface TableCloumnArrTypes {
  prop: string;
  label: string;
  isChange?: boolean;
  component?: string;
  compOptions?: tableCompOptions;
}
/**
 * table 选项配置
 * @param operationButtonArr 操作按钮
 */
interface tableCompOptions {
  operationButtonArr?: Array<operationButtonArr>;
}

/**
 * 表格操作按钮配置
 * @param buttonText 按钮文本
 * @param emitEvent 按钮事件
 */
interface operationButtonArr extends PublicButton {
  buttonText?: string;
  emitEvent: "emitEditOperation" | "emitDeleteOperation";
}

/**
 * 表格查询条件接口
 * @param label el-form-item label标签文本
 * @param prop model的键名。在定义了 validate、resetFields 的方法时，该属性是必填的。
 * @param model v-model值
 * @param disableEditData 禁止编辑数据
 * @param component 所需组件
 * @param compOptions 组件的选项参数（配置项）
 */
type component =
  | "input"
  | "select"
  | "datePicker"
  | "button"
  | "switch"
  | "checkbox"
  | "upload";
export interface formItemArrTypes {
  label?: string;
  prop: string;
  model: string;
  disableEditData?: boolean;
  component: component;
  inputCompOptions?: InputCompOptions;
  dateCompOptions?: DateCompOptions;
  buttonCompOptions?: ButtonCompOptions;
  selectCompOptions?: SelectCompOptions;
  switchCompOptions?: SwitchCompOptions;
  checkboxCompOptions?: CheckboxCompOptions;
  uploadCompOptions?: UploadCompOptions;
}

/**
 * 输入框（input）组件选项配置
 * @param type 输入框类型
 * @param maxlength 最大输入长度
 * @param inputSlot 复合类型插槽
 * @param inputSlotContent 插槽内容
 * @param inputEmitEvent emit事件
 * @param size 输入框尺寸，只在 type 不为 'textarea' 时有效
 */
type inputType = "text" | "textarea" | "password";
interface AutoSize {
  minRows: number;
  maxRows: number;
}
export interface InputCompOptions {
  placeholder: string;
  width?: string;
  type?: inputType;
  maxlength?: string | number;
  inputSlot?: string;
  inputSlotContent?: string | Array<SearchType>;
  inputEmitEvent?: "emitTest" | "emitSubmitButton";
  size?: string;
  autosize?: boolean | AutoSize;
  showWordLimit?: boolean;
}

/**
 * 日期组件选项配置
 * @param type 显示类型
 * @param format  输入框格式
 * @param valueFormat  可选，绑定值的格式。 不指定则绑定值为 Date 对象
 * @param startPlaceholder 范围选择时开始日期的占位内容
 * @param endPlaceholder 范围选择时结束日期的占位内容
 * @param shortcuts 设置快捷选项，需要传入数组对象
 * @param disabledDate 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
 */
export interface DateCompOptions {
  placeholder: string;
  width?: string;
  type:
    | "year"
    | "month"
    | "date"
    | "dates"
    | "datetime"
    | "week"
    | "datetimerange"
    | "daterange"
    | "monthrange";
  format?: string;
  valueFormat: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  shortcuts?: Array<{ text: string; value: Date | Function | Array<Date> }>;
  disabledDate?: Function;
}

/**
 * 按钮（button）组件选项配置
 * @param buttonArr 按钮数组
 */
export interface ButtonCompOptions {
  buttonArr?: Array<ButtonOptions>;
}
interface ButtonOptions extends PublicButton {
  buttonText?: string;
  width?: string;
  emitEvent: "emitSubmitButton" | "emitResetButton";
}

/**
 * 下拉（select）框组件选项配置
 */
/**
 * 表格查询类型
 * @param label 值对应的文本
 * @param value 选中项绑定值
 */
export interface SearchType {
  value: number | string;
  label: string;
}
export interface SelectCompOptions {
  placeholder: string;
  width?: string;
  selectList?: Array<SearchType>;
}

/**
 * 开关（switch）组件选项配置
 */
type sizeType = "large" | "small" | "default";
export interface SwitchCompOptions {
  switchOnColor?: string;
  switchOffColor?: string;
  size?: sizeType;
}

/**
 * 多选框（checkbox）组件选项配置
 */
interface CheckboxType {
  label: string;
  disabled: boolean;
  value: number | string;
}
export interface CheckboxCompOptions {
  width?: string;
  checkboxArr: Array<CheckboxType>;
}

/**
 * 上传（upload）组件选项配置
 */
export interface UploadCompOptions {
  width?: string;
}

/**
 * 对话框中的form的操作类型
 */
export type dialogHandleType = "add" | "edit" | "" | undefined;
