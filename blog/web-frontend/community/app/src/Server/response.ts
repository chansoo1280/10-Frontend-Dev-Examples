import { NextApiResponse } from "next"
export type { NextApiResponse }
export enum ResStatus {
    Success = 200,
    NoContent = 204,
    BadRequest = 400,
    Forbidden = 403,
    MethodNotAllowed = 405,
}
export const ResMessage = {
    [ResStatus.Success]: "Success",
    [ResStatus.NoContent]: "No Content",
    [ResStatus.BadRequest]: "Bad Request",
    [ResStatus.Forbidden]: "Forbidden",
    [ResStatus.MethodNotAllowed]: "Method Not Allowed",
} as const
export type ResMessage = typeof ResMessage[keyof typeof ResMessage]

export type ResMessageWithDesc = {
    status: ResStatus
    message: ResMessage
    description: string
}

export const resMessageWithDesc = <T extends NextApiResponse>(res: T, status: ResStatus, description: string) => {
    const resPayload: ResMessageWithDesc = {
        status: status,
        message: ResMessage[status],
        description: description,
    }
    res.status(status).json(resPayload)
    return
}
export const resMessage = <T extends NextApiResponse>(res: T, status: ResStatus) => resMessageWithDesc<T>(res, status, ResMessage[status])
