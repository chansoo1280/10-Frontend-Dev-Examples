// #region Global Imports
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { HttpModel } from "./Http.d"
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
export const Http = {
    Request: async <T>(methodType: HttpModel.IRequestMethodType, url: string, params?: HttpModel.IRequestQueryPayload | null, payload?: HttpModel.IRequestPayload): Promise<T> => {
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
            return response.json()
        })
    },
}
