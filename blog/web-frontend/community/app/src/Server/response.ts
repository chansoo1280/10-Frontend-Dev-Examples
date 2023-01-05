export interface ErrorRes {
    state: number
    message: string
}

export const errorRes: {
    [k: number]: ErrorRes
} = {
    403: {
        state: 403,
        message: "Forbidden",
    },
    400: {
        state: 400,
        message: "Bad Request",
    },
} as const
