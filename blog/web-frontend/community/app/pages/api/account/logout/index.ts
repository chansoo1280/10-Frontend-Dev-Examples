import { ReqType } from "@Server/request"
import { resMessage, ResStatus } from "@Server/response"
import { APILogout, makeRouter } from "@Services"
import { deleteCookie } from "cookies-next"

const apiLogout: APILogout = {
    [ReqType.GET]: async (req, res) => {
        deleteCookie("refreshToken", { req, res })
        resMessage(res, ResStatus.Success)
    },
}

export default makeRouter(apiLogout)
