import { setCookie, getCookie } from "cookies-next"
import { resMessage, ResStatus } from "@Server/response"
import { APILogin, makeRouter, ReqType } from "@Services"
import { generateRefreshToken, refreshAccessToken, validatePassword } from "@Services/Account"
import { findUserByEmail } from "@Services/User"

const apiLogin: APILogin = {
    [ReqType.GET]: async (req, res) => {
        const refreshToken = getCookie("refreshToken", { req, res })
        if (refreshToken === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const accessToken = refreshAccessToken(String(refreshToken))

        if (accessToken) {
            res.status(ResStatus.Success).json(accessToken)
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
    [ReqType.POST]: async (req, res) => {
        const user = await findUserByEmail(req.body.email)
        if (user === null) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        const isVaildatePassword = validatePassword(user, req.body.password)
        if (isVaildatePassword === true) {
            const tokenInfo = {
                id: user.id,
                name: user.name,
                email: user.email,
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
        resMessage(res, ResStatus.Forbidden)
    },
}

export default makeRouter(apiLogin)
