import { useUser } from "@Hooks/useUser"
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http, APILoginGET } from "@Services"
import { decrypt, encrypt } from "@Utils"
import { useState } from "react"
import { useQueryClient, useQuery } from "react-query"

type AccessToken = string
export const getAccessToken = async () =>
    await Http<APILoginGET>(ReqType.GET, ["/api/account/login"], {}).catch((e: ResMessageWithDesc) => {
        switch (e.status) {
            case ResStatus.NoContent:
                console.log(e.description)
                return null
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
export const useAccessToken = () => {
    const queryclient = useQueryClient()
    const [refreshStop, setRefreshStop] = useState(false)
    const { data, refetch } = useQuery("accessToken", () => getAccessToken(), {
        initialData: getStoredAccessToken,
        staleTime: 2 * 60 * 60 * 1000,
        refetchInterval: refreshStop ? false : 2 * 60 * 60 * 1000, // 2시간
        refetchIntervalInBackground: true,
        onSuccess: (received: AccessToken | null) => {
            // 쿼리함수나 setQueryData에서 데이터를 가져오는 함수
            if (!received) {
                // falsy의 값을 받을 경우
                clearStoredAccessToken()
            } else {
                // truthy의 값을 받을 경우
                setStoredAccessToken(received)
            }
        },
    })

    const updateAccessToken = (newAccessToken: AccessToken): void => {
        setStoredAccessToken(newAccessToken)
        queryclient.setQueryData("accessToken", newAccessToken)
    }

    const clearAccessToken = () => {
        clearStoredAccessToken()
        queryclient.setQueryData("accessToken", null)
    }

    return { accessToken: data, updateAccessToken, clearAccessToken, refetchAccessToken: refetch }
}

export const getStoredAccessToken = (): string | null => {
    if (typeof window === "undefined") {
        return null
    }
    const storedAccessToken = localStorage.getItem("ACCESSTOKEN_LOCALSTORAGE_KEY")
    const decryptedToken = decrypt(storedAccessToken || "")
    return decryptedToken ? decryptedToken : null
}
export const setStoredAccessToken = (accessToken: string): void => {
    const encryptedToken = encrypt(accessToken)
    localStorage.setItem("ACCESSTOKEN_LOCALSTORAGE_KEY", encryptedToken)
}
export const clearStoredAccessToken = (): void => {
    localStorage.removeItem("ACCESSTOKEN_LOCALSTORAGE_KEY")
}

export const getStoredSessionId = (): string | null => {
    if (typeof window === "undefined") {
        return null
    }
    const storedSessionId = sessionStorage.getItem("SESSIONID_SESSIONSTORAGE_KEY")
    const decryptedId = decrypt(storedSessionId || "")
    return decryptedId ? decryptedId : null
}
export const setStoredSessionId = (sessionId: string): void => {
    const encryptedId = encrypt(sessionId)
    sessionStorage.setItem("SESSIONID_SESSIONSTORAGE_KEY", encryptedId)
}
export const clearStoredSessionId = (): void => {
    sessionStorage.removeItem("SESSIONID_SESSIONSTORAGE_KEY")
}
