import { BaseApiInfo, ExtendedNextApiRequest, ExtendedNextApiRequestBody, ReqType } from "@Server/request"
import { NextApiResponse, resMessageWithDesc, ResMessageWithDesc, ResStatus } from "@Server/response"

type ApiRequest<T, U> = {
    [ReqType.GET]: ExtendedNextApiRequest<T>
    [ReqType.POST]: ExtendedNextApiRequestBody<T, U>
    [ReqType.DELETE]: ExtendedNextApiRequest<T>
    [ReqType.PATCH]: ExtendedNextApiRequestBody<T, U>
}
export type ApiController<Key extends ReqType, T extends BaseApiInfo> = (
    req: ApiRequest<T["ReqPayload"]["query"] | T["PathName"][1], T["ReqPayload"]["body"]>[Key],
    res: NextApiResponse<T["ResPayload"] | ResMessageWithDesc>,
) => Promise<void>
type APIList = {
    [key in ReqType]?: ApiController<any, any>
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
