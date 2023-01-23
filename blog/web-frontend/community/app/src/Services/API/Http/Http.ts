// #region Global Imports
import { getStoredAccessToken } from "@Hooks/useAccessToken"
import { ResMessageWithDesc } from "@Server/response"
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { BaseApiInfo, ReqType } from "./RequestsInterfaces"
// #endregion Interface Imports

const BaseUrl = `http://localhost:3000`
// const BaseUrl = `/`

export const Http = async <T extends BaseApiInfo>(methodType: T["ReqType"], url: T["PathName"], params?: T["ReqQueryPayload"], payload?: T["ReqBodyPayload"]): Promise<T["ResPayload"] | null> => {
    const accessToken = getStoredAccessToken()

    const defaultOptions = {
        // cache: "no-cache",
        headers: {
            "content-type": "application/json",
            SECRET: "secret_test",
            Authorization: `Bearer ${accessToken}`,
        },
    }
    console.log(defaultOptions)
    const query = params
        ? `?${queryString.stringify({
              ...params,
              api_key: process.env.NEXT_PUBLIC_API_KEY,
          })}`
        : ""
    const pathName = url[0]
    const pathObj = url[1] || {}

    const mappedUrl = Object.keys(pathObj).reduce((path: string, key: string) => {
        return path.replace(`[${key}]`, String(pathObj[key]))
    }, pathName)
    return fetch(`${BaseUrl}${mappedUrl}${query}`, {
        body: methodType === "GET" ? undefined : JSON.stringify(payload || "") || null,
        method: `${methodType}`,
        ...defaultOptions,
    }).then(async (response) => {
        console.log(response)
        if (response.status === 200) {
            const result: T["ResPayload"] = await response.json()
            return result
        }
        if (response.status === 500) {
            return null
        }
        throw await response.json()
    })
}
