// 获取浏览器窗口的可视区域的宽度
export const getViewPortWidth =
  document.documentElement.clientWidth || document.body.clientWidth;

// 获取浏览器窗口的可视区域的高度
export const getViewPortHeight =
  document.documentElement.clientHeight || document.body.clientHeight;

// 获取浏览器窗口水平滚动条的位置
export const getScrollLeft =
  document.documentElement.scrollLeft || document.body.scrollLeft;

// 获取浏览器窗口垂直滚动条的位置
export const getScrollTop =
  document.documentElement.scrollTop || document.body.scrollTop;
