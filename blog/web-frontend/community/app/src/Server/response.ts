export interface ErrorRes {
    state: number
    message: string
}

export const errorRes: ErrorRes = {
    state: 403,
    message: "error",
}
