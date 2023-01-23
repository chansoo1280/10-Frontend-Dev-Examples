import { User } from "@Services/User"
import { ApiFunction, ReqType } from "./Http"

export type APIUserListGET = {
    PathName: ["/api/userList"]
    ReqType: ReqType.GET
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: User[]
}
export type APIUserListPOST = {
    PathName: ["/api/userList"]
    ReqType: ReqType.POST
    ReqQueryPayload: never
    ReqBodyPayload: Pick<User, "name" | "email" | "password">
    ResPayload: Pick<User, "id" | "name" | "email">
}
export type APIUserListDELETE = {
    PathName: ["/api/userList"]
    ReqType: ReqType.DELETE
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: User[]
}

export type APIUserGET = {
    PathName: [
        "/api/userList/[id]",
        {
            id: number
        },
    ]
    ReqType: ReqType.GET
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: Pick<User, "id" | "email" | "name">
}

export type APIUserDELETE = {
    PathName: [
        "/api/userList/[id]",
        {
            id: number
        },
    ]
    ReqType: ReqType.DELETE
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
