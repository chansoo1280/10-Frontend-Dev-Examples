import { useAccessToken, clearStoredAccessToken, getStoredSessionId } from "@Hooks/useAccessToken"
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http, APIUserGET } from "@Services"
import { User } from "@Services/User"
import { useState, useEffect } from "react"
import { useQueryClient, UseQueryResult, useQuery } from "react-query"

type StoredUserInfo = Pick<User, "id" | "email" | "name"> & { sessionId: string | null; keepLogin: boolean }
export const getUser = async (user: StoredUserInfo | null | undefined) => {
    if (user === null || user === undefined) {
        return null
    }
    const sessionId = getStoredSessionId()
    const result = await Http<APIUserGET>(ReqType.GET, ["/api/userList/[id]", { id: user.id }], {}).catch((e: ResMessageWithDesc) => {
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
    return result && { ...result, sessionId, keepLogin: user.keepLogin }
}

export const useUser = () => {
    const queryclient = useQueryClient()
    const [user, setUser] = useState<StoredUserInfo | null>(null)
    const queryResult: UseQueryResult<StoredUserInfo | null> = useQuery("user", () => getUser(queryResult.data), {
        initialData: getStoredUserInfo,
        staleTime: 2 * 60 * 60 * 1000,
        onSuccess: (received: StoredUserInfo | null) => {
            // 쿼리함수나 setQueryData에서 데이터를 가져오는 함수
            if (!received) {
                // falsy의 값을 받을 경우
                clearStoredUserInfo()
                clearStoredAccessToken()
            } else {
                // truthy의 값을 받을 경우
                setStoredUserInfo(received)
            }
        },
    })
    useEffect(() => {
        setUser(queryResult.data || null)
    }, [queryResult.data])

    const updateUser = (newUser: StoredUserInfo): void => {
        queryclient.setQueryData("user", newUser)
        setStoredUserInfo(newUser)
    }

    const clearUser = () => {
        queryclient.setQueryData("user", null)
        clearStoredUserInfo()
    }

    return { user, updateUser, clearUser }
}
export const getStoredUserInfo = (): StoredUserInfo | null => {
    if (typeof window === "undefined") {
        return null
    }
    const storedUser = localStorage.getItem("USER_LOCALSTORAGE_KEY")
    const info: StoredUserInfo | null = storedUser && JSON.parse(storedUser)
    const sessionId = getStoredSessionId()
    if (info && info.keepLogin === false && sessionId !== info.sessionId) {
        return null
    }
    return storedUser ? info : null
}
export const setStoredUserInfo = (user: StoredUserInfo): void => {
    localStorage.setItem("USER_LOCALSTORAGE_KEY", JSON.stringify(user))
}
export const clearStoredUserInfo = (): void => {
    localStorage.removeItem("USER_LOCALSTORAGE_KEY")
}
