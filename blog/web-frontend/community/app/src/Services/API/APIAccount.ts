import { User } from "@Services/User"
import { ApiFunction, ReqType } from "./Http"

export type APILoginGET = {
    ReqType: ReqType.GET
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: string
}
export type APILoginPOST = {
    ReqType: ReqType.POST
    ReqQueryPayload: never
    ReqBodyPayload: { email: string; password: string }
    ResPayload: Pick<User, "id" | "name" | "email">
}

export type APILogoutGET = {
    ReqType: ReqType.GET
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: string
}

export type APIFindPWGET = {
    ReqType: ReqType.GET
    ReqQueryPayload: { email: string }
    ReqBodyPayload: never
    ResPayload: string
}

export type APILogin = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APILoginGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APILoginPOST>
}

export type APILogout = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APILogoutGET>
}

export type APIFindPW = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIFindPWGET>
}
