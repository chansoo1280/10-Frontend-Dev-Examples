import { ReqType } from "@Server/request"
import { ResStatus, resMessage } from "@Server/response"
import { APIVerifyCode, makeRouter } from "@Services"
import { sendEmail } from "@Services/Email"
import { generateEmailToken } from "@Services/User"

const apiVerificationCode: APIVerifyCode = {
    [ReqType.POST]: async (req, res) => {
        const body = req.body

        if (!body.email) {
            resMessage(res, ResStatus.BadRequest)
            return
        }

        const { token, code } = generateEmailToken(body.email)

        sendEmail({
            to: body.email,
            text: `
                인증코드 : ${code}
            `,
            subject: "Example Site 회원가입 인증 코드",
        })
        res.status(ResStatus.Success).json({
            token,
        })
    },
}

export default makeRouter(apiVerificationCode)
