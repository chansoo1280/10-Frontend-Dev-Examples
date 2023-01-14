import { ErrorRes, SuccessRes } from "@Server/response"
import { User } from "@Services/User"
import { NextApiRequest, NextApiResponse } from "next"

export enum ReqType {
    "GET" = "GET",
    "POST" = "POST",
    "DELETE" = "DELETE",
}
interface ExtendedNextApiRequest<T> extends NextApiRequest {
    method: ReqType
    query: Partial<{
        [key: string]: string | string[]
    }> &
        T
}
interface ExtendedNextApiRequestBody<T, U> extends ExtendedNextApiRequest<T> {
    body: U
}

type ApiRequest<T, U> = {
    [ReqType.GET]: ExtendedNextApiRequest<T>
    [ReqType.POST]: ExtendedNextApiRequestBody<T, U>
    [ReqType.DELETE]: ExtendedNextApiRequest<T>
}

export type BaseApiInfo = {
    ReqQueryPayload: any
    ReqBodyPayload: any
    ResPayload: any
}
type ApiFunction<Key extends ReqType, T extends BaseApiInfo> = (
    req: ApiRequest<T["ReqQueryPayload"], T["ReqBodyPayload"]>[Key],
    res: NextApiResponse<SuccessRes<T["ResPayload"]> | ErrorRes>,
) => Promise<void>

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
    ResPayload: Pick<User, "id" | "name" | "email">
}
export type APIUserDELETE = {
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: {
        state: number
        message: string
    }
}

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

export type APIUserList = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserListGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APIUserListPOST>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserListDELETE>
}

export type APIUser = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserGET>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserDELETE>
}

export type APILogin = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APILoginGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APILoginPOST>
}

export const makeRouter =
    <APIList>(apiList: any) =>
    async (req: ExtendedNextApiRequest<any & never> & ExtendedNextApiRequestBody<any & never, any & never>, res: NextApiResponse): Promise<void> => {
        const allowedMethodList = Object.keys(apiList)
        if (allowedMethodList.includes(req.method)) {
            await apiList[req.method as keyof APIList](req, res)
            return
        }
        res.status(405).json({ message: `Allowed Method: ${allowedMethodList.join(", ")}` })
    }
