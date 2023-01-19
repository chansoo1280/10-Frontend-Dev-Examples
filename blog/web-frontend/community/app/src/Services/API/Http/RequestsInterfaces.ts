import { ResMessageWithDesc } from "@Server/response"
import { NextApiRequest, NextApiResponse } from "next"
import { APILoginGET, APILoginPOST, APILogoutGET, APIFindPWGET } from "./APIAccount"
import { APIQuestionListGET, APIQuestionListPOST, APIQuestionListDELETE, APIQuestionGET, APIQuestionDELETE } from "./APIQuestionList"
import { APIUserDELETE, APIUserGET, APIUserListDELETE, APIUserListGET, APIUserListPOST } from "./APIUserList"

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
    res: NextApiResponse<T["ResPayload"] | ResMessageWithDesc>,
) => Promise<void>

export type APIUserList = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserListGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APIUserListPOST>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserListDELETE>
}

export type APIUser = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIUserGET>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIUserDELETE>
}

export type APIQuestionList = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIQuestionListGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APIQuestionListPOST>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIQuestionListDELETE>
}

export type APIQuestion = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIQuestionGET>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIQuestionDELETE>
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
