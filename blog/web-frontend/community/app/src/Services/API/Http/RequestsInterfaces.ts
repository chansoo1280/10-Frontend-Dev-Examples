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
        Partial<T>
}
interface ExtendedNextApiRequestBody<T, U> extends ExtendedNextApiRequest<T> {
    body: Partial<U>
}

type ApiRequest<T, U> = {
    [ReqType.GET]: ExtendedNextApiRequest<T>
    [ReqType.POST]: ExtendedNextApiRequestBody<T, U>
    [ReqType.DELETE]: ExtendedNextApiRequest<T>
}

export type BaseApiInfo = {
    PathName:
        | [string]
        | [
              string,
              {
                  [key: string]: string | number
              },
          ]
    ReqType: ReqType
    ReqPayload: {
        query?: any
        body?: any
    }
    ResPayload: any
}
export type ApiFunction<Key extends ReqType, T extends BaseApiInfo> = (
    req: ApiRequest<T["ReqPayload"]["query"], T["ReqPayload"]["body"]>[Key],
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
