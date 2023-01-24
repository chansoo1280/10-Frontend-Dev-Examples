import { ReqType } from "@Server/request"
import { resMessage, ResStatus } from "@Server/response"
import { APIUser, makeRouter } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { findUserById, deleteUserById } from "@Services/User"

const apiUser: APIUser = {
    [ReqType.GET]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            resMessage(res, ResStatus.BadRequest)
            return
        }

        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        if (user === null || user.id !== id) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const result = await findUserById(id)
        if (result !== null) {
            res.status(ResStatus.Success).json({
                id: result.id,
                email: result.email,
                name: result.name,
            })
            return
        }
        resMessage(res, ResStatus.NoContent)
    },
    [ReqType.DELETE]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        const result = await deleteUserById(id)
        if (result !== null) {
            resMessage(res, ResStatus.Success)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
}

export default makeRouter(apiUser)
