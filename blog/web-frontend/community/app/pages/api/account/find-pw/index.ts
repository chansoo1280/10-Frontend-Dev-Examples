import { successRes } from "@Server/response"
import { APIFindPW, makeRouter, ReqType } from "@Services"
import { sendEmail } from "@Services/Email"
import { findUserByEmail } from "@Services/User"

const apiFindPW: APIFindPW = {
    [ReqType.GET]: async (req, res) => {
        const user = await findUserByEmail(req.query.email)
        if (user === null) {
            res.status(400).json({
                state: 400,
                message: "유저를 찾지 못했습니다.",
            })
            return
        }
        sendEmail(req.query.email)
        res.status(200).json(successRes("성공"))
    },
}

export default makeRouter<APIFindPW>(apiFindPW)
