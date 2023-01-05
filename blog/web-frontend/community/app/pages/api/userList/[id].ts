import { ErrorRes, errorRes } from "@Server/response"
import { findUserByEmail, User } from "@Services/User"
import type { NextApiRequest, NextApiResponse } from "next"

interface ExtendedNextApiRequest<T> extends NextApiRequest {
    body: T
}
export default async function getUser(
    req: ExtendedNextApiRequest<{
        email: string
    }>,
    res: NextApiResponse<User | ErrorRes>,
) {
    if (req.method === "POST") {
        try {
            const result = await findUserByEmail(req.body.email)
            if (result === null) {
                res.status(403).json(errorRes)
            } else {
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(403).json(errorRes)
        }
    }
}
