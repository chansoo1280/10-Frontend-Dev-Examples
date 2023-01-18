import { errorRes, successRes } from "@Server/response"
import { APIUser, makeRouter, ReqType } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { APIUserGET } from "@Services/API/Http/APIUserList"
import { findUserById, deleteUserById, User } from "@Services/User"
const apiUser: APIUser = {
    [ReqType.GET]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            res.status(400).json(errorRes[400])
            return
        }
        if (req.headers.authorization === undefined) {
            res.status(403).json(errorRes[403])
            return
        }
        // Authorization: `Bearer ${user.token}`
        const user = verifyAccessToken(req.headers.authorization)
        if (user === null || user.id !== id) {
            res.status(403).json(errorRes[403])
            return
        }

        const result = await findUserById(id)
        if (result !== null) {
            res.status(200).json(
                successRes({
                    id: result.id,
                    email: result.email,
                    name: result.name,
                }),
            )
            return
        }
        res.status(200).json(errorRes[204])
    },
    [ReqType.DELETE]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            res.status(400).json(errorRes[400])
            return
        }
        const result = await deleteUserById(id)
        if (result !== null) {
            res.status(200).json(
                successRes({
                    state: 200,
                    message: "삭제 성공",
                }),
            )
            return
        }
        res.status(400).json(errorRes[400])
    },
}

export default makeRouter<APIUser>(apiUser)
