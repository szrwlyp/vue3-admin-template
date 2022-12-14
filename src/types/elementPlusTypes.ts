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
 * 表格（table）公共配置
 * @param stripe 是否为斑马纹 table
 * @param border 是否带有纵向边框
 * @param size Table 的尺寸
 * @param highlightCurrentRow 是否要高亮当前行
 * @param showHeader 是否显示表头
 * @param currentRowKey 当前行的 key，只写属性
 * @param emptyText 空数据时显示的文本内容， 也可以通过 #empty 设置
 * @param defaultExpandAll 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
 * @param rowKey 行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。
 * @param expandRowKeys 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
 * @param defaultSort 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序
 * @param tooltipEffect tooltip effect 属性
 * @param showSummary 是否在表尾显示合计行
 * @param sumText 合计行第一列的文本
 * @param summaryMethod 合并行或列的计算方法
 * @param lazy 是否懒加载子节点数据
 * @param headerRowStyle 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
 * @param headerCellStyle 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
 * @param tableLayout 设置表格单元、行和列的布局方式
 * @param rowClassName 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
 * @param headerRowClassName 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
 */
interface PublicTable {
  stripe?: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  highlightCurrentRow?: boolean;
  currentRowKey?: string | number;
  emptyText?: string;
  defaultExpandAll?: boolean;
  tableLayout?: "fixed" | "auto";
  expandRowKeys?: Array<any>;
  defaultSort?: { order: "ascending" | "descending" };
  tooltipEffect?: "dark" | "light";
  showSummary?: boolean;
  sumText?: string;
  lazy?: boolean;
  rowKey?: Function | string;
  summaryMethod?: Function;
  rowClassName?: Function | string;
  headerRowClassName?: Function | string;
  headerRowStyle?: Function | Object;
  headerCellStyle?: Function | Object;
}

/**
 * 公共表格组件（table）接口
 */
export interface TableConfig extends PublicTable {}

/**
 * 公共表格组件列（cloumn）接口
 * @param prop 字段名称 对应列内容的字段名
 * @param label 显示的标题
 * @param isChange 是否需要将数据转换成所需的内容
 * @param component 转换所需内容的组件
 * @param compOptions 组件选项配置
 * @param align 对齐方式
 * @param fixed 列是否固定在左侧或者右侧。 true 表示固定在左侧
 * @param children 嵌套表头（多级表头）
 * @param
 * @param
 * @param
 * @param
 * @param
 * @param
 * @param
 */
export interface TableCloumnArrTypes {
  type?: string;
  width?: string;
  prop?: string;
  label?: string;
  isChange?: boolean;
  sortable?: boolean | string;
  component?: "imageFormat" | "typeFormat" | "dateFormat" | "buttonFormat";
  compOptions?: tableCompOptions;
  align?: "left" | "center" | "right";
  fixed?: boolean | "left" | "right";
  children?: Array<TableCloumnArrTypes>;
}
/**
 * table组件配置
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
  | "upload"
  | "cascader";
export interface FormItemArrTypes {
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
  cascaderCompOptions?: CascaderCompOptions;
}

/**
 * 输入框（input）组件选项配置
 * @param type 输入框类型
 * @param maxlength 最大输入长度
 * @param inputSlot 复合类型插槽
 * @param inputSlotContent 插槽内容
 * @param inputKeyupEnterEvent 键盘回车事件
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
  inputKeyupEnterEvent?: "emitSubmitButton";
  size?: string;
  autosize?: boolean | AutoSize;
  showWordLimit?: boolean;
  // inputKeyupEnterEvent
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
 * 级联（cascader）组件选项配置
 * @param options 可选项数据源，键名可通过 Props 属性配置
 * @param placeholder 输入框占位文本
 * @param width 宽度
 * @param cascaderProps 配置选项
 * @param clearable 是否支持清空选项
 * @param showAllLevels 输入框中是否显示选中值的完整路径
 * @param filterable 该选项是否可以被搜索
 */
export interface CascaderCompOptions {
  options: Array<optionsType>;
  placeholder?: string;
  width: string;
  cascaderProps: PropsType;
  clearable?: boolean;
  showAllLevels?: boolean;
  filterable?: boolean;
  size?: "large" | "small" | "default";
  emitChangeEvent?: "emitChange";
  emitExpandChangeEvent?: "emitExpandChange";
}

interface optionsType {
  value: string;
  label: string;
  children: Array<any>;
}
/**
 * 级联（cascader）props配置
 * @param expandTrigger 次级菜单的展开方式
 * @param checkStrictly 是否严格的遵守父子节点不互相关联
 * @param emitPath 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
 * @param multiple 是否多选
 * @param lazy 是否动态加载子节点，需与 lazyLoad 方法结合使用
 * @param value 指定选项的值为选项对象的某个属性值
 * @param label 指定选项标签为选项对象的某个属性值
 * @param children 指定选项的子选项为选项对象的某个属性值
 * @param disabled 指定选项的禁用为选项对象的某个属性值
 */
interface PropsType {
  expandTrigger?: "click" | "hover";
  checkStrictly?: boolean;
  emitPath?: boolean;
  multiple?: boolean;
  lazy?: boolean;
  value?: string;
  label?: string;
  children?: string;
  disabled?: string;
}

/**
 * 对话框中的form的操作类型
 */
export type DialogHandleType = "add" | "edit" | "" | undefined;
