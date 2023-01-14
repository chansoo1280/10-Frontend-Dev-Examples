import { setCookie, getCookie } from "cookies-next"
import { errorRes, successRes } from "@Server/response"
import { APILogin, makeRouter, ReqType } from "@Services"
import { generateRefreshToken, refreshAccessToken, validatePassword } from "@Services/Account"
import { findUserByEmail } from "@Services/User"

const apiLogin: APILogin = {
    [ReqType.GET]: async (req, res) => {
        const refreshToken = getCookie("refreshToken", { req, res })
        if (refreshToken === undefined) {
            res.status(403).json(errorRes[403])
            return
        }

        const accessToken = refreshAccessToken(String(refreshToken))

        if (accessToken) {
            res.status(200).json(successRes(accessToken))
            return
        }
        res.status(403).json(errorRes[403])
    },
    [ReqType.POST]: async (req, res) => {
        const user = await findUserByEmail(req.body.email)
        if (user === null) {
            res.status(400).json(errorRes[400])
            return
        }
        const isVaildatePassword = await validatePassword(user, req.body.password)
        if (isVaildatePassword === true) {
            const refreshToken = generateRefreshToken(user)
            setCookie("refreshToken", refreshToken, {
                req,
                res,
                httpOnly: true,
                sameSite: true,
                secure: true,
            })
            res.status(200).json(successRes(user))
            return
        }
        res.status(403).json(errorRes[403])
    },
}

export default makeRouter<APILogin>(apiLogin)
