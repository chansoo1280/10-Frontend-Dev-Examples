import { ReqType } from "@Server/request"
import { ApiController } from "@Services"
import { User } from "@Services/User"

export type APIUserListGET = {
    PathName: ["/api/userList"]
    ReqType: ReqType.GET
    ReqPayload: never
    ResPayload: User[]
}
export type APIUserListPOST = {
    PathName: ["/api/userList"]
    ReqType: ReqType.POST
    ReqPayload: {
        body: Pick<User, "name" | "email" | "password">
    }
    ResPayload: Pick<User, "id" | "name" | "email">
}
export type APIUserListDELETE = {
    PathName: ["/api/userList"]
    ReqType: ReqType.DELETE
    ReqPayload: never
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
    ReqPayload: never
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
    ReqPayload: never
    ResPayload: null
}

export type APIUserList = {
    [ReqType.GET]: ApiController<ReqType.GET, APIUserListGET>
    [ReqType.POST]: ApiController<ReqType.POST, APIUserListPOST>
    [ReqType.DELETE]: ApiController<ReqType.DELETE, APIUserListDELETE>
}

export type APIUser = {
    [ReqType.GET]: ApiController<ReqType.GET, APIUserGET>
    [ReqType.DELETE]: ApiController<ReqType.DELETE, APIUserDELETE>
}
