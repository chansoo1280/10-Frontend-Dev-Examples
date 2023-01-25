import { ReqType } from "@Server/request"
import { resMessageWithDesc, ResStatus } from "@Server/response"
import { APIFindPw, makeRouter } from "@Services"
import { generateResetPwToken } from "@Services/Account"
import { sendEmail } from "@Services/Email"
import { findUserByEmail } from "@Services/User"

const apiFindPw: APIFindPw = {
    [ReqType.GET]: async (req, res) => {
        const email = req.query.email || ""
        const user = await findUserByEmail(email)
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "유저를 찾지 못했습니다.")
            return
        }

        const resetPwToken = generateResetPwToken(email)

        sendEmail({
            to: email,
            text: `
                <a href="http://localhost:3000/account/reset-pw?resetPwToken=${resetPwToken}&email=${email}">
                    http://localhost:3000/account/reset-pw
                </a>
            `,
            subject: "Example Site Reset Password Link",
        })
        resMessageWithDesc(res, ResStatus.Success, "성공")
    },
}

export default makeRouter(apiFindPw)
