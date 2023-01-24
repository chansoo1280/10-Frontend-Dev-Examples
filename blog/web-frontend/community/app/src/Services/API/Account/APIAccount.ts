import { ReqType } from "@Server/request"
import { User } from "@Services/User"
import { ApiController } from "../ApiController"

export type APILoginGET = {
    PathName: ["/api/account/login"]
    ReqType: ReqType.GET
    ReqPayload: never
    ResPayload: string
}
export type APILoginPOST = {
    PathName: ["/api/account/login"]
    ReqType: ReqType.POST
    ReqPayload: {
        body: { email: string; password: string }
    }
    ResPayload: Pick<User, "id" | "name" | "email">
}

export type APILogoutGET = {
    PathName: ["/api/account/logout"]
    ReqType: ReqType.GET
    ReqPayload: never
    ResPayload: string
}

export type APIFindPWGET = {
    PathName: ["/api/account/find-pw"]
    ReqType: ReqType.GET
    ReqPayload: {
        query: { email: string }
    }
    ResPayload: string
}

export type APILogin = {
    [ReqType.GET]: ApiController<ReqType.GET, APILoginGET>
    [ReqType.POST]: ApiController<ReqType.POST, APILoginPOST>
}

export type APILogout = {
    [ReqType.GET]: ApiController<ReqType.GET, APILogoutGET>
}

export type APIFindPW = {
    [ReqType.GET]: ApiController<ReqType.GET, APIFindPWGET>
}
