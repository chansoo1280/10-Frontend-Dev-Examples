import { ResMessageWithDesc } from "@Server/response"
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
export type ApiFunction<Key extends ReqType, T extends BaseApiInfo> = (
    req: ApiRequest<T["ReqQueryPayload"], T["ReqBodyPayload"]>[Key],
    res: NextApiResponse<T["ResPayload"] | ResMessageWithDesc>,
) => Promise<void>

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
