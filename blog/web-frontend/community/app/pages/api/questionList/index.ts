import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIQuestionList, makeRouter, ReqType } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { createQuestion, deleteAllQuestion, findAllQuestion } from "@Services/Question"

const apiQuestionList: APIQuestionList = {
    [ReqType.GET]: async (req, res) => {
        const result = await findAllQuestion()
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
    [ReqType.POST]: async (req, res) => {
        if (req.headers.authorization === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        // Authorization: `Bearer ${user.token}`
        const user = verifyAccessToken(req.headers.authorization)
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "작성자를 찾을 수 없습니다.")
            return
        }
        const result = await createQuestion({ ...req.body, authorId: user.id })
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
    [ReqType.DELETE]: async (req, res) => {
        const result = await deleteAllQuestion()
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
}

export default makeRouter<APIQuestionList>(apiQuestionList)
