declare namespace Form {
  /**
   * 表格查询条件接口
   * @param label el-form-item label标签文本
   * @param prop model的键名。在定义了 validate、resetFields 的方法时，该属性是必填的。
   * @param model v-model值
   * @param disableEditData 禁止编辑数据
   * @param component 当前Item所需组件
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
  interface FormItemArrTypes {
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
   * @param placeholder 输入框占位文本
   * @param width 组件宽度
   * @param type 输入框类型
   * @param maxlength 最大输入长度
   * @param inputSlot 复合类型插槽
   * @param inputSlotContent 插槽内容
   * @param inputKeyupEnterEvent 键盘回车事件
   * @param size 输入框尺寸，只在 type 不为 'textarea' 时有效
   * @param autosize textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }
   * @param showWordLimit 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效
   */
  type inputType = "text" | "textarea" | "password";
  interface AutoSize {
    minRows: number;
    maxRows: number;
  }
  interface InputCompOptions {
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
   * @param placeholder 输入框占位文本
   * @param width 组件宽度
   * @param type 显示类型
   * @param format  输入框格式
   * @param valueFormat  可选，绑定值的格式。 不指定则绑定值为 Date 对象
   * @param startPlaceholder 范围选择时开始日期的占位内容
   * @param endPlaceholder 范围选择时结束日期的占位内容
   * @param shortcuts 设置快捷选项，需要传入数组对象
   * @param disabledDate 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
   */
  interface DateCompOptions {
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
  interface ButtonCompOptions {
    buttonArr?: Array<ButtonOptions>;
  }
  interface ButtonOptions extends Table.PublicButton {
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
  interface SearchType {
    value: number | string;
    label: string;
  }
  interface SelectCompOptions {
    placeholder: string;
    width?: string;
    selectList?: Array<SearchType>;
  }

  /**
   * 开关（switch）组件选项配置
   */
  type sizeType = "large" | "small" | "default";
  interface SwitchCompOptions {
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
  interface CheckboxCompOptions {
    width?: string;
    checkboxArr: Array<CheckboxType>;
  }

  /**
   * 上传（upload）组件选项配置
   */
  interface UploadCompOptions {
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
  interface CascaderCompOptions {
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
  type DialogHandleType = "add" | "edit" | "" | undefined;
}
