type ErrorCode = 204 | 400 | 403
export interface ErrorRes {
    state: ErrorCode
    message: string
}
export interface SuccessRes<T> {
    state: number
    data: T
}
export const successRes = <T>(data: T): SuccessRes<T> => ({
    state: 200,
    data: data,
})

export const errorRes: {
    [k in ErrorCode]: ErrorRes
} = {
    204: {
        state: 204,
        message: "No Content",
    },
    400: {
        state: 400,
        message: "Bad Request",
    },
    403: {
        state: 403,
        message: "Forbidden",
    },
} as const
