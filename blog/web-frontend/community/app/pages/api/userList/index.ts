import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIUserList, makeRouter, ReqType } from "@Services"
import { createUser, deleteAllUser, findAllUser, findUserByEmail } from "@Services/User"
import { getHash } from "@Services/Crypto"
import { User, verifyUser } from "@Services/User/User.entity"
import { generateRefreshToken } from "@Services/Account"
import { setCookie } from "cookies-next"

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

        const userInfo = { ...req.body, password: hash, salt: salt }

        const verifyResult = verifyUser(
            {
                ...userInfo,
                password: req.body.password,
            },
            ["email", "name", "password", "salt"],
        )
        if (verifyResult !== true) {
            resMessageWithDesc(res, ResStatus.BadRequest, verifyResult)
            return
        }

        const result = await createUser(userInfo)
        if (result !== null) {
            const tokenInfo = {
                id: result,
                email: userInfo.email,
                name: userInfo.name,
            }
            const refreshToken = generateRefreshToken(tokenInfo)
            setCookie("refreshToken", refreshToken, {
                req,
                res,
                httpOnly: true,
                sameSite: true,
                secure: true,
            })
            res.status(ResStatus.Success).json(tokenInfo)
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

export default makeRouter(apiUserList)
