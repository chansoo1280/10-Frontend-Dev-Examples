import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIQuestionList, makeRouter, ReqType } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { createQuestion, deleteAllQuestion, findAllQuestion } from "@Services/Question"
import { verifyQuestion } from "@Services/Question/Question.entity"

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
        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "작성자를 찾을 수 없습니다.")
            return
        }

        const questionInfo = { ...req.body, authorId: user.id }

        const verifyResult = verifyQuestion(
            {
                ...questionInfo,
            },
            ["authorId", "title", "contents"],
        )
        if (verifyResult !== true) {
            resMessageWithDesc(res, ResStatus.BadRequest, verifyResult)
            return
        }

        const result = await createQuestion(questionInfo)
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

export default makeRouter(apiQuestionList)
