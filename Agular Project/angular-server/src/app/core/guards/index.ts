import {AuthGuard} from "./auth/auth.guard";
import {BackAuthGuard} from "./back-auth/back-auth.guard";
/**
 * Created by sve on 8.12.2017 г..
 */
export const allGuards= [
  AuthGuard,
  BackAuthGuard
]
