import { deleteCookie } from "cookies-next"
import { successRes } from "@Server/response"
import { APILogout, makeRouter, ReqType } from "@Services"

const apiLogout: APILogout = {
    [ReqType.GET]: async (req, res) => {
        deleteCookie("refreshToken", { req, res })

        res.status(200).json(successRes("로그아웃 성공"))
    },
}

export default makeRouter<APILogout>(apiLogout)
