import type { Observable } from "rxjs";
import Http from "@/http/http";
import { HttpParameter, HttpMethod } from "@/http/httpTypes";

/**
 * 获取表格数据
 */
//  https://www.vpascare.com/adm/dataStatsService/getWxAccessLogs
export function getTableRequest(data: any): Observable<any> {
  const params: HttpParameter = { ...data, method: HttpMethod.POST };
  return new Http(params).request();
}

/**
 * 添加数据
 */
export function addActive(data: any): Observable<any> {
  const params: HttpParameter = {
    ...data,
    method: HttpMethod.POST,
  };
  return new Http(params).request();
}

export function getEchartData(data: any): Observable<any> {
  const params: HttpParameter = {
    ...data,
    method: HttpMethod.GET,
    url: "/api/v1/user/getTodayEcharts",
  };
  return new Http(params).request();
}
