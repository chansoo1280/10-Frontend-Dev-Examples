// #region Global Imports
import "isomorphic-unfetch"
import queryString from "query-string"
// #endregion Global Imports

// #region Interface Imports
import { HttpModel } from "./Http.d"
// #endregion Interface Imports

// const BaseUrl = `http://localhost:10001`
const BaseUrl = `/`
export const Http = {
    Request: async (methodType: HttpModel.IRequestMethodType, url: string, params?: HttpModel.IRequestQueryPayload, payload?: HttpModel.IRequestPayload): Promise<unknown> =>
        new Promise((resolve, reject) => {
            const query = params
                ? `?${queryString.stringify({
                      ...params,
                      api_key: process.env.NEXT_PUBLIC_API_KEY,
                  })}`
                : ""

            fetch(`${BaseUrl}${url}${query}`, {
                body: JSON.stringify(payload),
                // cache: "no-cache",
                headers: {
                    "content-type": "application/json",
                    SECRET: "secret",
                },
                method: `${methodType}`,
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json().then((res) => {
                            console.log(res)
                            resolve(res)
                        })
                    }
                    return reject(response)
                })
                .catch((e) => reject(e))
        }),
}
