import { clearStoredAccessToken, useAccessToken } from "@Hooks/useAccessToken"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http, ReqType, APIUserGET } from "@Services"
import { User } from "@Services/User"
import { useEffect, useState } from "react"
import { useQueryClient, useQuery, UseQueryResult } from "react-query"
type StoredUser = Pick<User, "id" | "email" | "name">
export const getUser = async (user: StoredUser | null | undefined) => {
    if (user === null || user === undefined) {
        return null
    }
    return await Http<APIUserGET>(ReqType.GET, ["/api/userList/[id]", { id: user.id }], undefined, undefined).catch((e: ResMessageWithDesc) => {
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
}

export const useUser = () => {
    const queryclient = useQueryClient()
    const [user, setUser] = useState<StoredUser | null>(null)
    const { refetchAccessToken } = useAccessToken()
    const queryResult: UseQueryResult<StoredUser | null> = useQuery("user", () => getUser(queryResult.data), {
        initialData: getStoredUser,
        staleTime: 2 * 60 * 60 * 1000,
        onSuccess: (received: StoredUser | null) => {
            // 쿼리함수나 setQueryData에서 데이터를 가져오는 함수
            if (!received) {
                // falsy의 값을 받을 경우
                clearStoredUser()
                clearStoredAccessToken()
            } else {
                // truthy의 값을 받을 경우
                setStoredUser(received)
            }
        },
    })
    useEffect(() => {
        setUser(queryResult.data || null)
    }, [queryResult.data])

    const updateUser = (newUser: Pick<User, "id" | "email" | "name">): void => {
        queryclient.setQueryData("user", newUser)
        setStoredUser(newUser)
        refetchAccessToken()
    }

    const clearUser = () => {
        queryclient.setQueryData("user", null)
        clearStoredUser()
        clearStoredAccessToken()
    }

    return { user, updateUser, clearUser }
}
export const getStoredUser = (): StoredUser | null => {
    if (typeof window === "undefined") {
        return null
    }
    const storedUser = localStorage.getItem("USER_LOCALSTORAGE_KEY")
    return storedUser ? JSON.parse(storedUser) : null
}
export const setStoredUser = (user: StoredUser): void => {
    localStorage.setItem("USER_LOCALSTORAGE_KEY", JSON.stringify(user))
}
export const clearStoredUser = (): void => {
    localStorage.removeItem("USER_LOCALSTORAGE_KEY")
}
