import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http, APILoginGET, ReqType } from "@Services"
import { User } from "@Services/User"
import { useQueryClient, useQuery } from "react-query"
export const getUser = async () => {
    const user = getStoredUser()
    if (user === null) {
        return null
    }
    return await Http<APILoginGET>(ReqType.GET, "/api/userList/" + user.id, undefined, undefined).catch((e: ResMessageWithDesc) => {
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

export const getAccessToken = async () =>
    await Http<APILoginGET>(ReqType.GET, "/api/account/login").catch((e: ResMessageWithDesc) => {
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
export const useUser = () => {
    const queryclient = useQueryClient()
    const { data } = useQuery("user", () => getUser(), {
        onSuccess: (received: Pick<User, "id" | "email" | "name"> | null) => {
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

    const updateUser = (newUser: Pick<User, "id" | "email" | "name">, accessToken: string): void => {
        setStoredAccessToken(accessToken)
        queryclient.setQueryData("user", newUser)
    }

    const clearUser = () => {
        clearStoredAccessToken()
        queryclient.setQueryData("user", null)
    }

    return { user: data, updateUser, clearUser }
}
export function getStoredUser(): Pick<User, "id" | "email" | "name"> | null {
    const storedUser = localStorage.getItem("USER_LOCALSTORAGE_KEY")
    return storedUser ? JSON.parse(storedUser) : null
}
export function setStoredUser(user: Pick<User, "id" | "email" | "name">): void {
    localStorage.setItem("USER_LOCALSTORAGE_KEY", JSON.stringify(user))
}
export function clearStoredUser(): void {
    localStorage.removeItem("USER_LOCALSTORAGE_KEY")
}

export function getStoredAccessToken(): string | null {
    const storedAccessToken = localStorage.getItem("ACCESSTOKEN_LOCALSTORAGE_KEY")
    return storedAccessToken ? JSON.parse(storedAccessToken) : null
}
export function setStoredAccessToken(accessToken: string): void {
    localStorage.setItem("ACCESSTOKEN_LOCALSTORAGE_KEY", JSON.stringify(accessToken))
}
export function clearStoredAccessToken(): void {
    localStorage.removeItem("ACCESSTOKEN_LOCALSTORAGE_KEY")
}
