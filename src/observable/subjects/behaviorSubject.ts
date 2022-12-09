import { BehaviorSubject } from "rxjs";

/**
 * 监听用户登录后的sessionId
 */
interface sessionIdSubject$Type {
  implement: boolean;
  session_id?: string;
}
export const sessionIdSubject$ = new BehaviorSubject<sessionIdSubject$Type>({
  implement: false,
  session_id: "",
});
