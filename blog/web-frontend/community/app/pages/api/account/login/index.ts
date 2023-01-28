import { v4 } from "uuid"
import { ReqType } from "@Server/request"
import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APILogin, makeRouter } from "@Services"
import { refreshAccessToken, validatePassword, generateRefreshToken, verifyRefreshToken } from "@Services/Account"
import { findUserByEmail } from "@Services/User"
import { getCookie, setCookie } from "cookies-next"

const apiLogin: APILogin = {
    [ReqType.GET]: async (req, res) => {
        const sessionId = req.headers.sessionid
        const refreshToken = getCookie("refreshToken", { req, res })
        if (refreshToken === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const tokenInfo = verifyRefreshToken(String(refreshToken || "") || undefined)
        if (tokenInfo?.sessionId && tokenInfo?.sessionId !== sessionId) {
            resMessageWithDesc(res, ResStatus.Forbidden, "sessionId가 일치하지 않습니다.")
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
        const body = req.body
        const user = await findUserByEmail(body.email || "")
        if (user === null) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        const isVaildatePassword = validatePassword(user, body.password || "")
        if (isVaildatePassword === false) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        const tokenInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            sessionId: body.keepLogin === false ? v4() : null,
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
    },
}

export default makeRouter(apiLogin)
