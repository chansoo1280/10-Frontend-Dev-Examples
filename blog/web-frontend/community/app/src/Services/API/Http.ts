// #region Global Imports
import { getStoredAccessToken, getStoredSessionId } from "@Hooks/useAccessToken"
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { BaseApiInfo } from "@Server/request"
import { ResMessage, ResMessageWithDesc, ResStatus } from "@Server/response"
import { isArray } from "@Utils"
// #endregion Interface Imports

const BaseUrl = `http://localhost:3000`
// const BaseUrl = `/`

export const Http = async <T extends BaseApiInfo>(
    methodType: T["ReqType"],
    url: T["PathName"],
    { query, body }: { query?: T["ReqPayload"]["query"]; body?: T["ReqPayload"]["body"] },
): Promise<T["ResPayload"] | null> => {
    const accessToken = getStoredAccessToken()
    const sessionId = getStoredSessionId()

    const defaultOptions = {
        // cache: "no-cache",
        headers: {
            "content-type": "application/json",
            secret: "secret_test",
            authorization: `Bearer ${accessToken}`,
            sessionid: sessionId || "",
        },
    }
    // console.log(defaultOptions)

    const queryStr = query
        ? `?${queryString.stringify({
              ...query,
          })}`
        : ""

    const pathName = url[0]
    const pathObj = url[1] || {}

    const mappedUrl = Object.keys(pathObj).reduce((path: string, key: string) => {
        return path.replace(`[${key}]`, String(pathObj[key]))
    }, pathName)
    return fetch(`${BaseUrl}${mappedUrl}${queryStr}`, {
        body: methodType === "GET" ? undefined : JSON.stringify(body || "") || null,
        method: `${methodType}`,
        ...defaultOptions,
    }).then(async (response) => {
        // console.log(response)
        if (response.status === 200) {
            const result: T["ResPayload"] = await response.json()
            return result
        }
        if (response.status === 204) {
            // 1xx, 204, 304는 응답 body가 없음
            const result: ResMessageWithDesc = {
                status: 204,
                message: ResMessage[ResStatus.NoContent],
                description: ResMessage[ResStatus.NoContent],
            }
            throw result
        }
        if (response.status === 500) {
            return null
        }
        const content = await response.text()
        const result: ResMessageWithDesc = content.length > 0 ? JSON.parse(content) : {}
        throw result
    })
}
