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
        body: Pick<User, "email" | "password"> & { keepLogin: boolean }
    }
    ResPayload: Pick<User, "id" | "name" | "email"> & { sessionId: string | null }
}

export type APILogoutGET = {
    PathName: ["/api/account/logout"]
    ReqType: ReqType.GET
    ReqPayload: never
    ResPayload: string
}

export type APIFindPwGET = {
    PathName: ["/api/account/find-pw"]
    ReqType: ReqType.GET
    ReqPayload: {
        query: { email: string }
    }
    ResPayload: string
}

export type APIResetPwPATCH = {
    PathName: ["/api/account/reset-pw"]
    ReqType: ReqType.PATCH
    ReqPayload: {
        body: { password: string; email: string; token: string }
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

export type APIFindPw = {
    [ReqType.GET]: ApiController<ReqType.GET, APIFindPwGET>
}

export type APIResetPw = {
    [ReqType.PATCH]: ApiController<ReqType.PATCH, APIResetPwPATCH>
}
