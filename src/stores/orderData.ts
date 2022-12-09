import { defineStore } from "pinia";
import { ref } from "vue";
import {
  of,
  groupBy,
  mergeMap,
  reduce,
  map,
  filter,
  toArray,
  tap,
  distinct,
  timer,
  forkJoin,
  concat,
} from "rxjs";

export const useOrderDataStore = defineStore("order_data", () => {
  const set_orderData = ref<Array<any>>([]);
  const originOrderData = ref<Array<any>>([]);

  // 获取订单数据
  function getOrderData() {
    return set_orderData.value;
  }

  // 添加订单数据
  function addOrderData(item: any) {
    if (Array.isArray(item)) {
      set_orderData.value = item;
    } else {
      set_orderData.value.unshift(item);
    }
  }

  // 修改订单数据
  function editOrderData(editData: any) {
    console.warn("修改数据", editData);
    const findIndex = set_orderData.value.findIndex(
      (item) => item.order_id === editData.order_id
    );
    console.log(findIndex + 1);
    set_orderData.value.splice(0, findIndex + 1, editData);
  }

  // 删除订单数据
  function deleteOrderData(item: any) {
    of(...set_orderData.value, ...item)
      .pipe(
        groupBy((p) => p.order_id),
        mergeMap((group$) =>
          group$.pipe(
            reduce((acc: any, cur: any) => [...acc, cur], [])
            // tap((res) => {
            //   console.log(res);
            // })
          )
        ),
        filter((res) => res.length <= 1),
        map((res) => {
          return res[0];
        }),
        toArray()
      )
      .subscribe({
        next: (res) => {
          addOrderData(res);
        },
      });
  }

  function searchOrderData(item: any) {
    // originOrderData.value = set_orderData.value;
    console.log(item);
    const { order_id, order_type, order_date } = item;
    console.log(order_id);
    console.log(order_type);
    console.log(order_date);
    const orderId$ = of(...originOrderData.value).pipe(
      filter((res) => res.order_id === order_id)
    );
    const orderType$ = of(...originOrderData.value).pipe(
      filter((res) => res.order_type === order_type)
    );
    const orderDate$ = of(...originOrderData.value).pipe(
      filter((res) => res.order_date === order_date)
    );
    concat(orderId$, orderType$, orderDate$)
      .pipe(
        distinct((p) => p.order_id),
        // tap((res) => console.log(res)),
        filter(
          (item) => item.order_id === order_id || item.order_type === order_type
        ),
        toArray()
      )
      .subscribe({
        next: (res) => {
          addOrderData(res);
          console.log(res);
        },
      });
  }

  function resetSearchForm() {
    // set_orderData.value = originOrderData.value;
  }

  return {
    set_orderData,
    getOrderData,
    addOrderData,
    editOrderData,
    deleteOrderData,
    searchOrderData,
    resetSearchForm,
  };
});
