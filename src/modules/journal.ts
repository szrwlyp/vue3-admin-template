import { switchMap, iif, throwError, of } from "rxjs";
import type { Observable } from "rxjs";
import Http from "@/http/http";
import { HttpParameter, HttpMethod } from "@/http/httpTypes";

/**
 * 获取日志数据
 */
//  https://www.vpascare.com/adm/dataStatsService/getWxAccessLogs
export function getJournalData(data: any): Observable<any> {
  const params: HttpParameter = {
    data,
    url: "/adm/dataStatsService/getWxAccessLogs",
    method: HttpMethod.POST,
  };
  return new Http(params).request();
}
