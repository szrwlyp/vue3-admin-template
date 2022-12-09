/**
 * 处理URL中的对象并修改当前页面的URL。
 * 案例：
 * 1.处理微信授权登录回调并已使用code后页面URL还存在code。
 */
export function handleURLParams(): void {
  const { protocol, host, pathname, search, hash = "" } = window.location;

  let url = `${protocol}//${host}${pathname}${hash}`;

  // console.log(window.location);

  const urlParams = new URLSearchParams(search);
  urlParams.delete("code");
  urlParams.delete("state");

  const urlToStr = urlParams.toString();

  urlToStr && (url = url + `?${decodeURIComponent(urlToStr)}`);

  history.replaceState(null, "", url);
}

/**
 * 主要内容区域滚动
 */
export function mainScrollTop(): void {
  document.getElementById("main")?.scrollTo(0, 0);
}

/**
 * 深拷贝递归遍历
 */
// 判断是否为数组
const isArr = (origin: any): boolean => {
  const str = "[object Array]";
  return Object.prototype.toString.call(origin) == str ? true : false;
};
export const deepClone = <T>(
  origin: T,
  target?: Record<string, any> | T
): T => {
  const tar = target || {};

  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && origin[key] !== null) {
        tar[key] = isArr(origin[key]) ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar as T;
};

/**
 * 重置对象属性值
 */
export function resetData(obj: any) {
  Object.keys(obj).forEach((key) => {
    switch (typeof obj[key]) {
      case "object":
        obj[key] = isArr(obj[key]) ? [] : {};
        break;
      case "boolean":
        obj[key] = false;
        break;
      case "string":
        obj[key] = "";
        break;
      default:
        obj[key] = "";
    }
  });
  return obj;
}

export function randomRange(min: number, max?: number | undefined): string {
  let returnStr = "";

  const range = max ? Math.round(Math.random() * (max - min)) + min : min,
    arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
  for (let i = 0; i < range; i++) {
    const index = Math.round(Math.random() * (arr.length - 1));
    returnStr += arr[index];
  }
  return returnStr;
}

/**
 * 定义休眠函数
 * @param {number} time 休眠时间，毫秒
 */
export const sleep = (time: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        success: true,
        time: time,
      });
    }, time)
  );
};
