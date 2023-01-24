import { NextApiRequest } from "next"

export enum ReqType {
    "GET" = "GET",
    "POST" = "POST",
    "DELETE" = "DELETE",
    "PATCH" = "PATCH",
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
    ReqPayload:
        | {
              query?: any
              body?: any
          }
        | never
    ResPayload: any
}
export interface ExtendedNextApiRequest<T> extends NextApiRequest {
    method: ReqType
    query: Partial<{
        [key: string]: string | string[]
    }> &
        Partial<T>
}
export interface ExtendedNextApiRequestBody<T, U> extends ExtendedNextApiRequest<T> {
    body: Partial<U>
}
