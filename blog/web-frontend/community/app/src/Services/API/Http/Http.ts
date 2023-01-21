// #region Global Imports
import { getStoredAccessToken } from "@Hooks/useUser"
import { ResMessageWithDesc } from "@Server/response"
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { BaseApiInfo, ReqType } from "./RequestsInterfaces"
// #endregion Interface Imports

const BaseUrl = `http://localhost:3000`
// const BaseUrl = `/`

export const Http = async <T extends BaseApiInfo>(methodType: T["ReqType"], url: string, params?: T["ReqQueryPayload"], payload?: T["ReqBodyPayload"]): Promise<T["ResPayload"] | null> => {
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

    return fetch(`${BaseUrl}${url}${query}`, {
        body: methodType === "GET" ? undefined : JSON.stringify(payload || "") || null,
        method: `${methodType}`,
        ...defaultOptions,
    })
        .then(async (response) => {
            if (response.status === 200) {
                const result: T["ResPayload"] = await response.json()
                return result
            }
            throw response
        })
        .catch(async (response) => {
            if (response.status === 500) {
                console.log("error " + response)
                throw null
            } else {
                const result: ResMessageWithDesc = await response.json()
                throw Promise.resolve(result)
            }
        })
}
