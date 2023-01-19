import { deleteCookie } from "cookies-next"
import { resMessage, ResStatus } from "@Server/response"
import { APILogout, makeRouter, ReqType } from "@Services"

const apiLogout: APILogout = {
    [ReqType.GET]: async (req, res) => {
        deleteCookie("refreshToken", { req, res })
        resMessage(res, ResStatus.Success)
    },
}

export default makeRouter<APILogout>(apiLogout)
