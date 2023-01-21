import { resMessageWithDesc, ResMessageWithDesc, ResStatus } from "@Server/response"
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
    ReqType: ReqType
    ReqQueryPayload: any
    ReqBodyPayload: any
    ResPayload: any
}
export type ApiFunction<Key extends ReqType, T extends BaseApiInfo> = (
    req: ApiRequest<T["ReqQueryPayload"], T["ReqBodyPayload"]>[Key],
    res: NextApiResponse<T["ResPayload"] | ResMessageWithDesc>,
) => Promise<void>
type APIList = {
    [key in ReqType]?: ApiFunction<any, any>
}
export const makeRouter =
    <T extends APIList>(apiList: T) =>
    async (req: ExtendedNextApiRequest<any> | ExtendedNextApiRequestBody<any, any>, res: NextApiResponse): Promise<void> => {
        const allowedMethodList = Object.keys(apiList)
        if (req.method && allowedMethodList.includes(req.method)) {
            await apiList[req.method]?.(req, res)
            return
        }
        resMessageWithDesc(res, ResStatus.MethodNotAllowed, `Allowed Method: ${allowedMethodList.join(", ")}`)
    }
