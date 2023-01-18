import { User } from "@Services/User"

export type APILoginGET = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: string
}
export type APILoginPOST = {
    ReqQueryPayload: never
    ReqBodyPayload: { email: string; password: string }
    ResPayload: Pick<User, "id" | "name" | "email">
}

export type APILogoutGET = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: string
}

export type APIFindPWGET = {
    ReqQueryPayload: { email: string }
    ReqBodyPayload: never
    ResPayload: string
}
