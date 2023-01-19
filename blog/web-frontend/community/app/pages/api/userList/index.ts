import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIUserList, makeRouter, ReqType } from "@Services"
import { createUser, deleteAllUser, findAllUser, findUserByEmail } from "@Services/User"
import { getHash } from "@Services/Crypto"

const apiUserList: APIUserList = {
    [ReqType.GET]: async (req, res) => {
        const result = await findAllUser()
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
    [ReqType.POST]: async (req, res) => {
        const user = await findUserByEmail(req.body.email)
        if (user !== null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "중복된 이메일")
            return
        }

        const { salt, hash } = getHash(req.body.password)

        const result = await createUser({ ...req.body, password: hash, salt: salt })
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
    [ReqType.DELETE]: async (req, res) => {
        const result = await deleteAllUser()
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
}

export default makeRouter<APIUserList>(apiUserList)
