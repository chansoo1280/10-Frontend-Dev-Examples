import { User } from "@Services/User"

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
