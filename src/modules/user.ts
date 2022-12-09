import { switchMap, iif, throwError, of } from "rxjs";
import type { Observable } from "rxjs";
import Http from "@/http/http";
import { HttpParameter, HttpMethod } from "@/http/httpTypes";

/**
 * 用户登录
 */
export function userLogin(data: any): Observable<any> {
  const params: HttpParameter = {
    data,
    url: "/adm/loginService/login",
    method: HttpMethod.POST,
  };
  return new Http(params).request().pipe();
}
