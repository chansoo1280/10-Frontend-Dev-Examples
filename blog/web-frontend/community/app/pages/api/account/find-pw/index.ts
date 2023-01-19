import { resMessageWithDesc, ResStatus } from "@Server/response"
import { APIFindPW, makeRouter, ReqType } from "@Services"
import { sendEmail } from "@Services/Email"
import { findUserByEmail } from "@Services/User"

const apiFindPW: APIFindPW = {
    [ReqType.GET]: async (req, res) => {
        const user = await findUserByEmail(req.query.email)
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "유저를 찾지 못했습니다.")
            return
        }
        sendEmail(req.query.email)
        resMessageWithDesc(res, ResStatus.Success, "성공")
    },
}

export default makeRouter<APIFindPW>(apiFindPW)
