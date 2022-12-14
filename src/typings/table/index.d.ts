declare namespace Table {
  // emit事件名称
  type EmitEventName = "emitEditOperation" | "emitDeleteOperation";

  // emit发送的事件
  interface TableEventEmit {
    emitEventName: EmitEventName;
    emitParams: { index: number; row: any };
  }
}
