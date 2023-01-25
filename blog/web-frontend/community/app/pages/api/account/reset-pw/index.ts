import { ReqType } from "@Server/request"
import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIResetPw, makeRouter } from "@Services"
import { verifyResetPwToken } from "@Services/Account"
import { findUserByEmail, modifyUser } from "@Services/User"
import { verifyUser } from "@Services/User/User.entity"
import { getHash } from "@Utils"

const apiResetPw: APIResetPw = {
    [ReqType.PATCH]: async (req, res) => {
        const body = req.body

        const verifyResult = verifyUser(
            {
                ...body,
            },
            ["email", "password"],
        )
        if (verifyResult !== true) {
            resMessageWithDesc(res, ResStatus.BadRequest, verifyResult)
            return
        }

        const user = await findUserByEmail(body.email || "")
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "유저를 찾지 못했습니다.")
            return
        }

        const tokenObj = verifyResetPwToken(body.token || "")
        if (tokenObj === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        if (tokenObj === null || tokenObj.email !== body.email) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const { salt, hash } = getHash(body.password || "")

        const result = await modifyUser({
            id: user.id,
            salt,
            password: hash,
        })
        if (result === null) {
            resMessage(res, ResStatus.BadRequest)
            return
        }

        resMessageWithDesc(res, ResStatus.Success, "성공")
    },
}

export default makeRouter(apiResetPw)
