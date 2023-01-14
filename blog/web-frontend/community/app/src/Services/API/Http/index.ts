// #region Global Imports
import { ErrorRes, SuccessRes } from "@Server/response"
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { BaseApiInfo, ReqType } from "./RequestsInterfaces"
// #endregion Interface Imports

const BaseUrl = `http://localhost:3000`
// const BaseUrl = `/`
const defaultOptions = {
    // cache: "no-cache",
    headers: {
        "content-type": "application/json",
        SECRET: "secret",
    },
}
export const Http = async <T extends BaseApiInfo>(methodType: ReqType, url: string, params?: T["ReqQueryPayload"], payload?: T["ReqBodyPayload"]): Promise<SuccessRes<T["ResPayload"]> | null> => {
    const query = params
        ? `?${queryString.stringify({
              ...params,
              api_key: process.env.NEXT_PUBLIC_API_KEY,
          })}`
        : ""

    return fetch(
        `${BaseUrl}${url}${query}`,
        methodType === "GET"
            ? {
                  method: `${methodType}`,
                  ...defaultOptions,
              }
            : {
                  body: JSON.stringify(payload || "") || null,
                  method: `${methodType}`,
                  ...defaultOptions,
              },
    ).then(async (response) => {
        if (response.status === 200) {
            const result: SuccessRes<T["ResPayload"]> | ErrorRes = await response.json()
            if (result.state !== 200) {
                return Promise.reject(result)
            }
            return result
        } else {
            console.log("error " + response)
            return null
        }
    })
}
export * from "./RequestsInterfaces"
