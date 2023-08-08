declare namespace Table {
  // emit事件名称
  type EmitEventName = "emitEditOperation" | "emitDeleteOperation";

  // emit发送的事件
  interface TableEventEmit {
    emitEventName: EmitEventName;
    emitParams: { index: number; row: any };
  }

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
   * @param summaryMethod 自定义的合计计算方法
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
  interface TableConfig extends PublicTable {}

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
   * table组件配置
   * @param operationButtonArr 操作按钮
   */
  interface tableCompOptions {
    operationButtonArr?: Array<operationButtonArr>;
    columnTypeArr?: Array<an>;
  }
  /**
   * 公共表格组件列（cloumn）接口
   * @param prop 字段名称 对应列内容的字段名
   * @param label 显示的标题
   * @param sortable 对应列是否可以排序
   * @param component 转换所需内容的组件
   * @param compOptions 组件选项配置
   * @param align 对齐方式
   * @param fixed 列是否固定在左侧或者右侧。 true 表示固定在左侧
   * @param children 嵌套表头（多级表头）
   */
  interface TableCloumnArrTypes {
    type?: "selection" | "index" | "expand";
    width?: string;
    prop?: string;
    label?: string;
    sortable?: boolean | string;
    component?:
      | "imageFormat"
      | "typeFormat"
      | "dateFormat"
      | "buttonFormat"
      | "expandComp"
      | "defaultComp";
    compOptions?: tableCompOptions;
    align?: "left" | "center" | "right";
    fixed?: boolean | "left" | "right";
    children?: Array<TableCloumnArrTypes>;
  }
}
