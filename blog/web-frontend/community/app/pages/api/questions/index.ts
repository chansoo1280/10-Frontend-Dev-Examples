import { errorRes, successRes } from "@Server/response"
import { APIUserList, makeRouter, ReqType } from "@Services"
import { createUser, deleteAllUser, findAllUser, findUserByEmail } from "@Services/User"
import { getHash } from "@Services/Crypto"

const apiUserList: APIUserList = {
    [ReqType.GET]: async (req, res) => {
        const result = await findAllUser()
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(403).json(errorRes[403])
    },
    [ReqType.POST]: async (req, res) => {
        const user = await findUserByEmail(req.body.email)
        if (user !== null) {
            res.status(400).json({
                state: 400,
                message: "중복된 이메일",
            })
            return
        }

        const { salt, hash } = getHash(req.body.password)

        const result = await createUser({ ...req.body, password: hash, salt: salt })
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(400).json(errorRes[400])
    },
    [ReqType.DELETE]: async (req, res) => {
        const result = await deleteAllUser()
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(400).json(errorRes[400])
    },
}

export default makeRouter<APIUserList>(apiUserList)
