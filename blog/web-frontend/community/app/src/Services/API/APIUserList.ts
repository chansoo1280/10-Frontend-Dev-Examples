import { User } from "@Services/User"
import { ApiFunction, ReqType } from "./Http"

export type APIUserListGET = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: User[]
}
export type APIUserListPOST = {
    ReqQueryPayload: never
    ReqBodyPayload: Pick<User, "name" | "email" | "password">
    ResPayload: User["id"]
}
export type APIUserListDELETE = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: User[]
}

export type APIUserGET = {
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: Pick<User, "id" | "email" | "name">
}

export type APIUserDELETE = {
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: never
}

export type APIUserList = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserListGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APIUserListPOST>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserListDELETE>
}

export type APIUser = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserGET>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserDELETE>
}
